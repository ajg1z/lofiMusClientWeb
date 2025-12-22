# Когда использовать что: Server Actions vs Клиентские запросы

## Для удаленного NestJS бэкенда

### ✅ **Рекомендуется: Клиентские компоненты + React Query**

**Когда использовать:**
- У вас удаленный бэкенд (NestJS на другом сервере)
- Нужно кэширование данных
- Нужны оптимистичные обновления
- Нужен автоматический refetch при фокусе окна
- Хотите минимизировать латентность (меньше хопов)

**Пример:**
```typescript
// queries/useUsersMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserDto) => apiPost("/api/users", data),
    onSuccess: () => {
      // Автоматически обновить кэш
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

**Преимущества:**
- ✅ Меньше латентность (клиент → бэкенд напрямую)
- ✅ Кэширование через React Query
- ✅ Оптимистичные обновления
- ✅ Автоматический refetch
- ✅ Лучший UX для интерактивных действий

---

### ⚠️ **Server Actions - только в особых случаях**

**Когда использовать Server Actions для удаленного бэкенда:**

1. **Нужно скрыть API ключи/токены**
   ```typescript
   "use server";
   export async function createUser(data: CreateUserDto) {
     // API ключ не попадает в браузер
     const response = await fetch("https://api.example.com/users", {
       headers: {
         Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
       },
     });
   }
   ```

2. **CORS проблемы** (если бэкенд не настроен для клиентских запросов)
   - Но лучше настроить CORS в NestJS!

3. **Нужна дополнительная серверная логика**
   ```typescript
   "use server";
   export async function createUserWithValidation(data: CreateUserDto) {
     // Валидация на сервере Next.js
     if (!isValid(data)) throw new Error("Invalid data");
     
     // Трансформация данных
     const transformed = transformData(data);
     
     // Запрос к бэкенду
     return apiPost("/api/users", transformed);
   }
   ```

**Недостатки для удаленного бэкенда:**
- ❌ Дополнительный хоп: клиент → Next.js сервер → NestJS бэкенд
- ❌ Больше латентность
- ❌ Нет кэширования из коробки (нужно настраивать)
- ❌ Нет оптимистичных обновлений
- ❌ Избыточно, если просто проксируете запросы

---

### ✅ **Серверные компоненты - для начальной загрузки**

**Когда использовать:**
- Начальная загрузка данных (SSR)
- SEO важнее интерактивности
- Данные нужны сразу при рендеринге

**Пример:**
```typescript
// app/users/page.tsx
import { apiGet } from "@/lib/api";

export default async function UsersPage() {
  // Запрос выполняется на сервере Next.js
  const users = await apiGet("/api/users");
  return <UsersList initialData={users} />;
}
```

---

## Сравнительная таблица

| Сценарий | Server Actions | Клиент + React Query | Серверный компонент |
|----------|---------------|---------------------|---------------------|
| **Удаленный бэкенд (обычный случай)** | ❌ Избыточно | ✅ **Рекомендуется** | ✅ Для начальной загрузки |
| **Прямой доступ к БД на Next.js** | ✅ **Идеально** | ❌ Нельзя | ✅ Можно |
| **Скрыть API ключи** | ✅ **Нужно** | ❌ Ключи в браузере | ✅ Можно |
| **CORS проблемы** | ✅ Обходит | ❌ Не работает | ✅ Обходит |
| **Кэширование** | ⚠️ Вручную | ✅ **Автоматически** | ⚠️ Через Next.js |
| **Оптимистичные обновления** | ❌ Нет | ✅ **Есть** | ❌ Нет |
| **Латентность** | ❌ Выше (2 хопа) | ✅ **Ниже (1 хоп)** | ✅ Низкая (SSR) |

---

## Рекомендации для вашего случая (удаленный NestJS)

### 1. **Начальная загрузка** → Серверный компонент
```typescript
// app/users/page.tsx
export default async function UsersPage() {
  const users = await apiGet("/api/users");
  return <UsersList initialData={users} />;
}
```

### 2. **Интерактивные действия** → Клиентский компонент + React Query
```typescript
// components/UserForm.tsx
"use client";
import { useCreateUser } from "@/queries/useUsersMutation";

export function UserForm() {
  const createUser = useCreateUser();
  // ...
}
```

### 3. **Server Actions** → Только если:
- Нужно скрыть API ключи
- CORS не настроен (но лучше настроить!)
- Нужна сложная серверная логика

---

## Настройка CORS в NestJS (рекомендуется)

```typescript
// main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});
```

После настройки CORS можно использовать клиентские запросы напрямую!

