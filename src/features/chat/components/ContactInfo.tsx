import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  RiInformationLine,
  RiPhoneFill,
  RiUserFollowLine,
  RiVolumeMuteLine,
  RiForbid2Line,
} from 'react-icons/ri';
import { AtSign, Image, FileText } from 'lucide-react';

const ContactInfo = () => {

const 




  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto w-full max-w-sm dark:border-gray-700">
        <div className="flex max-h-[calc(86vh-2rem)] min-h-0 flex-col rounded-lg bg-white shadow dark:bg-gray-800 dark:text-white">
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6">
            {/* Bio */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <RiInformationLine size={18} /> Bio
              </Label>
              <p className="text-sm text-gray-600">
                This is a short bio about the user.
              </p>
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <AtSign size={18} /> Username
              </Label>
              <p className="text-sm text-gray-600">@username</p>
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <RiPhoneFill size={18} /> Phone number
              </Label>
              <p className="text-sm text-gray-600">+123456789</p>
            </div>

            {/* Shared Media */}
            <div className="grid gap-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Image size={18} /> Shared Media
              </Label>
              <div className="flex gap-2 overflow-x-auto">
                <img
                  src="https://placehold.co/400"
                  alt="media"
                  className="h-16 w-16 rounded-md object-cover"
                />
                <img
                  src="https://placehold.co/400"
                  alt="media"
                  className="h-16 w-16 rounded-md object-cover"
                />
                <img
                  src="https://placehold.co/400"
                  alt="media"
                  className="h-16 w-16 rounded-md object-cover"
                />
              </div>
            </div>

            {/* Files */}
            <div className="grid gap-3">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <FileText size={18} /> Files
              </Label>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>resume.pdf</li>
                <li>invoice.docx</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="grid gap-2 pt-2">
              <Button
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                <RiVolumeMuteLine size={18} /> Mute Notifications
              </Button>
              <Button
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                <RiForbid2Line size={18} /> Block user
              </Button>
              <Button
                variant="destructive"
                className="flex w-full items-center gap-2"
              >
                <RiUserFollowLine size={18} /> Delete user
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
