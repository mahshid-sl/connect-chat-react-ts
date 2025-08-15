import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RiCheckDoubleLine } from 'react-icons/ri';

export default function UserChat() {
  return (
    <div className="m-3 flex cursor-pointer items-center justify-center space-x-4 rounded bg-gray-50 p-3 hover:bg-gray-100">
      {/* <Avatar /> */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* chatInfo */}
      <div className="flex-1 space-y-1">
        {/* username */}
        <div className="username flex items-start justify-between">
          <div className="text-sm font-bold">
            <span> user name</span>
          </div>

          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <span>
              <RiCheckDoubleLine size={18} />
            </span>
            <span>10:43 AM</span>
          </div>
        </div>
        {/* chat message */}
        <div className="items-centerchat-message text-muted-foreground flex justify-between text-sm font-normal">
          <div className="message line-clamp-1">
            {' '}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            molestiae sequi, vitae minima inventore magnam maxime soluta
            dolores, nemo aperiam quibusdam officiis id consequuntur eius nulla
            vel libero tempora neque?
          </div>
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            2
          </Badge>
        </div>
      </div>
    </div>
  );
}
