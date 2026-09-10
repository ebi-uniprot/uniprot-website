import { act, fireEvent, screen } from '@testing-library/react';

import customRender from '../../shared/__test-helpers__/customRender';
import useBasket from '../../shared/hooks/useBasket';
import useDataApi from '../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../shared/hooks/useDataApiWithStale';
import { localStorageCache } from '../../shared/hooks/useLocalStorage';
import { Namespace } from '../../shared/types/namespaces';
import mockResultFields from '../../uniprotkb/__mocks__/resultFields';
import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import mockResults from '../../uniprotkb/components/__mocks__/results';
import BasketFullView from '../BasketFullView';
import BasketMiniView from '../BasketMiniView';

jest.mock('../../shared/hooks/useDataApi');
jest.mock('../../shared/hooks/useDataApiWithStale');

const [human] = mockResults.results as UniProtkbAPIModel[];

// 26 entries so the basket spans more than one page of the main results query,
// with organism order the reverse of accession order
const ENTRY_COUNT = 26;
const MAIN_PAGE_SIZE = 25;
const all: Record<string, UniProtkbAPIModel> = {};
for (let i = 1; i <= ENTRY_COUNT; i += 1) {
  const acc = `P${String(i).padStart(5, '0')}`;
  all[acc] = {
    ...human,
    primaryAccession: acc,
    uniProtkbId: `E${i}`,
    organism: {
      ...human.organism,
      scientificName: `Org ${String(100 - i).padStart(3, '0')}`,
    },
  } as UniProtkbAPIModel;
}
const allAccessions = Object.keys(all);

const requested: string[] = [];

const mockApi = () => {
  (useDataApiWithStale as jest.Mock).mockReturnValue({
    loading: false,
    data: { facets: [] },
    headers: { 'x-total-results': `${ENTRY_COUNT}` },
  });
  const cache = new Map<string, unknown>();
  (useDataApi as jest.Mock).mockImplementation((url?: string | null) => {
    if (!url) {
      return { loading: false };
    }
    if (url.includes('configure')) {
      return { loading: false, data: mockResultFields };
    }
    if (!cache.has(url)) {
      requested.push(url);
      const parsed = new URL(url, 'http://localhost');
      const accs = parsed.searchParams.get('accessions')?.split(',') || [];
      // the sort-values query asks for a big page, the main one uses the default
      const size = Number(parsed.searchParams.get('size')) || MAIN_PAGE_SIZE;
      const available = accs.filter((a) => all[a]);
      cache.set(url, {
        loading: false,
        progress: 1,
        data: { results: available.slice(0, size).map((a) => all[a]) },
        headers: { 'x-total-results': `${available.length}` },
      });
    }
    return cache.get(url);
  });
};

const settle = () =>
  act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  });

const storedOrder = () =>
  JSON.parse(window.localStorage.getItem('basket') || '{}').uniprotkb as
    string[] | undefined;

// the column the header arrow is currently on, if any
const sortedColumn = () =>
  document
    .querySelector(
      'th[class*="header-cell--ascend"], th[class*="header-cell--descend"]'
    )
    ?.getAttribute('data-column-name') || undefined;

const clickHeader = (name: string) =>
  fireEvent.click(
    document.querySelector(`th[data-column-name="${name}"]`) as HTMLElement
  );

const AddEntry = ({ accession }: { accession: string }) => {
  const [, setBasket] = useBasket();
  return (
    <button
      type="button"
      onClick={() =>
        setBasket(
          (b) =>
            new Map([
              ...b,
              [
                Namespace.uniprotkb,
                new Set([...(b.get(Namespace.uniprotkb) || []), accession]),
              ],
            ])
        )
      }
    >
      add
    </button>
  );
};

beforeEach(() => {
  requested.length = 0;
  localStorageCache.clear();
  window.localStorage.clear();
  mockApi();
});

describe('basket sorting', () => {
  it('sorts the whole basket from the side panel, past the loaded page', async () => {
    customRender(<BasketMiniView onFullView={jest.fn()} />, {
      initialLocalStorage: {
        basket: { uniprotkb: [...allAccessions].reverse() },
      },
    });
    await settle();

    clickHeader('organism_name');
    await settle();

    // organism ascending is accession descending, and P00026 is not in the
    // page the panel rendered, so this is the case that used to pin it last
    expect(storedOrder()).toEqual([...allAccessions].reverse());
  });

  it('sorts from the full view too', async () => {
    customRender(<BasketFullView />, {
      route: '/basket/uniprotkb',
      path: '/basket/:namespace',
      initialLocalStorage: { basket: { uniprotkb: [...allAccessions] } },
    });
    await settle();

    clickHeader('organism_name');
    await settle();
    expect(storedOrder()).toEqual([...allAccessions].reverse());

    // clicking again toggles the direction
    clickHeader('organism_name');
    await settle();
    expect(storedOrder()).toEqual(allAccessions);
  });

  it('drops the sort when an accession is added, and sorts again on request', async () => {
    const kept = allAccessions.slice(0, 5);
    customRender(
      <>
        <BasketMiniView onFullView={jest.fn()} />
        <AddEntry accession="P00006" />
      </>,
      { initialLocalStorage: { basket: { uniprotkb: kept } } }
    );
    await settle();

    clickHeader('organism_name');
    await settle();
    expect(storedOrder()).toEqual([...kept].reverse());
    expect(sortedColumn()).toBe('organism_name');

    // the new entry goes to the end and the sort indicator goes away, rather
    // than the basket silently rearranging itself
    fireEvent.click(screen.getByRole('button', { name: 'add' }));
    await settle();
    expect(storedOrder()).toEqual([...[...kept].reverse(), 'P00006']);
    expect(sortedColumn()).toBeUndefined();

    // sorting again picks the new entry up
    clickHeader('organism_name');
    await settle();
    expect(storedOrder()).toEqual(['P00006', ...[...kept].reverse()]);
  });

  it('keeps the sort when an accession is removed', async () => {
    const kept = allAccessions.slice(0, 5);
    customRender(<BasketMiniView onFullView={jest.fn()} />, {
      initialLocalStorage: { basket: { uniprotkb: kept } },
    });
    await settle();

    clickHeader('organism_name');
    await settle();
    expect(sortedColumn()).toBe('organism_name');

    // the bin button on the last row of the table
    const removeButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(removeButtons[removeButtons.length - 1]);
    await settle();
    expect(storedOrder()).toHaveLength(kept.length - 1);
    // what is left is still sorted, so the indicator stays
    expect(sortedColumn()).toBe('organism_name');
  });

  it('does not load sort values until the user sorts', async () => {
    customRender(<BasketMiniView onFullView={jest.fn()} />, {
      initialLocalStorage: { basket: { uniprotkb: allAccessions.slice(0, 3) } },
    });
    await settle();
    expect(requested.some((url) => url.includes('size=500'))).toBe(false);

    clickHeader('accession');
    await settle();
    expect(requested.some((url) => url.includes('size=500'))).toBe(true);
  });
});
