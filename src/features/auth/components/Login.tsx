import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lottie from "lottie-react";
import pawPrint from "../assets/Paw-Prints.json";
export default function Login() {
  return (
    <section className="flex flex-col  items-center justify-center h-full text-dark-primary text-center px-4  ">
      <Lottie
        className="w-[10rem] h-[10rem]  md:w-[15rem] md:h-[15rem] md:mt-20 "
        animationData={pawPrint}
      />

      <form className="grid w-full max-w-sm md:max-w-md lg:max-w-lg items-center gap-3 ">
        <h1 className="justify-self-start text-2xl font-extrabold mb-10">
          Login
        </h1>

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
        <p className="my-2 justify-self-end text-sm text-gray-500 cursor-pointer hover:text-dark-hover">
          Forgot Password?
        </p>
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
