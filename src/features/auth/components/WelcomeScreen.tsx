import { LuPawPrint } from 'react-icons/lu';
import Lottie from 'lottie-react';
import peekingCatAnimation from '../assets/hello-cat.json';
import { Button } from '@/components/ui/button';

type WelcomeScreenProps = {
  onGetStarted: () => void;
};

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="text-dark-primary mx-auto flex max-w-screen-xl flex-col items-center justify-center px-4 text-center">
      <Lottie
        loop={false}
        className="aspect-square w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:-mt-16 xl:max-w-[600px]"
        animationData={peekingCatAnimation}
      />
      <h1 className="animate-fade-in mt-10 text-2xl font-bold md:text-4xl lg:mt-5 lg:text-5xl xl:text-6xl 2xl:text-7xl">
        Welcome to MeowChat!
      </h1>
      <p className="text-md animate-fade-in-delay mt-2 max-w-2xl text-slate-500 md:text-lg lg:text-xl xl:text-2xl">
        The purr-fect place to connect.
      </p>
      <Button
        onClick={onGetStarted}
        className="hover:bg-dark-hover mt-10 flex h-10 cursor-pointer items-center justify-center gap-1 px-6 text-base md:h-11 md:px-8 md:text-lg xl:h-14 xl:px-12 xl:text-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        Get Started
        <LuPawPrint />
      </Button>
    </div>
  );
};

export default WelcomeScreen;
