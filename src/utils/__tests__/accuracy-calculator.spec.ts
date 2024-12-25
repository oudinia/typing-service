import { AccuracyCalculator } from '../accuracy-calculator';

describe('AccuracyCalculator', () => {
  describe('calculatePartialAccuracy', () => {
    it('should return 100 for empty input', () => {
      expect(AccuracyCalculator.calculatePartialAccuracy('hello', '')).toBe(100);
    });

    it('should calculate partial accuracy correctly', () => {
      expect(AccuracyCalculator.calculatePartialAccuracy('hello', 'hel')).toBe(100);
      expect(AccuracyCalculator.calculatePartialAccuracy('hello', 'hek')).toBe(67);
      expect(AccuracyCalculator.calculatePartialAccuracy('test', 'tast')).toBe(75);
    });
  });

  describe('calculateFinalAccuracy', () => {
    it('should return 0 for empty input', () => {
      expect(AccuracyCalculator.calculateFinalAccuracy('hello', '')).toBe(0);
    });

    it('should calculate final accuracy correctly', () => {
      expect(AccuracyCalculator.calculateFinalAccuracy('hello', 'hello')).toBe(100);
      expect(AccuracyCalculator.calculateFinalAccuracy('hello', 'hellx')).toBe(80);
      expect(AccuracyCalculator.calculateFinalAccuracy('hello', 'hell')).toBe(80);
    });
  });
});