import { MetricsCalculator } from '../metrics-calculator';

describe('MetricsCalculator', () => {
  it('should calculate initial metrics correctly', () => {
    const metrics = MetricsCalculator.calculate('hello', '');
    expect(metrics).toEqual({
      accuracy: 100,
      wpm: 0,
      isComplete: false,
      correctChars: 0,
      totalChars: 0
    });
  });

  it('should calculate partial metrics correctly', () => {
    const metrics = MetricsCalculator.calculate('hello', 'hel');
    expect(metrics).toEqual({
      accuracy: 100,
      wpm: 0,
      isComplete: false,
      correctChars: 3,
      totalChars: 3
    });
  });

  it('should calculate final metrics correctly', () => {
    const metrics = MetricsCalculator.calculate('hello', 'hello');
    expect(metrics).toEqual({
      accuracy: 100,
      wpm: 0,
      isComplete: true,
      correctChars: 5,
      totalChars: 5
    });
  });

  it('should handle mistakes correctly', () => {
    const metrics = MetricsCalculator.calculate('hello', 'heklo');
    expect(metrics).toEqual({
      accuracy: 80,
      wpm: 0,
      isComplete: true,
      correctChars: 4,
      totalChars: 5
    });
  });
});