# Signals System

## Overview

The signals system provides reactive primitives for state management and computation.

## Core Types

### Signal Interface

```typescript
interface Signal<T> {
  value: T
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
  subscribe: (fn: (value: T) => void) => () => void
}
```

## Features

1. Value Management
   - Immutable updates
   - Type-safe operations
   - Controlled mutations

2. Subscriptions
   - Change notifications
   - Cleanup handling
   - Memory safety

3. Computed Values
   - Automatic updates
   - Dependency tracking
   - Caching

## Implementation

### Signal Creation

```typescript
function createSignal<T>(initialValue: T): Signal<T> {
  const subject = new BehaviorSubject<T>(initialValue);
  
  return {
    get value() { return subject.value; },
    set: (value: T) => subject.next(value),
    update: (fn: (value: T) => T) => 
      subject.next(fn(subject.value)),
    subscribe: (fn: (value: T) => void) => {
      const subscription = subject.subscribe(fn);
      return () => subscription.unsubscribe();
    }
  };
}
```