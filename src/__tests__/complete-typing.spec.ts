import { TypingService } from '../typing-service';

describe('TypingService - Complete Typing', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  it('should handle typing to completion without corrections', () => {
    service.setText('test case');
    service.updateInput('test case');
    
    expect(service.accuracy).toBe(100);
    expect(service.isComplete).toBe(true);
  });

  it('should handle typing to completion with mistakes', () => {
    service.setText('hello world');
    service.updateInput('heklo world');
    
    expect(service.accuracy).toBe(91);
    expect(service.isComplete).toBe(true);
  });

  /* TODO: Fix state reset test
  it('should reset state when setting new text', () => {
    service.setText('test');
    service.updateInput('test');
    expect(service.accuracy).toBe(100);
    expect(service.isComplete).toBe(true);

    service.setText('new text');
    expect(service.accuracy).toBe(0);
    expect(service.isComplete).toBe(false);
  });
  */
});