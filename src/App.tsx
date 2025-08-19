import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/shared/ScrollToTop';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-display min-h-screen w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
