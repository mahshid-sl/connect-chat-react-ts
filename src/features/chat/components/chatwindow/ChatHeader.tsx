import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LiaBroomSolid } from 'react-icons/lia';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  RiAccountCircleLine,
  RiBrushAiLine,
  RiDeleteBin7Line,
  RiLayoutRightLine,
  RiMore2Fill,
  RiPhoneFill,
  RiSearch2Line,
} from 'react-icons/ri';
import ContactInfo from '../ContactInfo';
import useConversations from '../../hooks/useConversations';
import { formatLastSeen } from '@/utils/formatLastSeen';

type ChatHeaderProps = {
  currentUserId: string;
  conversationId: string;
  isOnline?: boolean;
  lastSeen?: string;
  otherUser?: {
    name?: string;
    avatar_url?: string;
  };
};

export default function ChatHeader({
  currentUserId,
  conversationId,
  isOnline,
  lastSeen,
}: ChatHeaderProps) {
  const { data: conversations = [] } = useConversations(currentUserId);

  const currentConversation = conversations.find(
    (conv) => conv.id === conversationId,
  );
  const otherUser = currentConversation?.other_user;

  const isDeleted = otherUser?.name === 'Deleted Account';

  const deletedAvatar =
    'https://cdn-icons-png.flaticon.com/512/4712/4712104.png';

  //TODO------set wallpaper

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-50 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center gap-4">
        {/* user avatar */}
        <Avatar className={isDeleted ? 'opacity-60 grayscale' : ''}>
          <AvatarImage
            src={
              isDeleted
                ? deletedAvatar
                : otherUser?.avatar_url || 'https://github.com/shadcn.png'
            }
            alt="User"
          />
          <AvatarFallback>
            {isDeleted ? '??' : otherUser?.name.slice(0, 2) || '??'}
          </AvatarFallback>
        </Avatar>
        {/* user status and name */}
        <div className="dark:text-white">
          <p className="text-dark font-bold dark:text-white">
            {otherUser?.name || 'Unknown User'}
          </p>
          <p
            className={`text-sm ${
              isOnline ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {formatLastSeen(lastSeen, isOnline, otherUser?.name)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* search and phone call */}
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <RiSearch2Line className="h-6 w-6 text-gray-600 dark:text-white" />
        </Button>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <RiPhoneFill className="h-6 w-6 text-gray-600 dark:text-white" />
        </Button>

        {/* ======= */}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <RiLayoutRightLine className="h-6 w-6 text-gray-600 dark:text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader className="border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <span> user name</span>
                  <span className="text-xs text-gray-500">
                    last seen 2 minutes ago
                  </span>
                </div>
              </div>
            </SheetHeader>
            <ContactInfo />
          </SheetContent>
        </Sheet>

        {/* =====drop down===== */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMore2Fill
              size={20}
              className="h-6 w-6 text-gray-600 dark:text-white"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-1">
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <RiAccountCircleLine size={20} />
              view profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <RiBrushAiLine size={20} />
              Set wallpaper
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <LiaBroomSolid size={20} />
              Clear history
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-400">
              <RiDeleteBin7Line size={20} className="text-red-400" />
              <span className="text-red-400"> Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
