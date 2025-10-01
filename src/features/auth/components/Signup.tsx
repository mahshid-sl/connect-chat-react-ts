import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Lottie from 'lottie-react';
import pawPrint from '../assets/Paw-Prints.json';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signUp } from '../services/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { RiInbox2Fill } from 'react-icons/ri';
import Loader from '@/components/shared/Loader';

const signupSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(50, 'Username must be at most 50 characters long'),
  email: z.string().email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

type signupProps = {
  onSwitchToLogin: () => void;
};
export default function Signup({ onSwitchToLogin }: signupProps) {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationSent, setIsConfirmationSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsLoading(true);

    const result = await signUp(data);
    if (result) {
      toast.success('Confirmation email sent! Please check your inbox.');
      setIsConfirmationSent(true);
    } else {
      toast.error('sign up failed, please try again');
    }
    setIsLoading(false);
  };

  return (
    <section className="text-dark-primary mt-8 flex h-full flex-col items-center justify-center px-4 text-center">
      {!isConfirmationSent ? (
        <>
          <Lottie
            className="-mb-20 h-[10rem] w-[10rem] md:-mb-30 md:h-[12rem] md:w-[15rem]"
            animationData={pawPrint}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full max-w-sm items-center gap-3 md:max-w-md lg:max-w-lg"
          >
            <h1 className="mb-8 justify-self-start text-2xl font-extrabold">
              Sign up
            </h1>
            {/* username */}
            <Label className="md:text-lg" htmlFor="username">
              Username
            </Label>
            <Input
              {...register('username')}
              className="bg-gray-50 placeholder:text-sm md:py-5"
              type="text"
              id="username"
              placeholder="e.g. Lucy"
              disabled={isLoading}
            />
            <p className="text-left text-sm text-red-500">
              {errors.username?.message}
            </p>
            {/* email */}
            <Label className="md:text-lg" htmlFor="email">
              Email
            </Label>
            <Input
              {...register('email')}
              className="bg-gray-50 placeholder:text-sm md:py-5"
              type="email"
              id="email"
              placeholder="example@gmail.com"
              disabled={isLoading}
            />
            <p className="text-left text-sm text-red-500">
              {errors.email?.message}
            </p>
            {/* password */}
            <Label className="md:text-lg" htmlFor="password">
              password
            </Label>
            <Input
              {...register('password')}
              className="bg-gray-50 placeholder:text-sm md:py-5"
              type="password"
              id="password"
              placeholder="password"
              disabled={isLoading}
            />
            <p className="text-left text-sm text-red-500">
              {errors.password?.message}
            </p>

            {/* Sign up btn */}
            <Button
              disabled={isLoading}
              type="submit"
              className="hover:bg-dark-hover flex cursor-pointer transition-colors duration-200 md:py-5 md:text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              {isLoading && <Loader />}
              Sign up
            </Button>
            <p className="text-dark flex items-center justify-center gap-2">
              Already have an account?
              <span
                onClick={onSwitchToLogin}
                className="text-dark-primary cursor-pointer font-bold"
              >
                {' '}
                Sign in
              </span>
            </p>
          </form>
        </>
      ) : (
        <div className="mt-4">
          <p className="text-dark-2 mb-4 flex animate-bounce flex-wrap items-center justify-center gap-1.5 text-shadow-2xs">
            A confirmation email has been sent to your inbox
            <span>
              <RiInbox2Fill />
            </span>
            Please check your email to verify your account.
          </p>
          <Button disabled={isLoading} onClick={onSwitchToLogin}>
            Go to Login
          </Button>
        </div>
      )}
    </section>
  );
}
