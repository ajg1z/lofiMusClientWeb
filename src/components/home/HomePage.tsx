"use client";

import { observer } from "mobx-react-lite";
import styles from "./home.module.css";
import { useStore } from "@/stores/store-context";
import { useHelloQuery } from "@/queries/useHelloQuery";

export const HomePage = observer(function HomePage() {
  const { counter } = useStore();
  const { data, isLoading, isError, error } = useHelloQuery();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div>
          <p className={styles.status}>Next.js + MobX + React Query готовы к работе</p>
          <h1>Скелет приложения для будущего веб‑клиента</h1>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>Счётчик из MobX</h2>
            <div className={styles.counterValue}>{counter.count}</div>
            <div className={styles.counterButtons}>
              <button type="button" onClick={() => counter.increment()}>
                +1
              </button>
              <button type="button" onClick={() => counter.decrement()}>
                -1
              </button>
            </div>
            <p className={styles.status}>
              {counter.isPositive ? "Положительное значение" : "Значение не положительное"}
            </p>
          </section>

          <section className={styles.section}>
            <h2>React Query запрос</h2>
            {isLoading && <p className={styles.status}>Загрузка...</p>}
            {isError && <p className={styles.status}>Ошибка: {error instanceof Error ? error.message : "Unknown"}</p>}
            {!isLoading && !isError && (
              <ul className={styles.todos}>
                {data?.map((todo) => (
                  <li key={todo.id} className={styles.todo}>
                    {todo.title}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
});
