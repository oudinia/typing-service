import { Observable } from 'rxjs';
import { TypingStore } from './store/typing.store';
import { LayoutName } from './models/keyboard-layout';
import { QWERTY_TO_COLEMAK, AZERTY_TO_COLEMAK } from './constants/keyboard-mappings';
import { TypingMetrics } from './models/typing-metrics';
import { Signal } from './signals/create-signal';

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

  // Observable-based API for framework compatibility
  get text$(): Observable<string> {
    return new Observable(subscriber => this.text.subscribe(value => subscriber.next(value)));
  }

  get input$(): Observable<string> {
    return new Observable(subscriber => this.input.subscribe(value => subscriber.next(value)));
  }

  get metrics$(): Observable<TypingMetrics> {
    return new Observable(subscriber => this.metrics.subscribe(value => subscriber.next(value)));
  }

  get isComplete$(): Observable<boolean> {
    return new Observable(subscriber => 
      this.metrics.subscribe(metrics => subscriber.next(metrics.isComplete))
    );
  }

  // Actions
  setLayout(layout: LayoutName): void {
    this.store.setLayout(layout);
  }

  setText(text: string): void {
    this.store.setText(text);
  }

  updateInput(input: string): void {
    this.store.updateInput(input);
  }

  processKey(key: string): string {
    const layout = this.store.layout.value;
    const mapping = layout === 'qwerty' ? QWERTY_TO_COLEMAK : AZERTY_TO_COLEMAK;
    return mapping[key.toLowerCase()] || key;
  }

  // Testing helpers
  get accuracy(): number {
    return this.store.metrics.value.accuracy;
  }

  get isComplete(): boolean {
    return this.store.metrics.value.isComplete;
  }
}