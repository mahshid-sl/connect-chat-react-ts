import Wave from '@/assets/wave.svg?react';
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-white">
      <Wave
        preserveAspectRatio="none"
        className="absolute top-0 left-0 h-36 w-full lg:h-40 xl:h-64 2xl:h-80"
      />
      <main className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </main>
    </div>
  );
}
