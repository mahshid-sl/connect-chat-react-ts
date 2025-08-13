import ChatLayout from "@/features/chat/components/ChatLayout";
import ChatWindow from "@/features/chat/components/ChatWindow";

export default function HomePage() {
  return (
    <ChatLayout conversationList={<aside>aside</aside>}>
      <ChatWindow />
    </ChatLayout>
  );
}
