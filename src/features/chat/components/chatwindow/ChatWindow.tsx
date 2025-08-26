import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';

import defaultChatPattern from '../../../chat/assets/defaultChatPattern.webp';
import useGetMessages from '../../hooks/useGetMessages';
import Loader from '@/components/shared/Loader';
import useSendMessage from '../../hooks/useSendMessage';

type ChatWindowProps = {
  conversationId: string;
  currentUserId: string;
};

export default function ChatWindow({
  conversationId,
  currentUserId,
}: ChatWindowProps) {
  const {
    data: messages,
    isPending,
    isError,
    error,
  } = useGetMessages(conversationId);

  // Implement message sending functionality
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();

  if (isPending && !messages) return <Loader />;

  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const uiMessages = (messages ?? []).map((m) => ({
    id: m.id,
    text: m.text,
    sender:
      m.sender_id === currentUserId ? ('me' as const) : ('other' as const),
  }));

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* ====wallpaper=== */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-repeat"
        style={{ backgroundImage: `url(${defaultChatPattern})` }}
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/5" />

      {/* ============== */}

      <div className="relative z-10 flex h-full w-full flex-col">
        <ChatHeader />
        <div className="flex-grow overflow-y-auto">
          <ChatMessageList messages={uiMessages} />
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
