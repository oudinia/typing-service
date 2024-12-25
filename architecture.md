# Typing Service Architecture

## Overview

The typing service is a comprehensive solution for building typing applications with real-time metrics tracking, keyboard layout support, and reactive state management.

## Core Components

### 1. TypingService

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

Key responsibilities:
- Text and input management
- Keyboard layout handling
- Metrics calculation
- Framework integration

### 2. TypingStore

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

### 3. Signals

Custom reactive primitives:

```typescript
interface Signal<T> {
  value: T
  set: (value: T) => void
  update: (fn: (value: T) => T) => void
  subscribe: (fn: (value: T) => void) => () => void
}
```

## Test Suite Structure

### 1. Backspace Corrections
Tests handling of user corrections:
- Single character correction
- Multiple character corrections
- Accuracy recalculation

### 2. Complete Typing
Tests completion scenarios:
- Perfect completion
- Completion with mistakes
- State management

### 3. Correct Typing
Tests correct input handling:
- Accuracy maintenance
- Completion tracking
- Progressive input

### 4. Keyboard Mapping
Tests layout support:
- QWERTY mapping
- AZERTY mapping
- Special characters

### 5. Reactive Updates
Tests reactive features:
- Metrics updates
- State synchronization
- Observable streams

### 6. Typing Mistakes
Tests error handling:
- Single mistakes
- Multiple mistakes
- Length mismatches

## Utility Classes

### 1. AccuracyCalculator
Handles accuracy calculations:
- Partial accuracy during typing
- Final accuracy on completion
- Error percentage

### 2. WPMCalculator
Calculates typing speed:
- Words per minute
- Character counting
- Time normalization

### 3. MetricsCalculator
Combines all metrics:
- Accuracy
- Speed
- Completion status
- Character counts

## Best Practices

### 1. File Organization
- Small, focused files
- Clear module boundaries
- Single responsibility
- Logical grouping

### 2. Testing
- Isolated test cases
- Comprehensive coverage
- Clear descriptions
- Edge case handling

### 3. State Management
- Immutable updates
- Reactive patterns
- Clear data flow
- Type safety

### 4. Error Handling
- Input validation
- State consistency
- Error recovery
- User feedback

## Implementation Details

### 1. Accuracy Calculation

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

### 2. WPM Calculation

```typescript
static calculate(totalChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  return Math.round(totalChars * WORDS_PER_CHAR / minutes);
}
```

### 3. Metrics Aggregation

```typescript
static calculate(target: string, input: string, timeInSeconds: number): TypingMetrics {
  const isComplete = input.length === target.length;
  const accuracy = isComplete
    ? calculateFinalAccuracy(target, input)
    : calculatePartialAccuracy(target, input);

  return {
    accuracy,
    wpm: calculateWPM(correctChars, timeInSeconds),
    isComplete,
    correctChars,
    totalChars: input.length
  };
}
```

## Known Issues

1. State Reset
- Metrics not properly reset on new text
- Completion status persistence
- Timer reset logic

2. Edge Cases
- Empty input handling
- Special character mapping
- Layout switching

## Future Improvements

1. Performance
- Memoization
- Computation optimization
- Event debouncing

2. Features
- More keyboard layouts
- Custom mapping support
- Advanced metrics

3. Testing
- Property-based tests
- Performance benchmarks
- Integration tests

## Contributing

1. Code Style
- TypeScript strict mode
- Functional patterns
- Clear documentation
- Comprehensive tests

2. Pull Requests
- Single responsibility
- Test coverage
- Documentation
- Clean commits

## License

MIT License - See LICENSE file for details