import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Lottie from 'lottie-react';
import pawPrint from '../assets/Paw-Prints.json';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from '../services/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import Loader from '@/components/shared/Loader';

type LoginProps = {
  onSwitchToSignup: () => void;
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

export default function Login({ onSwitchToSignup }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const { data: userData, error } = await signIn(data);

      if (error) {
        toast.error(`Email or password is incorrect`);
        return;
      }
      if (userData?.user) {
        toast.success('Login successful!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="text-dark-primary flex h-full flex-col items-center justify-center px-4 text-center">
      <Lottie
        className="-mb-25 h-[10rem] w-[10rem] md:-mb-30 md:h-[12rem] md:w-[15rem]"
        animationData={pawPrint}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid w-full max-w-sm items-center gap-3 md:max-w-md lg:max-w-lg"
      >
        <h1 className="mb-8 justify-self-start text-2xl font-extrabold">
          Sign in
        </h1>

        {/* Email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          {...register('email')}
          className="bg-gray-50 placeholder:text-sm md:py-5 md:placeholder:text-base"
          type="email"
          id="email"
          placeholder="Enter your email"
          disabled={isLoading}
        />
        <p className="text-left text-sm text-red-500">
          {errors.email?.message}
        </p>
        {/* Password */}
        <Label className="md:text-lg" htmlFor="password">
          Password
        </Label>
        <Input
          {...register('password')}
          className="bg-gray-50 placeholder:text-sm md:py-5 md:placeholder:text-base"
          type="password"
          id="password"
          placeholder="Enter your password"
          disabled={isLoading}
        />
        <p className="text-left text-sm text-red-500">
          {errors.password?.message}
        </p>

        {/* Forgot Password */}
        <Link
          to="/forgot-password"
          className="hover:text-dark-hover my-2 cursor-pointer justify-self-end text-sm text-gray-500"
        >
          Forgot Password?
        </Link>

        {/* Login btn */}
        <Button
          disabled={isLoading}
          type="submit"
          className="hover:bg-dark-hover flex cursor-pointer md:py-5 md:text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          {isLoading && <Loader />}
          Sign in
        </Button>

        {/* Switch to signup */}
        <p className="text-dark flex items-center justify-center gap-2">
          Don't have an account?
          <span
            onClick={onSwitchToSignup}
            className="text-dark-primary cursor-pointer font-bold hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </section>
  );
}
