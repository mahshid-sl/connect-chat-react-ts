import { LuPawPrint } from "react-icons/lu";

import Lottie from "lottie-react";
import peekingCatAnimation from "../assets/hello-cat.json";
import { Button } from "@/components/ui/button";

type WelcomeScreenProps = {
  onGetStarted: () => void;
};

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col  items-center justify-center h-full text-dark-primary text-center px-4 ">
      <Lottie
        className="w-[300px] h-[300px] xl:w-[600px] xl:h-[600px] xl:-mt-16"
        animationData={peekingCatAnimation}
      />

      <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold mt-10 lg:mt-5 animate-fade-in">
        Welcome to MeowChat!
      </h1>
      <p className="text-md md:text-lg lg:text-xl xl:text-3xl 2xl:text-6xl text-slate-500 mt-2 animate-fade-in-delay">
        The purr-fect place to connect.
      </p>
      <Button
        onClick={onGetStarted}
        className="flex items-center justify-center mt-10 
        h-10 px-6 text-base
        md:h-11 md:px-8 md:text-lg  
        2xl:h-16 2xl:px-14 2xl:text-xl
        cursor-pointer hover:bg-dark-hover
        "
      >
        Get Started
        <LuPawPrint />
      </Button>
    </div>
  );
};

export default WelcomeScreen;
