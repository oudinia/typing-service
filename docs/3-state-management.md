# State Management Deep Dive

## Overview

The TypingService uses a custom signal-based state management system for reactive updates and computed values.

## Signal Implementation

### Basic Signal
```typescript
function createSignal<T>(initialValue: T): Signal<T> {
  const subject = new BehaviorSubject<T>(initialValue);
  
  return {
    // Get current value
    get value() { 
      return subject.value; 
    },
    
    // Set new value
    set: (value: T) => {
      subject.next(value);
    },
    
    // Update based on current value
    update: (fn: (value: T) => T) => {
      subject.next(fn(subject.value));
    },
    
    // Subscribe to changes
    subscribe: (fn: (value: T) => void) => {
      const subscription = subject.subscribe(fn);
      return () => subscription.unsubscribe();
    }
  };
}
```

### Computed Signal
```typescript
function computed<T>(fn: () => T, deps: Signal<any>[]): Signal<T> {
  const subject = new BehaviorSubject<T>(fn());
  
  // Create observables from signals
  const observables = deps.map(signal => 
    new Observable(subscriber => 
      signal.subscribe(value => subscriber.next(value))
    )
  );
  
  // Update when dependencies change
  const subscription = combineLatest(observables)
    .pipe(
      map(() => fn()),
      distinctUntilChanged()
    )
    .subscribe(value => subject.next(value));
  
  return {
    get value() { return subject.value; },
    set: () => { throw new Error('Cannot set computed'); },
    update: () => { throw new Error('Cannot update computed'); },
    subscribe: (fn: (value: T) => void) => {
      const sub = subject.subscribe(fn);
      return () => {
        sub.unsubscribe();
        subscription.unsubscribe();
      };
    }
  };
}
```

## State Store

The TypingStore manages all application state:

```typescript
export class TypingStore {
  // Internal signals
  private readonly _text = createSignal('');
  private readonly _input = createSignal('');
  private readonly _layout = createSignal<LayoutName>('qwerty');
  private readonly _startTime = createSignal(0);
  
  // Computed metrics
  private readonly _metrics = computed<TypingMetrics>(
    () => {
      const timeInSeconds = (Date.now() - this._startTime.value) / 1000;
      return MetricsCalculator.calculate(
        this._text.value,
        this._input.value,
        timeInSeconds
      );
    },
    [this._text, this._input, this._startTime]
  );

  // Public accessors
  get text() { return this._text; }
  get input() { return this._input; }
  get layout() { return this._layout; }
  get metrics() { return this._metrics; }

  // Actions
  setText(text: string): void {
    this._text.set(text.toLowerCase());
    this._input.set('');
    this._startTime.set(Date.now());
  }

  updateInput(input: string): void {
    this._input.set(input);
  }
}
```

## State Flow Example

Let's walk through how state flows through the system:

1. **User Types a Character**
```typescript
service.updateInput('h');
```

2. **Store Updates Input Signal**
```typescript
this._input.set('h');
```

3. **Computed Metrics Update**
```typescript
// Automatically recomputed
const metrics = MetricsCalculator.calculate(
  this._text.value,  // 'hello'
  this._input.value, // 'h'
  timeInSeconds      // elapsed time
);
```

4. **Subscribers Notified**
```typescript
service.metrics.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`); // 100%
  console.log(`WPM: ${metrics.wpm}`);           // calculated WPM
});
```