import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

let serverClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Retorna o cliente Supabase administrativo com service_role key.
 * EXCLUSIVO DO SERVIDOR: Usado em Server Actions e Route Handlers.
 * NUNCA importar em componentes de cliente ('use client').
 */
export function getSupabaseServerClient() {
  if (serverClient) return serverClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Configuração Supabase incompleta no servidor. SUPABASE_SERVICE_ROLE_KEY ou NEXT_PUBLIC_SUPABASE_URL não configurados.'
    )
  }

  serverClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return serverClient
}
