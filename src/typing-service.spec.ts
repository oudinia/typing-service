import { TypingService } from './typing-service';

describe('TypingService', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  describe('keyboard mapping', () => {
    it('should process QWERTY to Colemak mapping correctly', () => {
      service.setLayout('qwerty');
      expect(service.processKey('t')).toBe('g');
      expect(service.processKey('h')).toBe('h');
      expect(service.processKey('e')).toBe('f');
    });

    it('should process AZERTY to Colemak mapping correctly', () => {
      service.setLayout('azerty');
      expect(service.processKey('e')).toBe('f');
      expect(service.processKey('a')).toBe('a');
      expect(service.processKey('z')).toBe('r');
    });
  });

  describe('text processing', () => {
    it('should calculate accuracy correctly', () => {
      service.setText('hello');
      service.updateInput('hell');
      expect(service.accuracy).toBe(100);
      
      service.updateInput('hellx');
      expect(service.accuracy).toBe(80);
    });

    it('should handle completion state correctly', () => {
      service.setText('test');
      expect(service.isComplete).toBe(false);
      
      service.updateInput('test');
      expect(service.isComplete).toBe(true);
    });

    /* TODO: Fix metrics reset test
    it('should reset metrics when setting new text', () => {
      service.setText('test');
      service.updateInput('test');
      expect(service.accuracy).toBe(100);
      expect(service.isComplete).toBe(true);

      service.setText('new');
      expect(service.accuracy).toBe(0);
      expect(service.isComplete).toBe(false);
    });
    */
  });
});