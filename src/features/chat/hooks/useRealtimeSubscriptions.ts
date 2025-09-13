import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import supabase from '@/lib/supabaseClient';

export default function useRealtimeSubscriptions(currentUserId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentUserId) return;

    // ====== Profiles ======
    // listen to a specific changes
    const profileChannel = supabase
      .channel(`profiles-changes-${currentUserId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Profiles' },
        (payload) => {
          console.log('👤 Profile changed:', payload);
          queryClient.invalidateQueries({ queryKey: ['profiles'] });
          queryClient.invalidateQueries({
            queryKey: ['conversations', currentUserId],
          });
        },
      )
      .subscribe();

    // ====== Messages ======
    const messageChannel = supabase
      .channel(`messages-changes-${currentUserId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Messages' },
        (payload) => {
          console.log('💬 New message:', payload.new);

          const conversationId = payload.new.conversation_id;

          // invalidate لیست پیام‌های همون کانورسیشن
          queryClient.invalidateQueries({
            queryKey: ['messages', conversationId],
          });

          // و همینطور لیست کانورسیشن‌ها (برای last_message)
          queryClient.invalidateQueries({
            queryKey: ['conversations', currentUserId],
          });
        },
      )
      .subscribe();

    // ====== Conversations ======
    const conversationChannel = supabase
      .channel(`conversations-changes-${currentUserId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Conversations' },
        (payload) => {
          console.log('📌 Conversation updated:', payload);
          queryClient.invalidateQueries({
            queryKey: ['conversations', currentUserId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(conversationChannel);
    };
  }, [currentUserId, queryClient]);
}
