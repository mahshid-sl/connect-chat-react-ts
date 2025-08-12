import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const AuthPage = lazy(() => import("./pages/AuthPage"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-screen font-display overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
