export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      interesses: {
        Row: {
          id: string
          nome: string
          bairro: string
          contato_email: string | null
          contato_whatsapp: string | null
          habilidades: string | null
          consentimento_lgpd: boolean
          ip_hmac: string | null
          ip_hmac_expira_em: string | null
          criado_em: string
        }
        Insert: {
          id?: string
          nome: string
          bairro: string
          contato_email?: string | null
          contato_whatsapp?: string | null
          habilidades?: string | null
          consentimento_lgpd: boolean
          ip_hmac?: string | null
          ip_hmac_expira_em?: string | null
          criado_em?: string
        }
        Update: {
          id?: string
          nome?: string
          bairro?: string
          contato_email?: string | null
          contato_whatsapp?: string | null
          habilidades?: string | null
          consentimento_lgpd?: boolean
          ip_hmac?: string | null
          ip_hmac_expira_em?: string | null
          criado_em?: string
        }
        Relationships: []
      }
      contatos_parceiros: {
        Row: {
          id: string
          nome: string
          organizacao: string | null
          mensagem: string
          ip_hmac: string | null
          ip_hmac_expira_em: string | null
          lido: boolean
          criado_em: string
        }
        Insert: {
          id?: string
          nome: string
          organizacao?: string | null
          mensagem: string
          ip_hmac?: string | null
          ip_hmac_expira_em?: string | null
          lido?: boolean
          criado_em?: string
        }
        Update: {
          id?: string
          nome?: string
          organizacao?: string | null
          mensagem?: string
          ip_hmac?: string | null
          ip_hmac_expira_em?: string | null
          lido?: boolean
          criado_em?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          id: string
          slug: string
          titulo: string
          descricao: string
          data: string
          local: string
          maps_url: string | null
          capa_url: string | null
          publicado: boolean
          criado_em: string
          atualizado_em: string
        }
        Insert: {
          id?: string
          slug: string
          titulo: string
          descricao: string
          data: string
          local: string
          maps_url?: string | null
          capa_url?: string | null
          publicado?: boolean
          criado_em?: string
          atualizado_em?: string
        }
        Update: {
          id?: string
          slug?: string
          titulo?: string
          descricao?: string
          data?: string
          local?: string
          maps_url?: string | null
          capa_url?: string | null
          publicado?: boolean
          criado_em?: string
          atualizado_em?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_ip_hmac_vencidos: {
        Args: Record<PropertyKey, never>
        Returns: void
      }
    }
  }
}

export type Evento = Database['public']['Tables']['eventos']['Row']
export type EventoInsert = Database['public']['Tables']['eventos']['Insert']

export type Interesse = Database['public']['Tables']['interesses']['Row']
export type InteresseInsert = Database['public']['Tables']['interesses']['Insert']

export type ContatoParceiro = Database['public']['Tables']['contatos_parceiros']['Row']
export type ContatoParceiroInsert = Database['public']['Tables']['contatos_parceiros']['Insert']
