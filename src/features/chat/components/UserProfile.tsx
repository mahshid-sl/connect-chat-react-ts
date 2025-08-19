import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  RiAccountCircleLine,
  RiInformationLine,
  RiMoonLine,
  RiPhoneFill,
} from 'react-icons/ri';
import { AtSign } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-sm">
        <div className="flex max-h-[calc(86vh-2rem)] min-h-0 flex-col rounded-lg bg-white shadow">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
            {/* Avatar */}
            <div className="mb-2 flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Change Profile
              </Button>
            </div>

            {/* Bio */}
            <div className="grid gap-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <RiInformationLine size={18} /> Bio
              </Label>
              <Input
                id="bio"
                placeholder="Add a few words about yourself"
                maxLength={150}
              />
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <RiAccountCircleLine size={18} /> Name
              </Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <AtSign size={18} /> Username
              </Label>
              <Input id="username" placeholder="e.g. @username" />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <RiPhoneFill size={18} /> Phone number
              </Label>
              <Input id="phone" placeholder="e.g. +123456789" />
            </div>

            {/* Dark mode (UI) */}
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="dark-mode" className="flex items-center gap-2">
                <RiMoonLine size={18} /> Night Mode
              </Label>
              <Switch id="dark-mode" />
            </div>
          </div>

          <div className="shrink-0 border-t bg-white p-4">
            <Button className="w-full">Save Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
