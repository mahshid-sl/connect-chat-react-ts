import ChatLayout from '@/features/chat/components/layout/ChatLayout';
import ChatWindow from '@/features/chat/components/chatwindow/ChatWindow';
import ConversationList from '@/features/chat/components/conversation/ConversationList';
import { useAuth } from '@/features/auth/context/AuthContext';
import Loader from '@/components/shared/Loader';
import { useState } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);

  if (loading) return <Loader />;
  if (!user) return <div>Please login</div>;

  return (
    <ChatLayout
      conversationList={
        <ConversationList
          currentUserId={user.id}
          onSelectConversation={setConversationId}
        />
      }
      chatWindow={
        conversationId ? (
          <ChatWindow conversationId={conversationId} currentUserId={user.id} />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-xl text-gray-500">
            Select a conversation to start chatting
          </div>
        )
      }
    />
  );
}
