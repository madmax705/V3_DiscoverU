import useSWR from 'swr';
import { fetchUserClubMemberships } from '../lib/supabase-client';

export function useUserMemberships(userId: string | undefined) {
    return useSWR(
        userId ? ['user-memberships', userId] : null,
        () => fetchUserClubMemberships(userId!)
    );
} 