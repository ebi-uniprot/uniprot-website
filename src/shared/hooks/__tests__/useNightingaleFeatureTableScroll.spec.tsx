import { type Virtualizer } from '@tanstack/react-virtual';
import { renderHook } from '@testing-library/react';
import { type RefObject } from 'react';

import useNightingaleFeatureTableScroll from '../useNightingaleFeatureTableScroll';

type Item = { id: string };

const getRowId = (i: Item) => i.id;
const TABLE_ID = 'test-table';

const makeVirtualizerRef = (scrollToIndex: jest.Mock) =>
  ({
    current: { scrollToIndex } as unknown as Virtualizer<
      HTMLDivElement,
      Element
    >,
  }) as RefObject<Virtualizer<HTMLDivElement, Element> | null>;

describe('useNightingaleFeatureTableScroll', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a no-op when the table is not in the DOM', () => {
    const { result } = renderHook(() =>
      useNightingaleFeatureTableScroll<Item>(getRowId, TABLE_ID)
    );
    expect(() => result.current({ id: 'r1' })).not.toThrow();
  });

  it('scrolls the row into view when it is mounted in the DOM', () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    document.body.innerHTML = `
      <div>
        <table id="${TABLE_ID}">
          <thead><tr><th>head</th></tr></thead>
          <tbody><tr data-id="r1"><td>row1</td></tr></tbody>
        </table>
      </div>
    `;

    const { result } = renderHook(() =>
      useNightingaleFeatureTableScroll<Item>(getRowId, TABLE_ID)
    );
    result.current({ id: 'r1' });
    expect(scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    );
  });

  it('falls back to virtualizer.scrollToIndex when the row is not mounted', () => {
    document.body.innerHTML = `<table id="${TABLE_ID}"></table>`;
    const scrollToIndex = jest.fn();
    const data: Item[] = [{ id: 'r1' }, { id: 'r2' }, { id: 'r3' }];

    const { result } = renderHook(() =>
      useNightingaleFeatureTableScroll<Item>(
        getRowId,
        TABLE_ID,
        makeVirtualizerRef(scrollToIndex),
        data
      )
    );
    result.current({ id: 'r3' });
    expect(scrollToIndex).toHaveBeenCalledWith(2, { align: 'center' });
  });

  it('reads the latest virtualizer ref at call time, not at hook-creation time', () => {
    document.body.innerHTML = `<table id="${TABLE_ID}"></table>`;
    const scrollToIndex = jest.fn();
    const virtualizerRef = {
      current: null,
    } as RefObject<Virtualizer<HTMLDivElement, Element> | null>;
    const data: Item[] = [{ id: 'r1' }];

    const { result } = renderHook(() =>
      useNightingaleFeatureTableScroll<Item>(
        getRowId,
        TABLE_ID,
        virtualizerRef,
        data
      )
    );
    // Simulate the child mounting and populating the ref after the parent has
    // already created the callback closure.
    virtualizerRef.current = {
      scrollToIndex,
    } as unknown as Virtualizer<HTMLDivElement, Element>;

    result.current({ id: 'r1' });
    expect(scrollToIndex).toHaveBeenCalledWith(0, { align: 'center' });
  });

  it('does nothing when the row is missing from the data array', () => {
    document.body.innerHTML = `<table id="${TABLE_ID}"></table>`;
    const scrollToIndex = jest.fn();

    const { result } = renderHook(() =>
      useNightingaleFeatureTableScroll<Item>(
        getRowId,
        TABLE_ID,
        makeVirtualizerRef(scrollToIndex),
        [{ id: 'other' }]
      )
    );
    result.current({ id: 'missing' });
    expect(scrollToIndex).not.toHaveBeenCalled();
  });
});
