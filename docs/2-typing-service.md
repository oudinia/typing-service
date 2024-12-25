# Understanding the TypingService

## Overview

The TypingService is the main facade that applications interact with. It provides a clean API for managing typing sessions and tracking metrics.

## Implementation Details

### Class Structure

```typescript
export class TypingService {
  private store: TypingStore;

  constructor() {
    this.store = new TypingStore();
  }

  // Signal-based API
  get text(): Signal<string> { return this.store.text; }
  get input(): Signal<string> { return this.store.input; }
  get layout(): Signal<LayoutName> { return this.store.layout; }
  get metrics(): Signal<TypingMetrics> { return this.store.metrics; }

  // Observable-based API
  get text$(): Observable<string> {
    return new Observable(subscriber => 
      this.text.subscribe(value => subscriber.next(value))
    );
  }
  // ... similar implementations for other observables
}
```

### Key Features

1. **Dual API Support**
   ```typescript
   // Signal API
   service.text.subscribe(text => console.log(text));
   
   // Observable API
   service.text$.subscribe(text => console.log(text));
   ```

2. **Keyboard Layout Mapping**
   ```typescript
   processKey(key: string): string {
     const layout = this.store.layout.value;
     const mapping = layout === 'qwerty' ? QWERTY_TO_COLEMAK : AZERTY_TO_COLEMAK;
     return mapping[key.toLowerCase()] || key;
   }
   ```

3. **State Management**
   ```typescript
   setText(text: string): void {
     this.store.setText(text.toLowerCase());
   }

   updateInput(input: string): void {
     this.store.updateInput(input);
   }
   ```

## Usage Examples

### Basic Usage
```typescript
const service = new TypingService();

// Set up session
service.setText('hello world');
service.setLayout('qwerty');

// Track metrics
service.metrics.subscribe(metrics => {
  console.log(`Accuracy: ${metrics.accuracy}%`);
  console.log(`WPM: ${metrics.wpm}`);
});

// Process input
service.updateInput('hello');
```

### With Keyboard Mapping
```typescript
const service = new TypingService();
service.setLayout('qwerty');

// Map keys from QWERTY to Colemak
const mappedKey = service.processKey('t'); // Returns 'g'
```

### Framework Integration
```typescript
// React example
function TypingApp() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    const service = new TypingService();
    const unsubscribe = service.metrics.subscribe(setMetrics);
    return unsubscribe;
  }, []);
  
  return <div>Accuracy: {metrics?.accuracy}%</div>;
}
```