import ConversationListHeader from './ConversationListHeader';
import ConversationListLayout from '../layout/ConversationListLayout';
import UserChat from '../UserChat';

type ConversationListProps = {
  onSelectConversation: (id: string) => void;
};

export default function ConversationList({
  onSelectConversation,
}: ConversationListProps) {
  const conversations = [
    {
      id: '537d2256-1a2c-4f7f-a174-bb4b87030707',
      name: 'Alice',
      lastMessage: 'Hey there!',
      time: '9:15 AM',
      unreadCount: 3,
    },
  ];

  return (
    <ConversationListLayout header={<ConversationListHeader />}>
      {conversations.length === 0 ? (
        <div className="text-muted-foreground p-4 text-center">
          No conversations found.
        </div>
      ) : (
        conversations.map((c) => (
          <UserChat
            key={c.id}
            {...c}
            onClick={() => onSelectConversation(c.id)}
          />
        ))
      )}
    </ConversationListLayout>
  );
}
