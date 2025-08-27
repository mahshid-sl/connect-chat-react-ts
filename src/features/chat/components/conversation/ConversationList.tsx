import ConversationListHeader from './ConversationListHeader';
import ConversationListLayout from '../layout/ConversationListLayout';
import UserChat from '../UserChat';
import useGetUsers from '../../hooks/useGetUsers';
import Loader from '@/components/shared/Loader';

type ConversationListProps = {
  onSelectConversation: (id: string) => void;
  currentUserId: string;
};

export default function ConversationList({
  onSelectConversation,
  currentUserId,
}: ConversationListProps) {
  const { data: users = [], isLoading } = useGetUsers(currentUserId);

  if (isLoading) return <Loader />;

  return (
    <ConversationListLayout header={<ConversationListHeader />}>
      {users.length === 0 ? (
        <div className="text-muted-foreground p-4 text-center">
          No conversations found.
        </div>
      ) : (
        users.map((u) => (
          <UserChat
            key={u.id}
            id={u.id}
            name={u.name}
            lastMessage=""
            onClick={() => onSelectConversation(u.id)}
          />
        ))
      )}
    </ConversationListLayout>
  );
}
