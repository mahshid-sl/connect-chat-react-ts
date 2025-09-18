import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/lib/supabaseClient';

type MarkAsReadArgs = {
  conversationId: string;
  userId: string;
};

export default function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId, userId }: MarkAsReadArgs) => {
      console.log('Marking as read - Input:', { conversationId, userId }); // دیباگ ورودی
      const { data, error } = await supabase.rpc('mark_messages_as_read', {
        p_conversation_id: conversationId,
        p_user_id: userId,
      });

      if (error) {
        console.error('RPC error - Details:', error); // دیباگ خطا
        throw error;
      }
      console.log('Messages marked as read successfully - Rows updated:', data); // دیباگ خروجی
      return true;
    },
    onSuccess: (_, variables) => {
      console.log('Invalidating queries for:', variables); // دیباگ invalidate
      queryClient.invalidateQueries({
        queryKey: ['conversations', variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
    onError: (error) => {
      console.error('Mutation failed:', error); // دیباگ خطای کلی
    },
  });
}
