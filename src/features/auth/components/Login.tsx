import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import pawPrint from "../assets/Paw-Prints.json";
export default function Login() {
  return (
    <section className="flex flex-col  items-center justify-center h-full text-dark-primary text-center px-4  ">
      <Lottie
        className="w-[200px] h-[200px]  md:w-[300px] md:h-[300px] xl:-mt-16"
        animationData={pawPrint}
      />

      <form className="grid w-full max-w-sm md:max-w-md lg:max-w-lg items-center gap-3 ">
        {/* email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          className="bg-gray-50 md:py-5"
          type="email"
          id="email"
          placeholder="email"
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
        {/* login btn */}
        <Button className="md:text-lg md:py-5 cursor-pointer hover:bg-dark-hover">
          Login
        </Button>
        <p className="flex items-center justify-center gap-2 text-dark">
          Don't have an account?
          <span className="text-dark-primary font-bold cursor-pointer">
            {" "}
            Sign up
          </span>
        </p>
      </form>
    </section>
  );
}
