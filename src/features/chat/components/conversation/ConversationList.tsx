import ConversationListHeader from './ConversationListHeader';
import ConversationListLayout from '../layout/ConversationListLayout';
import UserChat from '../UserChat';
import Loader from '@/components/shared/Loader';
import useConversations from '../../hooks/useConversations';
import { formatMessageTime } from '@/utils/formatMessageTime';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UserList from '../UserList';
import { Plus } from 'lucide-react';
import { useState } from 'react';

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
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <>
      <ConversationListLayout
        header={<ConversationListHeader currentUserId={currentUserId} />}
      >
        <div>
          {conversations.length === 0 ? (
            <div className="text-muted-foreground p-4 text-center">
              No conversations yet. Start a new chat!
            </div>
          ) : (
            conversations.map((conv) => {
              const otherUserId = conv.participants.find(
                (id: string) => id !== currentUserId,
              );
              console.log('Other user ID:', otherUserId);
              return (
                <UserChat
                  key={conv.id}
                  id={conv.id}
                  name={conv.other_user?.name || 'Unknown'}
                  lastMessage={conv.last_message}
                  time={formatMessageTime(conv.last_message_time)}
                  unreadCount={conv.unread_count || 0}
                  avatarUrl={
                    conv.other_user?.avatar_url ||
                    'https://github.com/shadcn.png'
                  }
                  onClick={() => onSelectConversation(conv.id)}
                />
              );
            })
          )}
        </div>

        {/* new chat button */}

        <div className="fixed bottom-6 left-4">
          <button
            onClick={() => setIsUserListOpen(true)}
            className="rounded-full bg-gray-200 p-4 text-gray-600"
          >
            <Plus size={20} />
          </button>
        </div>
      </ConversationListLayout>

      {/* modal for user list */}
      <Dialog open={isUserListOpen} onOpenChange={setIsUserListOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Chat</DialogTitle>
          </DialogHeader>
          <UserList
            currentUserId={currentUserId}
            onSelectConversation={onSelectConversation}
            onClose={() => setIsUserListOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
