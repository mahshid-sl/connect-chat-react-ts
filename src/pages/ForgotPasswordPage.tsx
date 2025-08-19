import AuthLayout from '@/features/auth/components/AuthLayout';
import ForgotPassword from '@/features/auth/components/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <ForgotPassword email="" />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
