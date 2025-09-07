import supabase from '@/lib/supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../types/chat.types';

const useUpdateProfileRPC = (currentUserId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      // 🔍 for debugging
      console.log('📤 Sending to Supabase RPC:', {
        p_name: profileData.name || '',
        p_username: profileData.username || '',
        p_bio: profileData.bio || '',
        p_phone_number: profileData.phone_number || '',
        p_avatar_url: profileData.avatar_url || '',
      });

      const { data, error } = await supabase.rpc('update_profile', {
        p_name: profileData.name ?? null,
        p_username: profileData.username ?? null,
        p_bio: profileData.bio ?? null,
        p_phone_number: profileData.phone_number ?? null,
        p_avatar_url: profileData.avatar_url ?? null,
      });

      if (error) {
        console.error('❌ RPC error:', error);
        throw error;
      }

      console.log('✅ RPC response:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', currentUserId] });
    },
  });

  return mutation;
};

export default useUpdateProfileRPC;
