import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LiaBroomSolid } from "react-icons/lia";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  RiAccountCircleLine,
  RiBrushAiLine,
  RiDeleteBin7Line,
  RiMore2Fill,
  RiPhoneFill,
  RiSearch2Line,
} from "react-icons/ri";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-50 bg-white  shrink-0">
      <div className="flex items-center gap-4">
        {/* user avatar */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* user status and name */}
        <div>
          <p className="font-bold text-dark">user</p>
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
        {/* =====drop down===== */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMore2Fill size={20} className="h-6 w-6 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-1 ">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <RiAccountCircleLine size={20} />
              view profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <RiBrushAiLine size={20} />
              Set wallpaper
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer ">
              <LiaBroomSolid size={20} />
              Clear history
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-400 cursor-pointer ">
              <RiDeleteBin7Line size={20} className=" text-red-400" />
              <span className="text-red-400"> Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
