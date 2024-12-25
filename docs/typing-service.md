# Typing Service Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Core Components](#core-components)
4. [State Management](#state-management)
5. [Keyboard Layout Support](#keyboard-layout-support)
6. [Metrics Calculation](#metrics-calculation)
7. [Reactive Programming Model](#reactive-programming-model)
8. [Testing Strategy](#testing-strategy)
9. [API Reference](#api-reference)
10. [Implementation Details](#implementation-details)

## Introduction

The Typing Service is a comprehensive solution for building typing applications with features like:
- Real-time accuracy tracking
- Words per minute (WPM) calculation
- Multiple keyboard layout support
- Reactive state management
- Framework-agnostic design

## Architecture Overview

### High-Level Architecture

```
┌─────────────────┐
│  TypingService  │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Store   │
    └────┬────┘
         │
   ┌─────┴─────┐
   │  Signals  │
   └─────┬─────┘
         │
    ┌────┴────┐
    │  RxJS   │
    └─────────┘
```

The service follows a unidirectional data flow pattern with clear separation of concerns.

## Core Components

### TypingService

The main facade that provides the public API:

```typescript
export class TypingService {
  private store: TypingStore;

  // Signal-based API
  get text(): Signal<string>
  get input(): Signal<string>
  get layout(): Signal<LayoutName>
  get metrics(): Signal<TypingMetrics>

  // Observable-based API
  get text$(): Observable<string>
  get input$(): Observable<string>
  get metrics$(): Observable<TypingMetrics>
  get isComplete$(): Observable<boolean>

  // Actions
  setLayout(layout: LayoutName): void
  setText(text: string): void
  updateInput(input: string): void
  processKey(key: string): string
}
```

### TypingStore

Manages the application state using signals:

```typescript
export class TypingStore {
  private readonly _text: Signal<string>
  private readonly _input: Signal<string>
  private readonly _layout: Signal<LayoutName>
  private readonly _startTime: Signal<number>
  private readonly _metrics: Signal<TypingMetrics>
}
```

## State Management

### Signal-based State

The application uses a custom signal implementation for fine-grained reactivity:

```typescript
interface Signal<T> {
  value: T
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
  subscribe: (fn: (value: T) => void) => () => void
}
```

### Computed Values

Computed signals automatically update based on their dependencies:

```typescript
const metrics = computed<TypingMetrics>(
  () => MetricsCalculator.calculate(text.value, input.value, timeInSeconds),
  [text, input, startTime]
);
```

## Keyboard Layout Support

### Supported Layouts

- QWERTY
- AZERTY
- Colemak (target layout)

### Layout Mapping

Keyboard layouts are mapped using key-value pairs:

```typescript
export const QWERTY_TO_COLEMAK: KeyMapping = {
  'q': 'q',
  'w': 'w',
  'e': 'f'
}
```

## Metrics Calculation

### Accuracy Calculation

The service calculates typing accuracy using two methods:

1. Partial Accuracy (during typing):
```typescript
static calculatePartialAccuracy(target: string, input: string): number {
  if (input.length === 0) return 100;
  
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) correct++;
  }
  
  return Math.round((correct / input.length) * 100);
}
```

2. Final Accuracy (on completion):
```typescript
static calculateFinalAccuracy(target: string, input: string): number {
  if (input.length === 0) return 0;
  
  let correct = 0;
  const compareLength = Math.min(input.length, target.length);
  
  for (let i = 0; i < compareLength; i++) {
    if (input[i] === target[i]) correct++;
  }
  
  return Math.round((correct / Math.max(input.length, target.length)) * 100);
}
```

### WPM Calculation

Words per minute are calculated using the standard formula:

```typescript
static calculate(totalChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  return Math.round(totalChars * WORDS_PER_CHAR / minutes);
}
```

## Testing Strategy

### Unit Tests

The service includes comprehensive unit tests for:
- Keyboard mapping
- Accuracy calculation
- WPM calculation
- State management
- Reactive updates

### Test Categories

1. Correct Typing Tests:
```typescript
it('should maintain 100% accuracy with correct typing', () => {
  service.setText('hello world');
  service.updateInput('h');
  expect(service.accuracy).toBe(100);
  
  service.updateInput('he');
  expect(service.accuracy).toBe(100);
});
```

2. Mistake Handling Tests:
```typescript
it('should calculate accuracy with mistakes', () => {
  service.setText('hello');
  service.updateInput('heklo');
  expect(service.accuracy).toBe(80);
});
```

3. Backspace Correction Tests:
```typescript
it('should handle backspace corrections', () => {
  service.setText('hello');
  service.updateInput('hekl');
  expect(service.accuracy).toBe(75);
  
  service.updateInput('hel');
  expect(service.accuracy).toBe(100);
});
```

## API Reference

### TypingService API

#### Properties

| Name | Type | Description |
|------|------|-------------|
| text | Signal<string> | Current target text |
| input | Signal<string> | Current user input |
| layout | Signal<LayoutName> | Current keyboard layout |
| metrics | Signal<TypingMetrics> | Current typing metrics |

#### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| setText | text: string | void | Sets new target text |
| setLayout | layout: LayoutName | void | Changes keyboard layout |
| updateInput | input: string | void | Updates user input |
| processKey | key: string | string | Maps key based on layout |

### TypingMetrics Interface

```typescript
interface TypingMetrics {
  accuracy: number;
  wpm: number;
  isComplete: boolean;
  correctChars: number;
  totalChars: number;
}
```

## Implementation Details

### State Updates

The store handles state updates atomically:

```typescript
setText(text: string): void {
  this._text.set(text.toLowerCase());
  this._input.set('');
  this._startTime.set(Date.now());
}

updateInput(input: string): void {
  this._input.set(input);
}
```

### Framework Integration

The service provides both Signal and Observable APIs for framework integration:

```typescript
// Signal API
const text = service.text;
text.subscribe(value => console.log(value));

// Observable API
const text$ = service.text$;
text$.subscribe(value => console.log(value));
```

### Error Handling

The service includes proper error handling:

1. Computed Signal Protection:
```typescript
set: () => {
  throw new Error('Cannot set a computed signal directly');
},
update: () => {
  throw new Error('Cannot update a computed signal directly');
}
```

2. Input Validation:
```typescript
setText(text: string): void {
  this._text.set(text.toLowerCase());
}
```

3. Layout Validation:
```typescript
setLayout(layout: LayoutName): void {
  if (layout !== 'qwerty' && layout !== 'azerty') {
    throw new Error('Invalid layout');
  }
  this._layout.set(layout);
}
```