import { Button } from '@/components/ui/button';
import { Cat, Menu } from 'lucide-react';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import UserProfile from '../UserProfile';
import SearchBar from '@/components/shared/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  RiAccountCircleLine,
  RiDeleteBin7Line,
  RiLogoutBoxRLine,
  RiLogoutCircleRLine,
} from 'react-icons/ri';
import useProfile from '../../hooks/useProfile';

type ConversationListHeaderProps = {
  currentUserId: string;
};

export default function ConversationListHeader({
  currentUserId,
}: ConversationListHeaderProps) {
  const { profile } = useProfile(currentUserId);

  return (
    <div className="flex flex-col gap-4">
      {/*=== sheet btn / slide ===*/}
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex space-x-4">
            <SheetHeader className="">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        profile?.avatar_url || 'https://github.com/shadcn.png'
                      }
                    />
                    <AvatarFallback>
                      {profile?.name?.slice(0, 2).toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{profile?.name || 'User'}</span>
                </div>
                {/* =====drop down===== */}
                <div className="mr-3 flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <RiLogoutCircleRLine
                        size={20}
                        className="text-gray-600"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-3 mr-10">
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <RiAccountCircleLine size={20} />
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                        <RiLogoutBoxRLine size={20} />
                        Log out
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-400">
                        <RiDeleteBin7Line size={20} className="text-red-400" />
                        <span className="text-red-400"> Delete Account</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SheetHeader>
            <UserProfile currentUserId={currentUserId} />
          </SheetContent>
        </Sheet>
        <h1 className="flex items-center gap-0.5 text-xl font-bold">
          Chats
          <Cat />
        </h1>
      </div>
      {/* ============ */}

      {/* search bar*/}
      <div className="rounded-md bg-gray-50 p-1">
        <SearchBar />
      </div>
    </div>
  );
}
