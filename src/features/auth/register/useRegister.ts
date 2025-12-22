"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterCredentials {
  email: string;
  password: string;
}

// Моковая функция для регистрации
async function mockRegister(
  credentials: RegisterCredentials
): Promise<{ token: string }> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Моковая валидация
  if (credentials.email && credentials.password.length >= 6) {
    return { token: "mock-jwt-token-12345" };
  }

  throw new Error("Ошибка регистрации. Проверьте введенные данные.");
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockRegister(credentials);

      // Сохраняем токен (в реальном приложении используйте безопасное хранилище)
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", response.token);
      }

      // Перенаправляем на главную страницу
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Произошла ошибка при регистрации"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
