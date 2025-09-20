import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPassword } from '../../auth/services/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '@/components/shared/Loader';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleBackToLogin = () => {
    navigate('/');
  };

  const onSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password reset email sent!');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl font-bold text-gray-900">
            Forgot Password
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your email to reset password.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              {...register('email')}
              type="email"
              disabled={isLoading}
              placeholder="Enter your email"
              className="mt-1 w-full"
            />
            <p className="text-sm text-red-600">{errors.email?.message}</p>
          </div>

          <div className="button-container flex flex-col space-y-2">
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader />}
              Send
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleBackToLogin}
              type="button"
              className="w-full"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
