import { TypingService } from '../typing-service';

describe('TypingService - Backspace Corrections', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  it('should handle backspace corrections', () => {
    service.setText('hello');
    
    service.updateInput('hekl');
    expect(service.accuracy).toBe(75);
    
    service.updateInput('hel');
    expect(service.accuracy).toBe(100);
    
    service.updateInput('hell');
    expect(service.accuracy).toBe(100);
    
    service.updateInput('hello');
    expect(service.accuracy).toBe(100);
  });

  it('should handle multiple backspace corrections', () => {
    service.setText('test case');
    
    service.updateInput('tast cese');
    expect(service.accuracy).toBe(78);
    
    service.updateInput('test');
    expect(service.accuracy).toBe(100);
    
    service.updateInput('test case');
    expect(service.accuracy).toBe(100);
  });
});