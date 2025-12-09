import { makeAutoObservable } from "mobx";

export class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  get isPositive() {
    return this.count > 0;
  }
}
