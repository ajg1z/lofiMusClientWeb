"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

// Моковая функция для логина
async function mockLogin(
  credentials: LoginCredentials
): Promise<{ token: string }> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Моковая валидация
  if (
    credentials.email === "test@test.com" &&
    credentials.password === "password"
  ) {
    return { token: "mock-jwt-token-12345" };
  }

  throw new Error("Неверный email или пароль");
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockLogin(credentials);

      // Сохраняем токен (в реальном приложении используйте безопасное хранилище)
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", response.token);
      }

      // Перенаправляем на главную страницу
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Произошла ошибка при входе"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
