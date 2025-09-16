import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const useUnreadCounts = (currentUserId: string, conversationId: string) => {
  return useQuery({
    queryKey: ['unreadCounts', currentUserId, conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Messages')
        .select('id', { count: 'exact' })
        .eq('receiver_id', currentUserId)
        .eq('conversation_id', conversationId)
        .eq('is_read', false);

      if (error) throw error;

      return data.length;
    },
  });
};

export default useUnreadCounts;
