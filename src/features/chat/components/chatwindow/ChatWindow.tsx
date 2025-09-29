import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';

import defaultChatPattern from '../../../chat/assets/defaultChatPattern.webp';
import useGetMessages from '../../hooks/useGetMessages';
import Loader from '@/components/shared/Loader';
import useSendMessage from '../../hooks/useSendMessage';
import useMarkAsRead from '../../hooks/useMarkAsRead';
import type { Message } from '../../types/chat.types';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

type ChatWindowProps = {
  conversationId: string;
  currentUserId: string;
};

type UIMessage = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  sender_id: string;
  receiver_id: string;
  conversation_id: string;
  created_at: string;
  is_read: boolean;
};

export default function ChatWindow({
  conversationId,
  currentUserId,
}: ChatWindowProps) {
  const {
    data: initialMessages,
    isPending,
    isError,
    error,
  } = useGetMessages(conversationId);

  const [messages, setMessages] = useState<UIMessage[]>([]);

  const { mutate: sendMessage } = useSendMessage();
  const { mutate: markAsRead } = useMarkAsRead();

  // پیام‌های اولیه
  useEffect(() => {
    if (initialMessages) {
      setMessages(
        initialMessages.map((m) => ({
          id: m.id,
          text: m.text,
          sender: m.sender_id === currentUserId ? 'me' : 'other',
          sender_id: m.sender_id,
          receiver_id: m.receiver_id,
          conversation_id: m.conversation_id,
          created_at: m.created_at,
          is_read: m.is_read,
        })),
      );
    }
  }, [initialMessages, currentUserId]);

  // رییل‌تایم لیسنر
  useEffect(() => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (newMessage.conversation_id === conversationId) {
            setMessages((prev) => [
              ...prev,
              {
                id: newMessage.id,
                text: newMessage.text,
                sender: newMessage.sender_id === currentUserId ? 'me' : 'other',
                sender_id: newMessage.sender_id,
                receiver_id: newMessage.receiver_id,
                conversation_id: newMessage.conversation_id,
                created_at: newMessage.created_at,
                is_read: newMessage.is_read,
              },
            ]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, currentUserId]);

  // ✅ فقط وقتی کاربر داخل این کانورسیشن هست → unread ها رو read کن
  useEffect(() => {
    // فقط پیام‌هایی که دریافت‌کننده‌ش currentUserId هست و هنوز unread موندن
    const unreadMessages = messages.filter(
      (msg) =>
        msg.receiver_id === currentUserId &&
        msg.sender_id !== currentUserId && // 👈 پیام خودم نباشه
        !msg.is_read,
    );

    if (unreadMessages.length > 0) {
      markAsRead({ conversationId, userId: currentUserId });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.receiver_id === currentUserId &&
          msg.sender_id !== currentUserId &&
          !msg.is_read
            ? { ...msg, is_read: true }
            : msg,
        ),
      );
    }
  }, [messages, conversationId, currentUserId, markAsRead]);

  if (isPending) return <Loader />;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* wallpaper */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-repeat"
        style={{ backgroundImage: `url(${defaultChatPattern})` }}
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/5" />

      <div className="relative z-10 flex h-full w-full flex-col">
        <ChatHeader
          currentUserId={currentUserId}
          conversationId={conversationId}
        />
        <div className="flex-grow overflow-y-auto dark:bg-gray-900 dark:text-white">
          <ChatMessageList messages={messages} />
        </div>
        <ChatInput
          onSend={(message) =>
            sendMessage({
              conversationId,
              senderId: currentUserId,
              text: message,
            })
          }
        />
      </div>
    </div>
  );
}
