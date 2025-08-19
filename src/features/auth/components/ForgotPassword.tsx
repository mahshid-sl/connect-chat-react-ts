import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ForgotPasswordProps = {
  email: string;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Implement password reset logic
};

const ForgotPassword = ({ email }: ForgotPasswordProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your email address to reset your password.
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <Button type="submit" className="w-full rounded-md px-4 py-2">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
