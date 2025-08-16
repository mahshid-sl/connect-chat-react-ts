import ChatLayout from '@/features/chat/components/layout/ChatLayout';
import ChatWindow from '@/features/chat/components/chatwindow/ChatWindow';
import ConversationList from '@/features/chat/components/conversation/ConversationList';

export default function HomePage() {
  return (
    <ChatLayout
      conversationList={<ConversationList />}
      chatWindow={<ChatWindow />}
    />
  );
}
