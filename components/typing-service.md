# TypingService Component

## Overview

The TypingService is the main facade that provides the public API for the typing application.

## API Reference

### Signal-based API

```typescript
text: Signal<string>      // Current target text
input: Signal<string>     // User's current input
layout: Signal<LayoutName> // Current keyboard layout
metrics: Signal<TypingMetrics> // Real-time typing metrics
```

### Observable-based API

```typescript
text$: Observable<string>
input$: Observable<string>
metrics$: Observable<TypingMetrics>
isComplete$: Observable<boolean>
```

## Key Responsibilities

1. Text Management
   - Setting target text
   - Tracking user input
   - Input validation

2. Layout Handling
   - Keyboard layout switching
   - Key mapping
   - Special character support

3. Metrics Tracking
   - Accuracy calculation
   - WPM measurement
   - Progress monitoring

4. Framework Integration
   - Signal-based reactivity
   - Observable streams
   - Framework-agnostic design

## Usage Examples

```typescript
const service = new TypingService();

// Set up typing session
service.setText('hello world');
service.setLayout('qwerty');

// Track metrics
service.metrics$.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`);
  console.log(`WPM: ${metrics.wpm}`);
});

// Process input
service.updateInput('hello');
```