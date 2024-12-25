import { createSignal } from '../signals/create-signal';
import { computed } from '../signals/computed';
import { TypingState } from '../models/typing-state';
import { TypingMetrics } from '../models/typing-metrics';
import { LayoutName } from '../models/keyboard-layout';
import { MetricsCalculator } from '../utils/metrics-calculator';
import { Signal } from '../signals/create-signal';

const initialMetrics: TypingMetrics = {
  accuracy: 0,
  wpm: 0,
  isComplete: false,
  correctChars: 0,
  totalChars: 0
};

export class TypingStore {
  private readonly _text = createSignal<string>('');
  private readonly _input = createSignal<string>('');
  private readonly _layout = createSignal<LayoutName>('qwerty');
  private readonly _startTime = createSignal<number>(0);
  private readonly _metrics = computed<TypingMetrics>(
    () => {
      const timeInSeconds = (Date.now() - this._startTime.value) / 1000;
      return MetricsCalculator.calculate(
        this._text.value,
        this._input.value,
        timeInSeconds
      );
    },
    [this._text, this._input, this._startTime]
  );

  // Public accessors
  get text() { return this._text; }
  get input() { return this._input; }
  get layout() { return this._layout; }
  get metrics() { return this._metrics; }

  // Actions
  setText(text: string): void {
    this._text.set(text.toLowerCase());
    this._input.set('');
    this._startTime.set(Date.now());
  }

  setLayout(layout: LayoutName): void {
    this._layout.set(layout);
  }

  updateInput(input: string): void {
    this._input.set(input);
  }

  // Framework bindings
  getState(): TypingState {
    return {
      text: this._text.value,
      input: this._input.value,
      layout: this._layout.value,
      metrics: this._metrics.value,
      startTime: this._startTime.value
    };
  }
}