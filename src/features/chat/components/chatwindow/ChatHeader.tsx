import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LiaBroomSolid } from 'react-icons/lia';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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

export default function ChatHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-50 bg-white p-4">
      <div className="flex items-center gap-4">
        {/* user avatar */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* user status and name */}
        <div>
          <p className="text-dark font-bold">user</p>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* search and phone call */}
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <RiSearch2Line className="h-6 w-6 text-gray-600" />
        </Button>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <RiPhoneFill className="h-6 w-6 text-gray-600" />
        </Button>

        {/* ======= */}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <RiLayoutRightLine className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1.5">
                  <span> user info</span>
                  <span className="text-xs text-gray-500">
                    last seen 2 minutes ago
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* =====drop down===== */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMore2Fill size={20} className="h-6 w-6 text-gray-600" />
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
