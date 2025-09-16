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
      // get receiver_id from conversation table [participants]
      const { data: conversation } = await supabase
        .from('Conversations')
        .select('participants')
        .eq('id', conversationId)
        .single();

      if (!conversation) throw new Error('Conversation not found');

      const receiverId = conversation.participants.find(
        (id: string) => id !== senderId,
      );

      if (!receiverId) throw new Error('Receiver not found');

      const { data, error } = await supabase
        .from('Messages')
        .insert([
          {
            conversation_id: conversationId,
            sender_id: senderId,
            text,
            receiver_id: receiverId,
            is_read: false,
          },
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
      queryClient.invalidateQueries({
        queryKey: ['conversations', variables.senderId],
      });
    },
  });
}
