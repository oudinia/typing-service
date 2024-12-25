# Typing Service Documentation

Welcome to the Typing Service documentation. This library provides a comprehensive solution for building typing applications with features like real-time accuracy tracking, WPM calculation, and multiple keyboard layout support.

## Quick Start

```typescript
import { TypingService } from 'typing-service';

const service = new TypingService();

// Set up typing session
service.setText('hello world');
service.setLayout('qwerty');

// Track metrics
service.metrics$.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`);
  console.log(`WPM: ${metrics.wpm}`);
});
```

## Features

- Real-time accuracy tracking
- Words per minute (WPM) calculation
- Multiple keyboard layout support
- Reactive state management
- Framework-agnostic design

## Documentation Sections

- [Architecture Overview](./architecture.md)
- [Components](./components/typing-service.md)
- [Testing](./testing/test-suite.md)
- [Utils](./utils/calculators.md)
- [Best Practices](./best-practices/development.md)