# Understanding Metrics Calculation

## Overview

The typing service calculates various metrics in real-time as the user types. Let's explore how each metric is calculated.

## Accuracy Calculation

### Partial Accuracy (During Typing)
```typescript
static calculatePartialAccuracy(target: string, input: string): number {
  // Empty input means no mistakes yet
  if (input.length === 0) return 100;
  
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) correct++;
  }
  
  return Math.round((correct / input.length) * 100);
}
```

Example:
```typescript
// Target: "hello"
calculatePartialAccuracy("hello", "hel")  // 100% (3/3 correct)
calculatePartialAccuracy("hello", "helo") // 75%  (3/4 correct)
```

### Final Accuracy (On Completion)
```typescript
static calculateFinalAccuracy(target: string, input: string): number {
  if (input.length === 0) return 0;
  
  let correct = 0;
  const compareLength = Math.min(input.length, target.length);
  
  for (let i = 0; i < compareLength; i++) {
    if (input[i] === target[i]) correct++;
  }
  
  // Use max length to penalize length mismatches
  return Math.round((correct / Math.max(input.length, target.length)) * 100);
}
```

Example:
```typescript
// Target: "hello"
calculateFinalAccuracy("hello", "hello")  // 100% (5/5 correct)
calculateFinalAccuracy("hello", "helloo") // 83%  (5/6 correct)
```

## WPM Calculation

Words per minute are calculated using the standard formula:

```typescript
static calculate(totalChars: number, timeInSeconds: number): number {
  // No time elapsed means no WPM yet
  if (timeInSeconds === 0) return 0;
  
  // Convert to minutes
  const minutes = timeInSeconds / 60;
  
  // Standard: 5 characters = 1 word
  const WORDS_PER_CHAR = 1 / 5;
  
  return Math.round(totalChars * WORDS_PER_CHAR / minutes);
}
```

Example:
```typescript
// 25 characters in 30 seconds
calculate(25, 30) // 10 WPM ((25/5) / 0.5)

// 50 characters in 30 seconds
calculate(50, 30) // 20 WPM ((50/5) / 0.5)
```

## Combined Metrics

The MetricsCalculator combines all metrics:

```typescript
static calculate(
  target: string,
  input: string,
  timeInSeconds: number = 0
): TypingMetrics {
  // Calculate completion status
  const isComplete = input.length === target.length;
  
  // Choose accuracy calculation method
  const accuracy = isComplete
    ? AccuracyCalculator.calculateFinalAccuracy(target, input)
    : AccuracyCalculator.calculatePartialAccuracy(target, input);

  // Count correct characters
  let correctChars = 0;
  const compareLength = Math.min(input.length, target.length);
  for (let i = 0; i < compareLength; i++) {
    if (input[i] === target[i]) correctChars++;
  }

  return {
    accuracy,
    wpm: WPMCalculator.calculate(correctChars, timeInSeconds),
    isComplete,
    correctChars,
    totalChars: input.length
  };
}
```

Example Usage:
```typescript
const metrics = MetricsCalculator.calculate(
  'hello world',  // target
  'hello wor',    // current input
  10              // seconds elapsed
);

console.log(metrics);
// {
//   accuracy: 100,        // All typed characters correct
//   wpm: 48,             // (8 chars / 5) / (10/60) = 48
//   isComplete: false,   // Input shorter than target
//   correctChars: 8,     // 8 correct characters
//   totalChars: 8        // 8 total characters typed
// }
```