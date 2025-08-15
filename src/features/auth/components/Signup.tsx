import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Lottie from 'lottie-react';
import pawPrint from '../assets/Paw-Prints.json';
import { useNavigate } from 'react-router-dom';

type signupProps = {
  onSwitchToLogin: () => void;
};
export default function Signup({ onSwitchToLogin }: signupProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //TODO: API call for signup
    navigate('/home');
  };

  return (
    <section className="text-dark-primary mt-8 flex h-full flex-col items-center justify-center px-4 text-center">
      <Lottie
        className="-mb-20 h-[10rem] w-[10rem] md:-mb-30 md:h-[12rem] md:w-[15rem]"
        animationData={pawPrint}
      />

      <form
        onSubmit={handleSubmit}
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
          required
          className="bg-gray-50 placeholder:text-sm md:py-5"
          type="text"
          id="username"
          placeholder="e.g. Lucy"
        />
        {/* email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          required
          className="bg-gray-50 placeholder:text-sm md:py-5"
          type="email"
          id="email"
          placeholder="example@gmail.com"
        />
        {/* password */}
        <Label className="md:text-lg" htmlFor="password">
          password
        </Label>
        <Input
          required
          className="bg-gray-50 placeholder:text-sm md:py-5"
          type="password"
          id="password"
          placeholder="password"
        />

        {/* Sign up btn */}
        <Button
          type="submit"
          className="hover:bg-dark-hover cursor-pointer transition-colors duration-200 md:py-5 md:text-lg"
        >
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
    </section>
  );
}
