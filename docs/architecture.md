# Architecture

## Overview

The typing service is a comprehensive solution for building typing applications with real-time metrics tracking, keyboard layout support, and reactive state management.

## Core Components

### TypingService

The main facade providing the public API:

```typescript
class TypingService {
  // Signal-based API
  text: Signal<string>
  input: Signal<string>
  layout: Signal<LayoutName>
  metrics: Signal<TypingMetrics>

  // Observable-based API
  text$: Observable<string>
  input$: Observable<string>
  metrics$: Observable<TypingMetrics>
  isComplete$: Observable<boolean>
}
```

### TypingStore

Internal state management using signals:

```typescript
class TypingStore {
  private _text: Signal<string>
  private _input: Signal<string>
  private _layout: Signal<LayoutName>
  private _startTime: Signal<number>
  private _metrics: Signal<TypingMetrics>
}
```

### Signals

Custom reactive primitives:

```typescript
interface Signal<T> {
  value: T
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
  subscribe: (fn: (value: T) => void) => () => void
}
```