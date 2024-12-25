import { TypingService } from '../typing-service';

describe('TypingService - Typing Mistakes', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  it('should calculate accuracy with single mistake', () => {
    service.setText('hello');
    service.updateInput('hallo');
    expect(service.accuracy).toBe(80);
  });

  it('should calculate accuracy with multiple mistakes', () => {
    service.setText('hello world');
    service.updateInput('heklo woxld');
    expect(service.accuracy).toBe(82);
  });

  it('should handle incorrect length input', () => {
    service.setText('hello');
    service.updateInput('helloo');
    expect(service.accuracy).toBe(83);
    
    service.updateInput('hell');
    expect(service.accuracy).toBe(100);
  });
});