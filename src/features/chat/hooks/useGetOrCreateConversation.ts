import supabase from '@/lib/supabaseClient';
import { useMutation } from '@tanstack/react-query';

const useGetOrCreateConversation = () => {
  return useMutation({
    mutationFn: async ({
      currentUserId,
      otherUserId,
    }: {
      currentUserId: string;
      otherUserId: string;
    }) => {
      //1. Check if a conversation exists between the two users
      const { data: existing, error } = await supabase
        .from('Conversations')
        .select('*')
        .contains('participants', [currentUserId, otherUserId])
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (existing) {
        return existing;
      }

      //2. If no conversation exists, create a new one
      const { data: newConversation, error: insertError } = await supabase
        .from('Conversations')
        .insert([
          { participants: [currentUserId, otherUserId], last_message: null },
        ])
        .select('*')
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      }

      return newConversation;
    },
  });
};

export default useGetOrCreateConversation;
