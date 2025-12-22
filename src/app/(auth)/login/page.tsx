import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Вход
      </h1>
      <LoginForm />
    </div>
  );
}
