export class AccuracyCalculator {
  static calculatePartialAccuracy(target: string, input: string): number {
    // For partial input, empty input means no mistakes yet
    if (input.length === 0) return 100;
    
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) {
        correct++;
      }
    }
    
    return Math.round((correct / input.length) * 100);
  }

  static calculateFinalAccuracy(target: string, input: string): number {
    // For final accuracy, empty input means nothing correct
    if (input.length === 0) return 0;
    
    let correct = 0;
    const compareLength = Math.min(input.length, target.length);
    
    for (let i = 0; i < compareLength; i++) {
      if (input[i] === target[i]) {
        correct++;
      }
    }
    
    const totalLength = Math.max(input.length, target.length);
    return Math.round((correct / totalLength) * 100);
  }
}