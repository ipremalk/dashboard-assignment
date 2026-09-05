import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimeSinceUpdate } from './useTimeSinceUpdate';

describe('useTimeSinceUpdate', () => {
  it('returns "—" when no timestamp is provided', () => {
    const { result } = renderHook(() => useTimeSinceUpdate(null));
    expect(result.current).toBe('—');
  });

  it('returns "0s" for current timestamp', () => {
    const now = Date.now();
    const { result } = renderHook(() => useTimeSinceUpdate(now));
    expect(result.current).toBe('0s');
  });

  it('returns seconds format for recent timestamp', () => {
    const fiveSecondsAgo = Date.now() - 5000;
    const { result } = renderHook(() => useTimeSinceUpdate(fiveSecondsAgo));
    // Should be "4s" or "5s" depending on exact timing
    expect(result.current).toMatch(/^[45]s$/);
  });

  it('returns minutes format for older timestamp', () => {
    const twoMinutesAgo = Date.now() - 120000;
    const { result } = renderHook(() => useTimeSinceUpdate(twoMinutesAgo));
    // Should be "1m" or "2m" depending on exact timing
    expect(result.current).toMatch(/^[12]m$/);
  });

  it('resets to "—" when timestamp changes to null', () => {
    const timestamp = Date.now();
    const { result, rerender } = renderHook(
      ({ ts }) => useTimeSinceUpdate(ts),
      { initialProps: { ts: timestamp } }
    );

    expect(result.current).toBe('0s');

    // Change timestamp to null
    rerender({ ts: null });
    expect(result.current).toBe('—');
  });

  it('updates when timestamp changes to new value', () => {
    const oldTimestamp = Date.now() - 60000; // 1 minute ago
    const { result, rerender } = renderHook(
      ({ ts }) => useTimeSinceUpdate(ts),
      { initialProps: { ts: oldTimestamp } }
    );

    // Should show ~1 minute
    expect(result.current).toMatch(/^1m$/);

    // Update with current timestamp
    const newTimestamp = Date.now();
    rerender({ ts: newTimestamp });

    // Should reset to 0s
    expect(result.current).toBe('0s');
  });

  it('handles undefined timestamp', () => {
    const { result } = renderHook(() => useTimeSinceUpdate(undefined));
    expect(result.current).toBe('—');
  });

  it('calculates correct format at boundary (60 seconds)', () => {
    const sixtySecondsAgo = Date.now() - 60000;
    const { result } = renderHook(() => useTimeSinceUpdate(sixtySecondsAgo));
    // At exactly 60 seconds, should show 1m
    expect(result.current).toBe('1m');
  });
});
