import { TypingService } from '../typing-service';

describe('TypingService - Correct Typing', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  it('should maintain 100% accuracy with correct typing', () => {
    service.setText('hello world');
    service.updateInput('h');
    expect(service.accuracy).toBe(100);
    
    service.updateInput('he');
    expect(service.accuracy).toBe(100);
    
    service.updateInput('hello world');
    expect(service.accuracy).toBe(100);
  });

  it('should track completion with correct typing', () => {
    service.setText('test');
    
    service.updateInput('t');
    expect(service.isComplete).toBe(false);
    
    service.updateInput('te');
    expect(service.isComplete).toBe(false);
    
    service.updateInput('tes');
    expect(service.isComplete).toBe(false);
    
    service.updateInput('test');
    expect(service.isComplete).toBe(true);
  });
});