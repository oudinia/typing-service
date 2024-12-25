import { BehaviorSubject } from 'rxjs';

export interface Signal<T> {
  value: T;
  set: (value: T) => void;
  update: (fn: (value: T) => T) => void;
  subscribe: (fn: (value: T) => void) => () => void;
}

export function createSignal<T>(initialValue: T): Signal<T> {
  const subject = new BehaviorSubject<T>(initialValue);
  
  return {
    get value() {
      return subject.value;
    },
    set: (value: T) => subject.next(value),
    update: (fn: (value: T) => T) => subject.next(fn(subject.value)),
    subscribe: (fn: (value: T) => void) => {
      const subscription = subject.subscribe(fn);
      return () => subscription.unsubscribe();
    }
  };
}