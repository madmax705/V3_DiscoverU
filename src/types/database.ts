export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            Club: {
                Row: {
                    id: number
                    name: string
                    description: string | null
                    category: string
                    image_url: string | null
                    logo_url: string | null
                    meeting_times: string | null
                    location: string | null
                    advisor: string | null
                    member_count: number
                    created_at: string
                    slug: string
                    mission?: string | null
                }
                Insert: {
                    id?: number
                    name: string
                    description?: string | null
                    category: string
                    image_url?: string | null
                    logo_url?: string | null
                    meeting_times?: string | null
                    location?: string | null
                    advisor?: string | null
                    member_count?: number
                    created_at?: string
                    slug: string
                    mission?: string | null
                }
                Update: {
                    id?: number
                    name?: string
                    description?: string | null
                    category?: string
                    image_url?: string | null
                    logo_url?: string | null
                    meeting_times?: string | null
                    location?: string | null
                    advisor?: string | null
                    member_count?: number
                    created_at?: string
                    slug?: string
                    mission?: string | null
                }
                Relationships: []
            }
            ClubMember: {
                Row: {
                    id: number
                    club_id: number
                    user_id: string
                    role: Database["public"]["Enums"]["club_role"]
                    created_at: string
                }
                Insert: {
                    id?: number
                    club_id: number
                    user_id: string
                    role: Database["public"]["Enums"]["club_role"]
                    created_at?: string
                }
                Update: {
                    id?: number
                    club_id?: number
                    user_id?: string
                    role?: Database["public"]["Enums"]["club_role"]
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "ClubMember_club_id_fkey"
                        columns: ["club_id"]
                        referencedRelation: "Club"
                        referencedColumns: ["id"]
                        isOneToOne: false
                    }
                ]
            }
            ClubEvent: {
                Row: {
                    id: number
                    club_id: number
                    name: string
                    description: string | null
                    date: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    club_id: number
                    name: string
                    description?: string | null
                    date: string
                    created_at?: string
                }
                Update: {
                    id?: number
                    club_id?: number
                    name?: string
                    description?: string | null
                    date?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "ClubEvent_club_id_fkey"
                        columns: ["club_id"]
                        referencedRelation: "Club"
                        referencedColumns: ["id"]
                        isOneToOne: false
                    }
                ]
            }
            ClubRating: {
                Row: {
                    id: number
                    user_id: string
                    club_id: number
                    rating: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    user_id: string
                    club_id: number
                    rating: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string
                    club_id?: number
                    rating?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "ClubRating_club_id_fkey"
                        columns: ["club_id"]
                        referencedRelation: "Club"
                        referencedColumns: ["id"]
                        isOneToOne: false
                    }
                ]
            }
        }
        Enums: {
            club_role: "leader" | "member"
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
