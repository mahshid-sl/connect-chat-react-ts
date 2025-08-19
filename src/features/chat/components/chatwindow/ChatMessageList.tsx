import EmojiWrapper from '@/components/shared/EmojiWrapper';

type ChatMessageListProps = {
  messages: {
    id: string;
    text: string;
    sender: 'me' | 'other';
  }[];
};

export default function ChatMessageList({
  messages = [],
}: ChatMessageListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <p className="text-dark-2 text-center text-sm text-shadow-2xs">
          This is the beginning of your conversation.
        </p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[50%] rounded-lg p-2 ${
              msg.sender === 'me'
                ? 'bg-primary ml-auto text-white'
                : 'text-dark bg-gray-100'
            }`}
          >
            <EmojiWrapper text={msg.text} />
          </div>
        ))
      )}
    </div>
  );
}
