// ============================================================
// types/database.ts
// Basic Database Types for Supabase
// ============================================================

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
      profiles: {
        Row: {
          id: string
          display_name: string
          avatar_url: string | null
          phone_masked: string | null
          phone_encrypted: string | null
          role: 'tenant' | 'landlord' | 'agent' | 'admin'
          verification_status: 'unverified' | 'pending' | 'verified' | 'rejected'
          is_active: boolean
          line_user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          avatar_url?: string | null
          phone_masked?: string | null
          phone_encrypted?: string | null
          role?: 'tenant' | 'landlord' | 'agent' | 'admin'
          verification_status?: 'unverified' | 'pending' | 'verified' | 'rejected'
          is_active?: boolean
          line_user_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      properties: {
        Row: {
          id: string
          owner_id: string | null
          created_by_admin: boolean
          is_claimed: boolean
          is_verified_owner: boolean
          title: string
          slug: string
          description: string | null
          property_type: 'dormitory' | 'apartment' | 'condo_rent' | 'condo_sale' | 'house_rent' | 'house_sale' | 'townhouse'
          status: 'draft' | 'active' | 'rented' | 'paused' | 'archived'
          price: number
          price_negotiable: boolean
          deposit_months: number | null
          min_contract_months: number | null
          area_sqm: number | null
          bedrooms: number
          bathrooms: number
          floor_number: number | null
          total_floors: number | null
          electric_rate: number | null
          water_rate: number | null
          common_fee: number | null
          district: string | null
          province: string
          ai_summary: string | null
          ai_generated_tags: string[] | null
          view_count: number
          contact_count: number
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['properties']['Row']>
        Update: Partial<Database['public']['Tables']['properties']['Row']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      property_type: 'dormitory' | 'apartment' | 'condo_rent' | 'condo_sale' | 'house_rent' | 'house_sale' | 'townhouse'
      listing_status: 'draft' | 'active' | 'rented' | 'paused' | 'archived'
      user_role: 'tenant' | 'landlord' | 'agent' | 'admin'
      verification_status: 'unverified' | 'pending' | 'verified' | 'rejected'
    }
  }
}
