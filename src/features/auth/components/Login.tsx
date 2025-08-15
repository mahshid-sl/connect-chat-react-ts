// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Lottie from 'lottie-react';
// import pawPrint from '../assets/Paw-Prints.json';
// import { useNavigate } from 'react-router-dom';

// type loginProps = {
//   onSwitchToSignup: () => void;
// };

// export default function Login({ onSwitchToSignup }: loginProps) {
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // TODO: Implement login logic WITH REACT HOOK FORM

//     navigate('/home');
//   };

//   return (
//     <section className="text-dark-primary flex h-full flex-col items-center justify-center px-4 text-center">
//       <Lottie
//         className="h-[10rem] w-[10rem] md:mt-20 md:h-[12rem] md:w-[15rem]"
//         animationData={pawPrint}
//       />

//       <form
//         onSubmit={handleSubmit}
//         className="grid w-full max-w-sm items-center gap-3 md:max-w-md lg:max-w-lg"
//       >
//         <h1 className="mb-10 justify-self-start text-2xl font-extrabold">
//           Sign in
//         </h1>

//         {/* email */}
//         <Label className="md:text-lg" htmlFor="email">
//           Email
//         </Label>
//         <Input
//           className="bg-gray-50 placeholder:text-sm md:py-5"
//           type="email"
//           id="email"
//           placeholder="email"
//         />
//         {/* password */}
//         <Label className="md:text-lg" htmlFor="password">
//           password
//         </Label>
//         <Input
//           className="bg-gray-50 placeholder:text-sm md:py-5"
//           type="password"
//           id="password"
//           placeholder="password"
//         />
//         <p className="hover:text-dark-hover my-2 cursor-pointer justify-self-end text-sm text-gray-500">
//           Forgot Password?
//         </p>
//         {/* login btn */}
//         <Button
//           onClick={() => navigate('/home')}
//           className="hover:bg-dark-hover cursor-pointer md:py-5 md:text-lg"
//         >
//           sign in
//         </Button>
//         <p className="text-dark flex items-center justify-center gap-2">
//           Don't have an account?
//           <span
//             onClick={onSwitchToSignup}
//             className="text-dark-primary cursor-pointer font-bold"
//           >
//             {' '}
//             Sign up
//           </span>
//         </p>
//       </form>
//     </section>
//   );
// }
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Lottie from 'lottie-react';
import pawPrint from '../assets/Paw-Prints.json';
import { useNavigate } from 'react-router-dom';

type LoginProps = {
  onSwitchToSignup: () => void;
};

export default function Login({ onSwitchToSignup }: LoginProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: اعتبارسنجی با react-hook-form
    navigate('/home');
  };

  return (
    <section className="text-dark-primary flex h-full flex-col items-center justify-center px-4 text-center">
      <Lottie
        className="-mb-25 h-[10rem] w-[10rem] md:-mb-30 md:h-[12rem] md:w-[15rem]"
        animationData={pawPrint}
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid w-full max-w-sm items-center gap-3 md:max-w-md lg:max-w-lg"
      >
        <h1 className="mb-8 justify-self-start text-2xl font-extrabold">
          Sign in
        </h1>

        {/* Email */}
        <Label className="md:text-lg" htmlFor="email">
          Email
        </Label>
        <Input
          required
          className="bg-gray-50 placeholder:text-sm md:py-5 md:placeholder:text-base"
          type="email"
          id="email"
          placeholder="Enter your email"
        />

        {/* Password */}
        <Label className="md:text-lg" htmlFor="password">
          Password
        </Label>
        <Input
          required
          className="bg-gray-50 placeholder:text-sm md:py-5 md:placeholder:text-base"
          type="password"
          id="password"
          placeholder="Enter your password"
        />

        {/* Forgot Password */}
        <button
          type="button"
          className="hover:text-dark-hover my-2 cursor-pointer justify-self-end text-sm text-gray-500"
        >
          Forgot Password?
        </button>

        {/* Login btn */}
        <Button
          type="submit"
          className="hover:bg-dark-hover cursor-pointer md:py-5 md:text-lg"
        >
          Sign in
        </Button>

        {/* Switch to signup */}
        <p className="text-dark flex items-center justify-center gap-2">
          Don't have an account?
          <span
            onClick={onSwitchToSignup}
            className="text-dark-primary cursor-pointer font-bold hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </section>
  );
}
