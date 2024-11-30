import { describe, expect, test, vi } from 'vitest';

describe('console', () => {
  test.fails('fail if unexpected warnings are present', () => {
    console.warn('--- THE INQUISITION ---');
  });

  test.fails('fail if unexpected errors are present', () => {
    console.error('*hiccup*');
  });

  test('ignores specific warnings', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {
      /* no-op */
    });

    console.warn('~~~ImmutableStateInvariantMiddleware~~~');
    console.warn('~~~SerializableStateInvariantMiddleware~~~');

    expect(spy).toBeCalledTimes(2);
    spy.mockClear();
  });
});
