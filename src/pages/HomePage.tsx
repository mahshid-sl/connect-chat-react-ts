import ChatLayout from '@/features/chat/components/layout/ChatLayout';
import ChatWindow from '@/features/chat/components/chatwindow/ChatWindow';
import ConversationList from '@/features/chat/components/conversation/ConversationList';
import { useAuth } from '@/features/auth/context/AuthContext';
import Loader from '@/components/shared/Loader';
import { useState } from 'react';
import useRealtimeSubscriptions from '@/features/chat/hooks/useRealtimeSubscriptions';
import useOnlineStatus from '@/hooks/useOnlineStatus';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'chat'>('list');

  useOnlineStatus(user?.id);
  useRealtimeSubscriptions(user?.id ?? '');

  if (loading) return <Loader />;
  if (!user) return <div>Please login</div>;

  const handleSelectConversation = (id: string) => {
    setConversationId(id);
    setActiveView('chat');
  };

  return (
    <ChatLayout
      activeView={activeView}
      setActiveView={setActiveView}
      conversationList={
        <ConversationList
          currentUserId={user.id}
          onSelectConversation={handleSelectConversation}
        />
      }
      chatWindow={
        conversationId ? (
          <ChatWindow conversationId={conversationId} currentUserId={user.id} />
        ) : (
          <div className="Select a conversation to start chatting flex h-full items-center justify-center bg-gray-100 text-xl text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Select a conversation to start chatting
          </div>
        )
      }
    />
  );
}
