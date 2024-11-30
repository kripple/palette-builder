import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, vi } from 'vitest';

// Use custom jest matchers with vitest.
expect.extend(matchers);

// Replace some console methods.
beforeEach(() => {
  const filterWarningsThatInclude = [
    'ImmutableStateInvariantMiddleware',
    'SerializableStateInvariantMiddleware',
  ];

  vi.spyOn(console, 'error').mockImplementation((args: any) => {
    // Fail test if unexpected errors are present.
    throw Error(args);
  });

  vi.spyOn(console, 'warn').mockImplementation((args: any) => {
    // Filter specific warnings
    if (filterWarningsThatInclude.some((warning) => args?.includes(warning))) {
      console.info(args);
      return;
    } else {
      // Fail test if unexpected warnings are present.
      throw Error(args);
    }
  });
});

// Unmount and destroy components between tests.
afterEach(() => {
  cleanup();
});
