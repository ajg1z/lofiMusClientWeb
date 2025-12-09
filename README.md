# Lofi Music Client Web

Стартовый шаблон на Next.js 16, собранный специально для разработки веб‑клиента с MobX и TanStack React Query. Здесь уже настроены базовые провайдеры, пример состояния и сетевой запрос, так что можно сразу переходить к бизнес‑логике.

## Стек
- Next.js (App Router, TypeScript, React 19)
- MobX + mobx-react-lite для локального состояния
- TanStack React Query для работы с данными и кэширования запросов
- Авторские шрифты Geist и минимальная тёмная тема

## Быстрый старт
```bash
npm install
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000), чтобы увидеть демо со счётчиком (MobX) и списком задач из React Query.

## Структура
```
app/
  layout.tsx          — общий HTML-шаблон и провайдеры
  providers.tsx       — QueryClientProvider + StoreProvider
  page.tsx            — серверный роут, рендерит HomePage
src/
  components/home/    — клиентские UI-компоненты
  queries/            — хуки React Query
  stores/             — MobX store и контекст
```

## Что уже готово
- RootStore с базовым счётчиком и контекстом `useStore`
- Инициализация `QueryClient` и пример хука `useHelloQuery`
- Клиентский компонент `HomePage` с MobX/React Query в действии

## Дальнейшие шаги
1. Замените примерные данные на реальные API.
2. Расширяйте `RootStore` новыми модулями состояния.
3. Добавьте дизайн‑систему или готовый UI‑кит.
4. Настройте линтеры/форматтеры под свои правила (ESLint уже включён).
