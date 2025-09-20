import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/shared/ScrollToTop';
import { Toaster } from 'sonner';
import { AuthProvider } from './features/auth/context/AuthContext';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-center" duration={3000} />
      <div className="font-display min-h-screen w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
          </AuthProvider>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
