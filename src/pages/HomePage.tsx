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
        <ConversationList onSelectConversation={setConversationId} />
      }
      chatWindow={
        conversationId ? (
          <ChatWindow conversationId={conversationId} currentUserId={user.id} />
        ) : (
          <div>Select a conversation to start chatting</div>
        )
      }
    />
  );
}
