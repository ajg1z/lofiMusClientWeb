"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

async function registerRequest(credentials: RegisterCredentials): Promise<void> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Ошибка регистрации. Проверьте введенные данные.");
  }
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerRequest(credentials);

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
