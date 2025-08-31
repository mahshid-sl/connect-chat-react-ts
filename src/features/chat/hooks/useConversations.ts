import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

// Fetch user profile information
const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('Profiles')
    .select('id, name, avatar_url')
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
          Messages (id, text, created_at)
        `,
        )
        .contains('participants', [currentUserId]);

      if (error) throw error;

      const conversations = await Promise.all(
        (data ?? []).map(async (conv) => {
          const lastMessage = conv.Messages?.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )[0];

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
          };
        }) ?? [],
      );

      console.log('✅ conversations:', conversations);
      return conversations;
    },
  });
}

export default useConversations;
