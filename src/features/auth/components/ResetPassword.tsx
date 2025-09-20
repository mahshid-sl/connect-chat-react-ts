import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import supabase from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/shared/Loader';
import { useState } from 'react';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type ResetPasswordProps = {
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleBackToLogin = () => {
    navigate('/');
  };

  const onSubmit = async ({ newPassword }: ResetPasswordProps) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl font-bold text-gray-900">
            New Password
          </h1>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <Input
              {...register('newPassword')}
              type="password"
              disabled={isLoading}
              placeholder="Enter new password"
              className="mt-1 w-full"
            />
            <p className="text-sm text-red-600">
              {errors.newPassword?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              {...register('confirmPassword')}
              type="password"
              disabled={isLoading}
              placeholder="Confirm password"
              className="mt-1 w-full"
            />
            <p className="text-sm text-red-600">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="button-container flex flex-col space-y-4">
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader />}
              Update Password
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleBackToLogin}
              type="button"
              className="w-full"
            >
              Back to sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
