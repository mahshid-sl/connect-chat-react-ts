import AuthLayout from '@/features/auth/components/AuthLayout';
import ForgotPassword from '@/features/auth/components/ForgotPassword';
import { AnimatePresence, motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute h-full w-full"
          >
            {<ForgotPassword />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
