import { TypingMetrics } from './typing-metrics';
import { LayoutName } from './keyboard-layout';

export interface TypingState {
  text: string;
  input: string;
  layout: LayoutName;
  metrics: TypingMetrics;
  startTime?: number;
}