import { getSupabaseServerClient } from './supabase/server'
import type { Evento } from './supabase/types'

/**
 * Busca todos os eventos publicados que ainda não aconteceram
 * (com tolerância de 1 hora para eventos em andamento).
 */
export async function getUpcomingEvents(): Promise<Evento[]> {
  try {
    const supabase = getSupabaseServerClient()
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('publicado', true)
      .gte('data', oneHourAgo)
      .order('data', { ascending: true })

    if (error) {
      console.error('[Supabase getUpcomingEvents error]', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('[getUpcomingEvents exception]', err)
    return []
  }
}

/**
 * Busca um evento publicado pelo seu slug único.
 */
export async function getEventBySlug(slug: string): Promise<Evento | null> {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('slug', slug)
      .eq('publicado', true)
      .maybeSingle()

    if (error) {
      console.error('[Supabase getEventBySlug error]', error)
      return null
    }

    return data
  } catch (err) {
    console.error('[getEventBySlug exception]', err)
    return null
  }
}

/**
 * Formata data e hora para exibição em português brasileiro.
 */
export function formatEventDate(dateString: string): {
  dataLegivel: string
  horaLegivel: string
  dia: string
  mes: string
} {
  const date = new Date(dateString)

  const dataLegivel = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(date)

  const horaLegivel = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(date)

  const dia = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(date)

  const mes = new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date).replace('.', '')

  return {
    dataLegivel,
    horaLegivel,
    dia,
    mes,
  }
}
