# Testing

## Test Categories

### Backspace Corrections

Tests user input correction scenarios:

```typescript
describe('Backspace Corrections', () => {
  it('should handle single character correction', () => {
    service.setText('hello');
    service.updateInput('hekl');
    expect(service.accuracy).toBe(75);
    service.updateInput('hel');
    expect(service.accuracy).toBe(100);
  });
});
```

### Complete Typing

Tests typing completion scenarios:

```typescript
describe('Complete Typing', () => {
  it('should handle perfect completion', () => {
    service.setText('test');
    service.updateInput('test');
    expect(service.accuracy).toBe(100);
    expect(service.isComplete).toBe(true);
  });
});
```

### Keyboard Mapping

Tests layout support and key mapping:

```typescript
describe('Keyboard Mapping', () => {
  it('should map QWERTY to Colemak', () => {
    service.setLayout('qwerty');
    expect(service.processKey('t')).toBe('g');
    expect(service.processKey('h')).toBe('h');
  });
});
```