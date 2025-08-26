import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import type { Message } from '../types/chat.types';

const useGetMessages = (conversationId: string) => {
  return useQuery<Message[], Error>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      console.log('Fetching messages for conversationId:', conversationId);

      const { data, error } = await supabase
        .from('Messages')
        .select('id,created_at,conversation_id,sender_id,text,is_read')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error); // برای دیباگ
        throw new Error(error.message);
      }
      console.log('Fetched messages:', data); // برای دیباگ
      return (data ?? []) as Message[];
    },
    enabled: !!conversationId,
    staleTime: 15_000, // 15 seconds
  });
};

export default useGetMessages;
