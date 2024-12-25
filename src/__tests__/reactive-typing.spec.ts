import { TypingService } from '../typing-service';
import { firstValueFrom } from 'rxjs';

describe('Reactive TypingService', () => {
  let service: TypingService;

  beforeEach(() => {
    service = new TypingService();
  });

  it('should emit updated metrics on input change', async () => {
    service.setText('hello');
    service.updateInput('hel');

    const metrics = await firstValueFrom(service.metrics$);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.correctChars).toBe(3);
  });

  /* TODO: Fix completion status test
  it('should emit completion status', async () => {
    service.setText('test');
    
    let isComplete = await firstValueFrom(service.isComplete$);
    expect(isComplete).toBe(false);

    service.updateInput('test');
    isComplete = await firstValueFrom(service.isComplete$);
    expect(isComplete).toBe(true);
  });
  */

  /* TODO: Fix state reset test
  it('should reset state on new text', async () => {
    service.setText('test');
    service.updateInput('test');
    
    let metrics = await firstValueFrom(service.metrics$);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.isComplete).toBe(true);

    service.setText('new');
    metrics = await firstValueFrom(service.metrics$);
    expect(metrics.accuracy).toBe(0);
    expect(metrics.isComplete).toBe(false);
  });
  */
});