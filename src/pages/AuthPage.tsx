import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '@/features/auth/components/AuthLayout';
import WelcomeScreen from '@/features/auth/components/WelcomeScreen';
import Signup from '@/features/auth/components/Signup';
import Login from '@/features/auth/components/Login';

type View = 'welcome' | 'signup' | 'login';

const AuthPage = () => {
  const [view, setView] = useState<View>('welcome');

  const renderContent = () => {
    switch (view) {
      case 'signup':
        return <Signup onSwitchToLogin={() => setView('login')} />;
      case 'login':
        return <Login onSwitchToSignup={() => setView('signup')} />;
      case 'welcome':
      default:
        return <WelcomeScreen onGetStarted={() => setView('signup')} />;
    }
  };

  return (
    <AuthLayout>
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
