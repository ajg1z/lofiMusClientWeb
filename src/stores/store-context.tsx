"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { RootStore } from "./root-store";

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new RootStore());

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return store;
}
