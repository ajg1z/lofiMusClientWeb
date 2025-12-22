"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  name: string;
  password: string;
}

async function loginRequest(credentials: LoginCredentials): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    // Try read structured error; fallback to generic.
    const text = await res.text().catch(() => "");
    throw new Error(text || "Неверное имя пользователя или пароль");
  }
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      await loginRequest(credentials);

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
