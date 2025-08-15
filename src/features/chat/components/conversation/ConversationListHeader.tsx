import { Button } from '@/components/ui/button';
import { Cat, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserProfile from '../UserProfile';
import SearchBar from '@/components/shared/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ConversationListHeader() {
  return (
    <div className="flex flex-col gap-4">
      {/*=== sheet btn / slide ===*/}
      <div className="flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span> user name</span>
              </SheetTitle>
            </SheetHeader>
            <UserProfile /> {/* محتوای پروفایل اینجا قرار می‌گیرد */}
          </SheetContent>
        </Sheet>
        <h1 className="flex items-center gap-0.5 text-xl font-bold">
          Chats
          <Cat />
        </h1>
      </div>
      {/* ============ */}

      {/* search bar*/}
      <div className="relative">
        {' '}
        <SearchBar />
      </div>
    </div>
  );
}
