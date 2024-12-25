import { WPMCalculator } from '../wpm-calculator';

describe('WPMCalculator', () => {
  it('should return 0 when time is 0', () => {
    expect(WPMCalculator.calculate(50, 0)).toBe(0);
  });

  it('should calculate WPM correctly', () => {
    // 25 chars in 30 seconds = 10 WPM
    expect(WPMCalculator.calculate(25, 30)).toBe(10);
    
    // 50 chars in 30 seconds = 20 WPM
    expect(WPMCalculator.calculate(50, 30)).toBe(20);
  });
});