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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import useProfile from '../hooks/useProfile';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import supabase from '@/lib/supabaseClient';
import useUpdateProfileRPC from '../hooks/useUpdateProfileRPC ';
import { useTheme } from '@/context/ThemeContext';

// Profile form validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters long'),
  username: z.string().min(3, 'username must be at least 3 characters long'),
  bio: z.string().max(60, 'bio must be at most 60 characters long').optional(),
  phone_number: z
    .string()
    .regex(/^\+?[0-9]\d{1,14}$/, 'phone number is not valid')
    .optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

type UserProfileProps = {
  currentUserId: string;
};

export default function UserProfile({ currentUserId }: UserProfileProps) {
  const { profile, isLoading } = useProfile(currentUserId);
  const { mutate: updateProfileRPC } = useUpdateProfileRPC(currentUserId);
  const [uploading, setUploading] = useState(false);

  const { toggleTheme } = useTheme();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {},
  });

  // Load initial data when profile changes
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        phone_number: profile.phone_number,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileForm) => {
    updateProfileRPC(data);
    toast.success('Profile updated successfully');
  };

  // handle Avatar Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Generate a unique file name
      const fileName = `${currentUserId}-${Date.now()}.${file.name.split('.').pop()}`;

      console.log('📤 Uploading avatar:', fileName);
      //📤 Uploading avatar: ba535888-67ca-44c1-9b30-4e0acdfd8d51-1757260620286.png

      // Upload the file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      if (!data) throw new Error('Failed to get public URL');

      const publicURL = data.publicUrl;

      // Update profile with new avatar URL
      updateProfileRPC({ avatar_url: publicURL });
      toast.success('Profile picture updated successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Upload error:', error.message);
      } else {
        console.error('Upload error:', error);
      }
      toast.error('Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  // useRef for file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto w-full max-w-sm dark:bg-gray-900 dark:text-white">
        <div className="flex max-h-[calc(86vh-2rem)] min-h-0 flex-col rounded-lg bg-white shadow dark:bg-gray-900 dark:text-white">
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
            {/* Avatar */}
            <div className="mb-2 flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={profile?.avatar_url || 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>
                  {profile?.name?.slice(0, 2).toUpperCase() || 'JD'}
                </AvatarFallback>
              </Avatar>
              {/* hidden file input for avatar upload */}
              <Input
                ref={fileInputRef}
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />

              <Label htmlFor="avatar-upload">
                <Button
                  onClick={handleFileInputClick}
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Change Profile Picture'}
                </Button>
              </Label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Bio */}
              <div className="grid gap-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <RiInformationLine size={18} /> Bio
                </Label>
                <Input id="bio" {...register('bio')} />
                {errors.bio && (
                  <p className="text-xs text-red-500">{errors.bio.message}</p>
                )}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <RiAccountCircleLine size={18} /> Name
                </Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <AtSign size={18} /> Username
                </Label>
                <Input id="username" {...register('username')} />
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <RiPhoneFill size={18} /> Phone Number
                </Label>
                <Input id="phone" {...register('phone_number')} />
                {errors.phone_number && (
                  <p className="text-xs text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Dark mode (UI) */}
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  <RiMoonLine size={18} /> Dark Mode
                </Label>
                <Switch onClick={toggleTheme} id="dark-mode" />
              </div>

              <Button type="submit" className="w-full">
                Save Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
