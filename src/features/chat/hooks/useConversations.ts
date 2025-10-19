import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import type { Message } from '../types/chat.types';

// Fetch user profile information
export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('Profiles')
    .select('id, name, avatar_url, is_online, last_seen')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
};

function useConversations(currentUserId: string) {
  return useQuery({
    queryKey: ['conversations', currentUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Conversations')
        .select(
          `
          id,
          participants,
          Messages (id, text, created_at, is_read, receiver_id)
        `,
        )
        .contains('participants', [currentUserId]);

      if (error) throw error;

      const conversations = await Promise.all(
        (data ?? []).map(async (conv) => {
          const sortedMessages: Message[] = [
            ...((conv.Messages ?? []) as Message[]),
          ].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );

          const lastMessage = sortedMessages[0];

          // unreadCount
          const unreadCount =
            conv.Messages?.filter(
              (msg) =>
                msg.receiver_id === currentUserId && msg.is_read === false,
            ).length || 0;

          console.log('Unread count:', unreadCount);
          // Find the other user in the conversation
          const otherUserId = conv.participants.find(
            (id: string) => id !== currentUserId,
          );

          // Fetch the other user's profile
          let otherUserProfile;

          if (otherUserId) {
            otherUserProfile = await fetchProfile(otherUserId);
          }

          return {
            id: conv.id,
            participants: conv.participants,
            last_message: lastMessage?.text || '',
            last_message_time: lastMessage?.created_at || '',
            other_user: otherUserProfile,
            unread_count: unreadCount,
          };
        }) ?? [],
      );

      console.log('📨 Conversations with unread:', conversations);
      return conversations;
    },
  });
}

export default useConversations;
