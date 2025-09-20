import AuthLayout from '@/features/auth/components/AuthLayout';
import ResetPassword from '@/features/auth/components/ResetPassword';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
