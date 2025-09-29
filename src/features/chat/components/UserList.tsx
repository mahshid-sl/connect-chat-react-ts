import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import useGetUsers from '../hooks/useGetUsers';
import useGetOrCreateConversation from '../hooks/useGetOrCreateConversation';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type UserListProps = {
  currentUserId: string;
  onSelectConversation: (conversationId: string) => void;
  onClose: () => void;
};

export default function UserList({
  currentUserId,
  onSelectConversation,
  onClose,
}: UserListProps) {
  const { data: users = [], isLoading, error } = useGetUsers(currentUserId);
  const { mutate: getOrCreateConversation } = useGetOrCreateConversation();
  const queryClient = useQueryClient();

  const handleSelectUser = (otherUserId: string) => {
    getOrCreateConversation(
      { currentUserId, otherUserId },
      {
        onSuccess: (conversation) => {
          queryClient.invalidateQueries({
            queryKey: ['conversations', currentUserId],
          });
          onSelectConversation(conversation.id);

          onClose();
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error('Error starting conversation:', error.message);
            toast.error(`Failed to start conversation: ${error.message}`);
            return;
          }
        },
      },
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading users: {error.message}</div>;
  if (users.length === 0) return <div>No users found.</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Select a user to chat</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleSelectUser(user.id)}
          >
            <Avatar>
              <AvatarImage
                src={user.avatar_url || 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase() || 'MC'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user.name || 'Unknown'}</div>
              <div className="text-sm text-gray-500">
                @{user.username || 'No username'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="mt-4 w-full" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
}
