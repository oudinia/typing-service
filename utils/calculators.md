# Utility Calculators

## Overview

Specialized calculators for typing metrics and statistics.

## Components

### 1. AccuracyCalculator

Handles accuracy calculations:

```typescript
class AccuracyCalculator {
  static calculatePartialAccuracy(
    target: string, 
    input: string
  ): number {
    if (input.length === 0) return 100;
    
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    
    return Math.round((correct / input.length) * 100);
  }
}
```

### 2. WPMCalculator

Calculates typing speed:

```typescript
class WPMCalculator {
  private static readonly WORDS_PER_CHAR = 1 / 5;
  
  static calculate(
    totalChars: number, 
    timeInSeconds: number
  ): number {
    if (timeInSeconds === 0) return 0;
    const minutes = timeInSeconds / 60;
    return Math.round(
      totalChars * this.WORDS_PER_CHAR / minutes
    );
  }
}
```

### 3. MetricsCalculator

Combines all metrics:

```typescript
class MetricsCalculator {
  static calculate(
    target: string,
    input: string,
    timeInSeconds: number = 0
  ): TypingMetrics {
    const isComplete = input.length === target.length;
    const accuracy = isComplete
      ? AccuracyCalculator.calculateFinalAccuracy(
          target, 
          input
        )
      : AccuracyCalculator.calculatePartialAccuracy(
          target, 
          input
        );

    return {
      accuracy,
      wpm: WPMCalculator.calculate(
        correctChars, 
        timeInSeconds
      ),
      isComplete,
      correctChars,
      totalChars: input.length
    };
  }
}
```