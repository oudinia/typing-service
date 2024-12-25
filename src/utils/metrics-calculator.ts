import { TypingMetrics } from '../models/typing-metrics';
import { AccuracyCalculator } from './accuracy-calculator';
import { WPMCalculator } from './wpm-calculator';

export class MetricsCalculator {
  static calculate(
    target: string,
    input: string,
    timeInSeconds: number = 0
  ): TypingMetrics {
    const isComplete = input.length === target.length;
    const accuracy = isComplete
      ? AccuracyCalculator.calculateFinalAccuracy(target, input)
      : AccuracyCalculator.calculatePartialAccuracy(target, input);

    let correctChars = 0;
    const compareLength = Math.min(input.length, target.length);
    for (let i = 0; i < compareLength; i++) {
      if (input[i] === target[i]) {
        correctChars++;
      }
    }

    return {
      accuracy,
      wpm: WPMCalculator.calculate(correctChars, timeInSeconds),
      isComplete,
      correctChars,
      totalChars: input.length
    };
  }
}