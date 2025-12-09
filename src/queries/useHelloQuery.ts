import { useQuery } from "@tanstack/react-query";

interface DemoTodo {
  id: number;
  title: string;
}

async function fetchTodos(): Promise<DemoTodo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");

  if (!response.ok) {
    throw new Error("Не удалось загрузить данные");
  }

  return response.json();
}

export function useHelloQuery() {
  return useQuery({
    queryKey: ["demo-todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // 1 минута
  });
}
