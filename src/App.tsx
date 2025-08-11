import AuthLayout from "./features/auth/components/AuthLayout";
import WelcomeScreen from "./features/auth/components/WelcomeScreen";

export default function App() {
  return (
    <div className="w-full h-screen font-display">
      <AuthLayout>
        <WelcomeScreen />
      </AuthLayout>
    </div>
  );
}
