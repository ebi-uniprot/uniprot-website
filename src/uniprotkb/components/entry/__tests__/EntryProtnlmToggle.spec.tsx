import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { type ReactNode } from 'react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import sharedApiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import entryData from '../../../__mocks__/uniProtKBEntryModelData';
import uniprotkbApiUrls from '../../../config/apiUrls/apiUrls';
import Entry from '../Entry';

const { primaryAccession } = entryData;

const tremblEntryData = {
  ...entryData,
  entryType: 'UniProtKB unreviewed (TrEMBL)',
};

const protnlmUrl = uniprotkbApiUrls.protnlm.entry(primaryAccession);

jest.mock('../EntryMain', () => ({
  __esModule: true,
  default: () => '{{ EntryMain }}',
}));

jest.mock('../../../../shared/components/layouts/SideBarLayout', () => ({
  __esModule: true,
  SidebarLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const mock = new MockAdapter(axios);

// axios-mock-adapter matches handlers in registration order, so any test-
// specific handlers (like the protnlm HEAD) must be registered before the
// catch-all fallback. `configure` lets each test inject its own handlers
// between the entry-data baseline and the .onAny() catch-all.
const renderEntry = async (configure: () => void = () => {}) => {
  mock.reset();
  mock
    .onGet(sharedApiUrls.entry.entry(primaryAccession, Namespace.uniprotkb))
    .reply(200, tremblEntryData);
  configure();
  mock.onAny().reply(200, {}, { 'x-total-results': 0 });

  await act(async () => {
    customRender(<Entry />, { route: `/uniprotkb/${primaryAccession}` });
  });
};

describe('Entry — ProtNLM toggle gating', () => {
  beforeEach(() => {
    window.botChallenge = true;
    window.sessionStorage.clear();
  });

  it('shows the AI Annotations toggle when the protnlm HEAD returns 200', async () => {
    await renderEntry(() => {
      mock.onHead(protnlmUrl).reply(200);
    });

    expect(await screen.findByRole('switch')).toBeInTheDocument();
  });

  it('hides the toggle when the protnlm HEAD returns 404', async () => {
    await renderEntry(() => {
      mock.onHead(protnlmUrl).reply(404);
    });

    // Wait for page to settle so we know HEAD has had a chance to resolve.
    await screen.findByRole('heading', { level: 1 });

    expect(screen.queryByRole('switch')).not.toBeInTheDocument();
  });

  it('persists the toggle state to sessionStorage when clicked', async () => {
    await renderEntry(() => {
      mock.onHead(protnlmUrl).reply(200);
      mock.onGet(protnlmUrl).reply(200, {});
    });

    const toggle = await screen.findByRole('switch');

    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(window.sessionStorage.getItem('ai-annotations')).toBe('false');

    fireEvent.click(toggle);

    await waitFor(() =>
      expect(window.sessionStorage.getItem('ai-annotations')).toBe('true')
    );
  });
});
