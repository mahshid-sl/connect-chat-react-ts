import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const useConversationList = (currentUserId: string) => {
  return useQuery({
    queryKey: ['conversation-list', currentUserId],
    queryFn: async () => {
      const { data: conv, error: convErr } = await supabase
        .from('Conversations')
        .select(
          `id,created_at,participants,last_message,
          messages:Messages(id,text,created_at,sender_id)`,
        )
        .order('created_at', {
          referencedTable: 'Messages',
          ascending: false,
        })
        .limit(1, { referencedTable: 'Messages' });

      if (convErr) {
        throw new Error(convErr.message);
      }
      return conv;
    },
  });
};

export default useConversationList;
