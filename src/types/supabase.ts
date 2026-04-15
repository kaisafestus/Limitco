export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: { [column: string]: Json }
        Insert: { [column: string]: Json }
        Update: { [column: string]: Json }
      }
    }
    Views: { [key: string]: unknown }
    Functions: { [key: string]: unknown }
    Enums: { [key: string]: unknown }
    CompositeTypes: { [key: string]: unknown }
  }
}
