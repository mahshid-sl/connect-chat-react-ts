import Wave from "@/assets/wave.svg?react";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col bg-white w-full h-screen ">
      <Wave
        preserveAspectRatio="none"
        className="absolute w-full h-36 md:h-46 lg:h-48 xl:h-64 2xl:h-80 top-0 left-0"
      />
      <main className="relative z-10 w-full h-full"> {children}</main>
    </div>
  );
}
