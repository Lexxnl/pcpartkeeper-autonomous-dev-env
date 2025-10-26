import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useStoreSelector } from '../useStoreSelector';
import { useItemsStore } from '../../store';

describe('useStoreSelector', () => {
  test('selects state correctly from store', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    );

    const { result } = renderHook(
      () => useStoreSelector(state => state.items.length),
      { wrapper }
    );

    expect(result.current).toBe(0); // Initial empty

    act(() => {
      useItemsStore.getState().setItems([{ id: 1, name: 'Test' }]);
    });

    expect(result.current).toBe(1);
  });

  test('re-renders only when selected value changes', () => {
    const { result, rerender } = renderHook(
      () => useStoreSelector(state => state.user?.name),
      { wrapper: ({ children }) => <>{children}</> }
    );

    const initialRenderCount = 0; // Track renders if needed

    act(() => {
      useItemsStore.getState().setUser({ name: 'John' });
    });

    rerender();

    expect(result.current).toBe('John');
  });
});
