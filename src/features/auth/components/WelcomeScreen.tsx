import { LuPawPrint } from "react-icons/lu";

import Lottie from "lottie-react";
import peekingCatAnimation from "../assets/hello-cat.json";
import { Button } from "@/components/ui/button";

type WelcomeScreenProps = {
  onGetStarted: () => void;
};

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-full text-dark-primary text-center px-4 ">
      <Lottie
        className="w-[300px] h-[300px] xl:w-[600px] xl:h-[600px]"
        animationData={peekingCatAnimation}
        // style={{ width: 300, height: 300 }}
      />

      <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold mt-10 animate-fade-in">
        Welcome to MeowChat!
      </h1>
      <p className="text-md md:text-lg lg:text-xl xl:text-3xl 2xl:text-6xl text-slate-500 mt-2 animate-fade-in-delay">
        The purr-fect place to connect.
      </p>
      <Button
        onClick={onGetStarted}
        size="lg"
        className="flex items-center justify-center mt-10"
      >
        Get Started
        <LuPawPrint />
      </Button>
    </div>
  );
};

export default WelcomeScreen;
