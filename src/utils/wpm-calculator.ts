export class WPMCalculator {
  private static readonly WORDS_PER_CHAR = 1 / 5; // Standard: 5 characters = 1 word
  
  /**
   * Calculates Words Per Minute (WPM) based on correct characters typed
   * @param totalChars Total characters typed correctly
   * @param timeInSeconds Time elapsed in seconds
   */
  static calculate(totalChars: number, timeInSeconds: number): number {
    if (timeInSeconds === 0) return 0;
    const minutes = timeInSeconds / 60;
    return Math.round(totalChars * this.WORDS_PER_CHAR / minutes);
  }
}