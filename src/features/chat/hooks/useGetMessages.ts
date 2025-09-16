// import supabase from '@/lib/supabaseClient';
// import { useQuery } from '@tanstack/react-query';
// import type { Message } from '../types/chat.types';

import supabase from '@/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Message } from '../types/chat.types';

// const useGetMessages = (conversationId: string) => {
//   return useQuery<Message[], Error>({
//     queryKey: ['messages', conversationId],
//     queryFn: async () => {
//       console.log('Fetching messages for conversationId:', conversationId);

//       const { data, error } = await supabase
//         .from('Messages')
//         .select(
//           'id,created_at,conversation_id,sender_id,text,is_read,receiver_id',
//         )
//         .eq('conversation_id', conversationId)
//         .order('created_at', { ascending: true });

//       if (error) {
//         console.error('Error fetching messages:', error); // برای دیباگ
//         throw new Error(error.message);
//       }
//       console.log('Fetched messages:', data); // برای دیباگ

//       return (data ?? []) as Message[];
//     },
//     enabled: !!conversationId,
//     staleTime: 15_000, // 15 seconds
//   });
// };

// export default useGetMessages;

const useGetMessages = (conversationId: string, currentUserId: string) => {
  const queryClient = useQueryClient();

  return useQuery<Message[], Error>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Messages')
        .select(
          'id,created_at,conversation_id,sender_id,text,is_read,receiver_id',
        )
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw new Error(error.message);

      // ✅ پیام‌های خوانده نشده رو mark کن
      const unreadMessages = data?.filter(
        (msg) => msg.receiver_id === currentUserId && !msg.is_read,
      );

      if (unreadMessages?.length) {
        await supabase
          .from('Messages')
          .update({ is_read: true })
          .eq('conversation_id', conversationId)
          .eq('receiver_id', currentUserId)
          .eq('is_read', false);

        // invalidate کانورسیشن‌ها و خود پیام‌ها
        queryClient.invalidateQueries({
          queryKey: ['messages', conversationId],
        });
        queryClient.invalidateQueries({
          queryKey: ['conversations', currentUserId],
        });
      }

      return data ?? [];
    },
    enabled: !!conversationId,
    staleTime: 15_000,
  });
};

export default useGetMessages;
