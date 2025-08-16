import ConversationListHeader from './ConversationListHeader';
import ConversationListLayout from '../layout/ConversationListLayout';
import UserChat from '../UserChat';

const chats = [
  {
    id: 1,
    name: 'Alice',
    lastMessage: 'Hey there!',
    time: '9:15 AM',
    unreadCount: 3,
  },
  {
    id: 2,
    name: 'Bob',
    lastMessage: 'How are you?',
    time: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 3,
    name: 'Charlie',
    lastMessage: 'See you soon!',
    time: '2d ago',
    unreadCount: 1,
  },
];
export default function ConversationList() {
  return (
    <ConversationListLayout header={<ConversationListHeader />}>
      {chats.length === 0 ? (
        <div className="text-muted-foreground p-4 text-center">
          No conversations found.
        </div>
      ) : (
        chats.map((chat) => <UserChat key={chat.id} {...chat} />)
      )}
    </ConversationListLayout>
  );
}
