import supabase from '@/lib/supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message } from '../types/chat.types';

type SendMessage = {
  conversationId: string;
  senderId: string;
  text: string;
};

export default function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId, senderId, text }: SendMessage) => {
      const { data, error } = await supabase
        .from('Messages')
        .insert([
          { conversation_id: conversationId, sender_id: senderId, text },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Message;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
  });
}
