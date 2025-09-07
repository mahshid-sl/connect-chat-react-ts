import ConversationListHeader from './ConversationListHeader';
import ConversationListLayout from '../layout/ConversationListLayout';
import UserChat from '../UserChat';
import Loader from '@/components/shared/Loader';
import useConversations from '../../hooks/useConversations';
import { formatMessageTime } from '@/utils/formatMessageTime';

type ConversationListProps = {
  onSelectConversation: (id: string) => void;
  currentUserId: string;
};

export default function ConversationList({
  onSelectConversation,
  currentUserId,
}: ConversationListProps) {
  const { data: conversations = [], isLoading } =
    useConversations(currentUserId);

  if (isLoading) return <Loader />;

  if (conversations.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-center">
        No conversations yet.
      </div>
    );
  }

  return (
    <ConversationListLayout
      header={<ConversationListHeader currentUserId={currentUserId} />}
    >
      <div>
        {conversations.map((conv) => {
          const otherUserId = conv.participants.find(
            (id: string) => id !== currentUserId,
          );

          return (
            <UserChat
              key={conv.id}
              id={conv.id}
              name={conv.other_user?.name || 'Unknown'}
              lastMessage={conv.last_message}
              time={formatMessageTime(conv.last_message_time)}
              unreadCount={0}
              avatarUrl={
                conv.other_user?.avatar_url || 'https://github.com/shadcn.png'
              }
              onClick={() => onSelectConversation(conv.id)}
            />
          );
        })}
      </div>
    </ConversationListLayout>
  );
}
