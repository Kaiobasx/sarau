'use server'

import { headers } from 'next/headers'
import crypto from 'crypto'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export interface SubmitInteresseState {
  success?: boolean
  message?: string
  errors?: {
    nome?: string
    bairro?: string
    contato?: string
    consentimento_lgpd?: string
    geral?: string
  }
}

/**
 * Envia notificação por e-mail via Resend quando configurado.
 * Mantido como stub preparado conforme especificado na Fase 1.
 */
async function sendInteresseNotificationEmail(dados: {
  nome: string
  bairro: string
  contato_email?: string | null
  contato_whatsapp?: string | null
  habilidades?: string | null
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  const destinationEmail = process.env.CONTACT_EMAIL

  if (!resendApiKey || !destinationEmail) {
    console.log('[Resend Stub - Fase 1] Novo interesse registrado para a coordenação:', {
      destinatario: destinationEmail || 'CONTACT_EMAIL_NAO_CONFIGURADO',
      dados,
    })
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Manifesto da Sul <notificacoes@manifestodasul.org.br>',
        to: [destinationEmail],
        subject: `Novo participante interessado: ${dados.nome} (${dados.bairro})`,
        text: `Novo interesse cadastrado no site do Manifesto da Sul:\n\nNome: ${dados.nome}\nBairro: ${dados.bairro}\nE-mail: ${dados.contato_email || 'Não informado'}\nWhatsApp: ${dados.contato_whatsapp || 'Não informado'}\nHabilidades / Interesses: ${dados.habilidades || 'Não informado'}\n\nEntre em contato para dar as boas-vindas!`,
      }),
    })

    if (!res.ok) {
      console.error('[Resend API Error]', await res.text())
    }
  } catch (err) {
    console.error('[Resend Error]', err)
  }
}

/**
 * Server Action para submissão do formulário Faça Parte (US-04).
 * Não expõe chave service_role ao cliente.
 * Proteção anti-spam via honeypot e rate limit por HMAC-SHA256(IP).
 */
export async function submitInteresse(
  _prevState: SubmitInteresseState | null,
  formData: FormData
): Promise<SubmitInteresseState> {
  // 1. Verificação de Honeypot
  const honeypot = formData.get('b_website')?.toString().trim()
  if (honeypot && honeypot.length > 0) {
    // Se o campo invisível foi preenchido, é um bot.
    // Retorna resposta de sucesso aparente para não alertar o bot, sem gravar no banco.
    return {
      success: true,
      message: 'Recebemos seu contato! Em breve o coletivo vai chamar você.',
    }
  }

  // 2. Extração e sanitização dos campos
  const nome = formData.get('nome')?.toString().trim() || ''
  const bairro = formData.get('bairro')?.toString().trim() || ''
  const contato_email = formData.get('contato_email')?.toString().trim() || null
  const contato_whatsapp = formData.get('contato_whatsapp')?.toString().trim() || null
  const habilidades = formData.get('habilidades')?.toString().trim() || null
  const consentimento = formData.get('consentimento_lgpd') === 'on' || formData.get('consentimento_lgpd') === 'true'

  // 3. Validação dos campos
  const errors: SubmitInteresseState['errors'] = {}

  if (!nome || nome.length < 2 || nome.length > 120) {
    errors.nome = 'O nome deve ter entre 2 e 120 caracteres.'
  }

  if (!bairro || bairro.length < 2 || bairro.length > 100) {
    errors.bairro = 'O bairro deve ter entre 2 e 100 caracteres.'
  }

  if (!contato_email && !contato_whatsapp) {
    errors.contato = 'Informe ao menos um canal de contato (e-mail ou WhatsApp).'
  }

  if (contato_email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contato_email)) {
    errors.contato = 'E-mail em formato inválido.'
  }

  if (contato_whatsapp && !/^\+?[0-9\s\-()]{7,20}$/.test(contato_whatsapp)) {
    errors.contato = 'Número de WhatsApp inválido (use apenas números, DDD e código do país opcional).'
  }

  if (!consentimento) {
    errors.consentimento_lgpd = 'Você precisa aceitar os termos de privacidade para enviar.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  // 4. Rate Limiting via HMAC-SHA256(IP)
  const headersList = await headers()
  const rawIp =
    headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headersList.get('x-real-ip')?.trim() ||
    '127.0.0.1'

  const hmacSecret =
    process.env.HMAC_SECRET || 'fallback_secret_for_local_manifesto_da_sul_dev_32b'

  const ipHmac = crypto
    .createHmac('sha256', hmacSecret)
    .update(rawIp)
    .digest('hex')

  const supabase = getSupabaseServerClient()

  // Consulta taxa de envios na última hora
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count, error: countError } = await supabase
    .from('interesses')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hmac', ipHmac)
    .gte('criado_em', oneHourAgo)

  if (countError) {
    console.error('[RateLimit Check Error]', countError)
  }

  if (typeof count === 'number' && count >= 3) {
    return {
      success: false,
      message:
        'Limite de 3 envios por hora atingido a partir desta conexão. Por favor, aguarde alguns instantes antes de tentar novamente.',
    }
  }

  // 5. Inserção no Supabase com service_role
  const { error: insertError } = await supabase.from('interesses').insert({
    nome,
    bairro,
    contato_email,
    contato_whatsapp,
    habilidades,
    consentimento_lgpd: true,
    ip_hmac: ipHmac,
  })

  if (insertError) {
    console.error('[Insert Interesse Error]', insertError)
    return {
      success: false,
      message: 'Não foi possível salvar suas informações no momento. Tente novamente em alguns minutos.',
    }
  }

  // 6. Notificação Resend (preparada)
  await sendInteresseNotificationEmail({
    nome,
    bairro,
    contato_email,
    contato_whatsapp,
    habilidades,
  })

  return {
    success: true,
    message: 'Recebemos seu contato! Em breve o coletivo vai chamar você.',
  }
}
