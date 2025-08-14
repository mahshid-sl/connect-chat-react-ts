import ChatLayout from "@/features/chat/components/ChatLayout";
import ChatWindow from "@/features/chat/components/ChatWindow";
import ConversationList from "@/features/chat/components/ConversationList";

export default function HomePage() {
  return (
    <ChatLayout conversationList={<ConversationList />}>
      <ChatWindow />
    </ChatLayout>
  );
}
