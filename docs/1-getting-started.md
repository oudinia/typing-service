# Getting Started with Typing Service

## Introduction

The Typing Service is a TypeScript library for building typing applications with real-time metrics tracking. This guide will walk you through the core concepts and implementation details.

## Core Concepts

### Reactive State Management

The library uses a custom signal-based reactive system. Signals are reactive primitives that hold values and notify subscribers when those values change:

```typescript
interface Signal<T> {
  value: T                              // Current value
  set: (value: T) => void              // Set new value
  update: (fn: (value: T) => T) => void // Update based on current value
  subscribe: (fn: (value: T) => void) => () => void // Subscribe to changes
}
```

Let's look at how signals work in practice:

```typescript
// Creating a signal
const text = createSignal('');

// Reading the value
console.log(text.value); // ''

// Setting a new value
text.set('hello');

// Updating based on current value
text.update(current => current.toUpperCase());

// Subscribing to changes
const unsubscribe = text.subscribe(value => {
  console.log('Text changed:', value);
});

// Cleanup subscription
unsubscribe();
```

### Computed Values

Computed signals automatically update when their dependencies change:

```typescript
const text = createSignal('hello');
const length = computed(() => text.value.length, [text]);

text.subscribe(value => {
  console.log(`Text: ${value}, Length: ${length.value}`);
});

text.set('world'); // Logs: "Text: world, Length: 5"
```

## Architecture Overview

The library follows a layered architecture:

1. **TypingService (Facade Layer)**
   - Public API for applications
   - Handles keyboard layout mapping
   - Provides both Signal and Observable APIs

2. **TypingStore (State Layer)**
   - Manages internal state
   - Handles state updates
   - Computes derived values

3. **Signals (Reactive Layer)**
   - Provides reactive primitives
   - Handles subscriptions
   - Manages dependencies

4. **Utils (Calculation Layer)**
   - Accuracy calculation
   - WPM calculation
   - Metrics aggregation

### Code Example: Complete Setup

```typescript
import { TypingService } from 'typing-service';

// Create service instance
const service = new TypingService();

// Set up typing session
service.setText('hello world');
service.setLayout('qwerty');

// Track metrics using Signal API
service.metrics.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`);
  console.log(`WPM: ${metrics.wpm}`);
});

// Or use Observable API
service.metrics$.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`);
  console.log(`WPM: ${metrics.wpm}`);
});

// Process user input
service.updateInput('hello');
```