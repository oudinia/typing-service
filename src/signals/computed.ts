import { Signal } from './create-signal';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export function computed<T>(fn: () => T, deps: Signal<any>[]): Signal<T> {
  const subject = new BehaviorSubject<T>(fn());
  
  // Create observables from signals
  const observables = deps.map(signal => 
    new Observable<any>(subscriber => signal.subscribe(value => subscriber.next(value)))
  );
  
  // Combine all dependencies and compute new value
  const subscription = combineLatest(observables).pipe(
    map(() => fn()),
    distinctUntilChanged()
  ).subscribe(value => subject.next(value));
  
  return {
    get value() {
      return subject.value;
    },
    set: () => {
      throw new Error('Cannot set a computed signal directly');
    },
    update: () => {
      throw new Error('Cannot update a computed signal directly');
    },
    subscribe: (fn: (value: T) => void) => {
      const sub = subject.subscribe(fn);
      return () => {
        sub.unsubscribe();
        subscription.unsubscribe();
      };
    }
  };
}