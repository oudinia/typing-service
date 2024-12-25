# TypingStore Component

## Overview

The TypingStore manages the internal state of the typing application using a reactive signal-based architecture.

## State Management

### Internal Signals

```typescript
private _text: Signal<string>       // Target text
private _input: Signal<string>      // User input
private _layout: Signal<LayoutName> // Keyboard layout
private _startTime: Signal<number>  // Session start time
private _metrics: Signal<TypingMetrics> // Computed metrics
```

## Key Features

1. Immutable Updates
   - Atomic state changes
   - Predictable data flow
   - State consistency

2. Computed Values
   - Real-time metrics calculation
   - Derived state management
   - Automatic updates

3. State Access
   - Controlled mutation
   - Read-only public access
   - Type-safe operations

## Implementation Details

```typescript
class TypingStore {
  // State initialization
  constructor() {
    this._text = createSignal('');
    this._input = createSignal('');
    this._layout = createSignal('qwerty');
    this._startTime = createSignal(0);
    this._metrics = computed(() => 
      MetricsCalculator.calculate(
        this._text.value,
        this._input.value,
        this.getElapsedTime()
      ),
      [this._text, this._input, this._startTime]
    );
  }

  // State updates
  setText(text: string): void {
    this._text.set(text.toLowerCase());
    this._input.set('');
    this._startTime.set(Date.now());
  }
}
```