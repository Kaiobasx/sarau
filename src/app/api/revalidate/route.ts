import { revalidatePath } from 'next/cache'

interface WebhookPayload {
  type?: 'INSERT' | 'UPDATE' | 'DELETE'
  table?: string
  schema?: string
  record?: {
    slug?: string
    [key: string]: unknown
  } | null
  old_record?: {
    slug?: string
    [key: string]: unknown
  } | null
}

/**
 * Endpoint de revalidação sob demanda (On-Demand ISR) para a agenda.
 * Disparado via Supabase Database Webhook ou manualmente pelo mantenedor.
 * Protegido via header Authorization: Bearer REVALIDATE_SECRET.
 */
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  const expectedSecret = process.env.REVALIDATE_SECRET

  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return Response.json(
      { error: 'Não autorizado. Token de revalidação inválido.' },
      { status: 401 }
    )
  }

  let body: WebhookPayload = {}
  try {
    body = await req.json()
  } catch {
    // Se o corpo não for JSON válido (ex: requisição vazia para teste), prossegue revalidando /agenda
    body = {}
  }

  // record presente em INSERT e UPDATE; old_record presente em UPDATE e DELETE
  const slug: string | undefined = body.record?.slug ?? body.old_record?.slug

  // Revalida a listagem geral da agenda e a home
  revalidatePath('/agenda')
  revalidatePath('/')

  // Revalida a página individual do evento se o slug foi identificado
  if (slug) {
    revalidatePath(`/agenda/${slug}`, 'page')
  }

  return Response.json({
    revalidated: true,
    slug: slug || null,
    timestamp: new Date().toISOString(),
  })
}
