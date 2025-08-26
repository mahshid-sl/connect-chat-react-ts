import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RiCheckDoubleLine } from 'react-icons/ri';

type UserChatProps = {
  id: string;
  name: string;
  lastMessage: string;
  time?: string;
  unreadCount?: number;
  avatarUrl?: string;
  onClick: () => void;
};

export default function UserChat({
  name,
  lastMessage,
  time = '10:43 AM',
  unreadCount = 0,
  avatarUrl = 'https://github.com/shadcn.png',
  onClick,
}: UserChatProps) {
  return (
    <div
      className="m-3 flex cursor-pointer items-center justify-start gap-x-3 rounded bg-gray-50 p-3 transition-colors hover:bg-gray-100"
      onClick={onClick}
    >
      {/* <Avatar /> */}
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* chatInfo */}
      <div className="flex-1 space-y-1">
        {/* username */}
        <div className="username flex items-start justify-between">
          <div className="text-sm font-bold">
            <span>{name}</span>
          </div>

          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <span>
              <RiCheckDoubleLine size={18} />
            </span>
            <span>{time}</span>
          </div>
        </div>
        {/* chat message */}
        <div className="chat-message text-muted-foreground flex items-center justify-between text-sm font-normal">
          <div className="message line-clamp-1">
            <span>{lastMessage}</span>
          </div>
          {unreadCount > 0 && (
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
