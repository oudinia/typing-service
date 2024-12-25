import { TypingService } from '../typing-service';

describe('TypingService - Keyboard Mapping', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  describe('QWERTY mapping', () => {
    beforeEach(() => {
      service.setLayout('qwerty');
    });

    it('should process QWERTY to Colemak mapping correctly', () => {
      expect(service.processKey('t')).toBe('g');
      expect(service.processKey('h')).toBe('h');
      expect(service.processKey('e')).toBe('f');
    });

    it('should handle non-mapped keys', () => {
      expect(service.processKey('1')).toBe('1');
      expect(service.processKey(' ')).toBe(' ');
    });
  });

  describe('AZERTY mapping', () => {
    beforeEach(() => {
      service.setLayout('azerty');
    });

    it('should process AZERTY to Colemak mapping correctly', () => {
      expect(service.processKey('e')).toBe('f');
      expect(service.processKey('a')).toBe('a');
      expect(service.processKey('z')).toBe('r');
    });

    it('should handle non-mapped keys', () => {
      expect(service.processKey('1')).toBe('1');
      expect(service.processKey(' ')).toBe(' ');
    });
  });
});