import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import pawPrint from "../assets/Paw-Prints.json";
export default function Signup() {
  return (
    <section className="flex flex-col  items-center justify-center h-full text-dark-primary text-center px-4  ">
      <Lottie
        className="w-[10rem] h-[10rem]  md:w-[15rem] md:h-[12rem] md:-mb-30 "
        animationData={pawPrint}
      />

      <form className="grid w-full max-w-sm md:max-w-md lg:max-w-lg items-center gap-3 ">
        <h1 className="justify-self-start text-2xl font-extrabold mb-8">
          Sign up
        </h1>
        {/* username */}
        <Label className="md:text-lg" htmlFor="username">
          Username
        </Label>
        <Input
          className="bg-gray-50 md:py-5"
          type="text"
          id="username"
          placeholder="e.g. Lucy"
        />
        {/* email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          className="bg-gray-50 md:py-5"
          type="email"
          id="email"
          placeholder="example@gmail.com"
        />
        {/* password */}
        <Label className="md:text-lg" htmlFor="password">
          password
        </Label>
        <Input
          className="bg-gray-50  md:py-5"
          type="password"
          id="password"
          placeholder="password"
        />

        {/* confirm password */}
        <Label className="md:text-lg" htmlFor="confirmPassword">
          confirm password
        </Label>
        <Input
          className="bg-gray-50  md:py-5"
          type="password"
          id="confirmPassword"
          placeholder="confirm password"
        />

        {/* Sign up btn */}
        <Button className="md:text-lg md:py-5 cursor-pointer hover:bg-dark-hover">
          Sign up
        </Button>
      </form>
    </section>
  );
}
