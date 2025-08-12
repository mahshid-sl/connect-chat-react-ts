import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import pawPrint from "../assets/Paw-Prints.json";

type signupProps = {
  onSwitchToLogin: () => void;
};

export default function Signup({ onSwitchToLogin }: signupProps) {
  return (
    <section className="flex flex-col  items-center justify-center h-full text-dark-primary text-center px-4 mt-8 ">
      <Lottie
        className="w-[10rem] h-[10rem]  md:w-[15rem] md:h-[12rem] md:-mb-30 "
        animationData={pawPrint}
      />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full max-w-sm md:max-w-md lg:max-w-lg items-center gap-3 "
      >
        <h1 className="justify-self-start text-2xl font-extrabold mb-8">
          Sign up
        </h1>
        {/* username */}
        <Label className="md:text-lg" htmlFor="username">
          Username
        </Label>
        <Input
          className="bg-gray-50 md:py-5 placeholder:text-sm"
          type="text"
          id="username"
          placeholder="e.g. Lucy"
        />
        {/* email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          className="bg-gray-50 md:py-5 placeholder:text-sm"
          type="email"
          id="email"
          placeholder="example@gmail.com"
        />
        {/* password */}
        <Label className="md:text-lg" htmlFor="password">
          password
        </Label>
        <Input
          className="bg-gray-50  md:py-5 placeholder:text-sm"
          type="password"
          id="password"
          placeholder="password"
        />

        {/* Sign up btn */}
        <Button className="md:text-lg md:py-5 cursor-pointer hover:bg-dark-hover">
          Sign up
        </Button>
        <p className="flex items-center justify-center gap-2 text-dark">
          Already have an account?
          <span
            onClick={onSwitchToLogin}
            className="text-dark-primary font-bold cursor-pointer"
          >
            {" "}
            Sign in
          </span>
        </p>
      </form>
    </section>
  );
}
