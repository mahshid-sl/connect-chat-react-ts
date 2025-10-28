import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EmojiWrapper from '@/components/shared/EmojiWrapper';

type ChatMessageListProps = {
  messages: {
    id: string;
    text: string;
    sender: 'me' | 'other';
    sender_id: string;
  }[];
  currentUserId: string;
  otherUser?: {
    name?: string;
    avatar_url?: string;
  };
};

export default function ChatMessageList({
  messages = [],
  currentUserId,
  otherUser,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <p className="text-dark-2 text-center text-sm text-shadow-2xs dark:text-gray-400">
          This is the beginning of your conversation.
        </p>
      ) : (
        messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId;
          const avatarUrl = isMe
            ? ''
            : otherUser?.avatar_url || 'https://github.com/shadcn.png';
          const name = isMe ? 'You' : otherUser?.name || 'Unknown User';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                isMe ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isMe && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>
                    {name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[65%] rounded-lg px-3 py-2 text-sm ${
                  isMe
                    ? 'bg-primary ml-2 text-white dark:bg-gray-700'
                    : 'text-dark bg-gray-100 dark:bg-gray-800 dark:text-white'
                }`}
              >
                <EmojiWrapper
                  text={msg.text}
                  dir={/[\u0600-\u06FF]/.test(msg.text) ? 'rtl' : 'ltr'}
                  className="break-words"
                />
              </div>

              {isMe && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>
                    {name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
