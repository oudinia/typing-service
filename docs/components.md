# Components

## TypingService

The main facade that provides the public API.

### API Reference

#### Signal-based API

```typescript
text: Signal<string>      // Current target text
input: Signal<string>     // User's current input
layout: Signal<LayoutName> // Current keyboard layout
metrics: Signal<TypingMetrics> // Real-time typing metrics
```

#### Observable-based API

```typescript
text$: Observable<string>
input$: Observable<string>
metrics$: Observable<TypingMetrics>
isComplete$: Observable<boolean>
```

## TypingStore

Manages internal state using reactive signals.

### State Management

```typescript
private _text: Signal<string>       // Target text
private _input: Signal<string>      // User input
private _layout: Signal<LayoutName> // Keyboard layout
private _startTime: Signal<number>  // Session start time
private _metrics: Signal<TypingMetrics> // Computed metrics
```

## Signals

Reactive primitives for state management.

### Signal Interface

```typescript
interface Signal<T> {
  value: T
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
  subscribe: (fn: (value: T) => void) => () => void
}
```