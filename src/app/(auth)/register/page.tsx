import { RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Регистрация
      </h1>
      <RegisterForm />
    </div>
  );
}
