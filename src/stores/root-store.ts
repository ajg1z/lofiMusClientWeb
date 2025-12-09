import { CounterStore } from "./counter-store";

export class RootStore {
  counter = new CounterStore();
}
