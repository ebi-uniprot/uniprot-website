import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';
import path from 'path';
import { type ReactNode } from 'react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import uniprotkbResults from '../../../../../uniprotkb/components/__mocks__/results';
import BlastResult from '../BlastResult';
import blastResults from './__mocks__/example-truncated';

jest.mock('../../../../../shared/components/layouts/SideBarLayout', () => ({
  __esModule: true,
  SidebarLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// Neither of these is under test here, and both pull in heavy visualisations
jest.mock('../BlastResultSidebar', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../BlastResultTable', () => ({
  __esModule: true,
  default: () => null,
}));

const jobID = 'ncbiblast-R00000000-000000-0000-00000000-p1m';
const route = `/blast/uniprotkb/${jobID}/overview`;

const inputSequence = fs.readFileSync(
  path.join(__dirname, '../../../adapters/__mocks__/input-sequence.fasta'),
  'utf8'
);

const inputParams = (extra = '') => `<?xml version="1.0" encoding="UTF-8"?>
<parameters>
    <stringParameter>
        <name>database</name>
        <value>
            <string>uniprotkb_swissprot</string>
        </value>
    </stringParameter>
    ${extra}
</parameters>`;

const stringParameter = (name: string, value: string) =>
  `<stringParameter><name>${name}</name><value>${value}</value></stringParameter>`;

const mockRequests = new MockAdapter(axios);

const setupMocks = ({
  parameters,
  taxonomyResults,
  taxonomyStatus = 200,
}: {
  parameters: string;
  taxonomyResults?: Array<{ taxonId: number; scientificName: string }>;
  taxonomyStatus?: number;
}) => {
  mockRequests.reset();
  mockRequests
    .onGet(new RegExp(`/ncbiblast/result/${jobID}/json$`))
    .reply(200, blastResults);
  mockRequests
    .onGet(new RegExp(`/ncbiblast/result/${jobID}/parameters$`))
    .reply(200, parameters);
  mockRequests
    .onGet(new RegExp(`/ncbiblast/result/${jobID}/sequence$`))
    .reply(200, inputSequence);
  mockRequests
    .onGet(/uniprotkb\/accessions/)
    .reply(200, { results: uniprotkbResults.results.slice(0, 2) });
  mockRequests
    .onGet(/taxonomy\/taxonIds/)
    .reply(taxonomyStatus, { results: taxonomyResults || [] });
};

describe('BlastResult heading', () => {
  it('should name the database the job actually ran against', async () => {
    setupMocks({ parameters: inputParams() });

    customRender(<BlastResult />, { route });

    expect(
      await screen.findByText(/found in UniProtKB Swiss-Prot/)
    ).toBeInTheDocument();
  });

  it('should fall back to the namespace for an unknown database', async () => {
    setupMocks({
      parameters: `<?xml version="1.0" encoding="UTF-8"?>
        <parameters>${stringParameter('database', 'not-a-database')}</parameters>`,
    });

    customRender(<BlastResult />, { route });

    expect(await screen.findByText(/found in UniProtKB/)).toBeInTheDocument();
  });

  it('should label the taxon restrictions with their scientific names', async () => {
    setupMocks({
      parameters: inputParams(stringParameter('taxids', '9606')),
      taxonomyResults: [{ taxonId: 9606, scientificName: 'Homo sapiens' }],
    });

    customRender(<BlastResult />, { route });

    expect(
      await screen.findByText(/restricted to Homo sapiens \[9606\]/)
    ).toBeInTheDocument();
  });

  it('should summarise multiple taxa with a count, and label exclusions', async () => {
    setupMocks({
      parameters: inputParams(
        stringParameter('taxids', '9606,10090,9544') +
          stringParameter('negative_taxids', '562')
      ),
      taxonomyResults: [
        { taxonId: 9606, scientificName: 'Homo sapiens' },
        { taxonId: 10090, scientificName: 'Mus musculus' },
        { taxonId: 9544, scientificName: 'Macaca mulatta' },
        { taxonId: 562, scientificName: 'Escherichia coli' },
      ],
    });

    customRender(<BlastResult />, { route });

    expect(
      await screen.findByText(
        /restricted to Homo sapiens \[9606\] and 2 more, excluding Escherichia coli \[562\]/
      )
    ).toBeInTheDocument();
    // The collapsed taxa are counted, not listed
    expect(screen.queryByText(/Mus musculus/)).not.toBeInTheDocument();
  });

  it('should not paint raw taxon IDs while the taxonomy request is in flight', async () => {
    setupMocks({
      parameters: inputParams(stringParameter('taxids', '9606')),
      taxonomyResults: [{ taxonId: 9606, scientificName: 'Homo sapiens' }],
    });
    // Hold the taxonomy response back until after the heading has rendered
    let releaseTaxonomy: () => void = () => {};
    const taxonomyRequested = new Promise<void>((resolve) => {
      releaseTaxonomy = resolve;
    });
    mockRequests
      .onGet(/taxonomy\/taxonIds/)
      .reply(
        () =>
          taxonomyRequested.then(() => [
            200,
            { results: [{ taxonId: 9606, scientificName: 'Homo sapiens' }] },
          ]) as Promise<[number, unknown]>
      );

    customRender(<BlastResult />, { route });

    // The database clause renders first, without any taxon clause behind it
    const postscript = await screen.findByText(/found in UniProtKB Swiss-Prot/);
    expect(postscript).not.toHaveTextContent('9606');
    expect(postscript).not.toHaveTextContent('restricted to');

    releaseTaxonomy();
    expect(
      await screen.findByText(/restricted to Homo sapiens \[9606\]/)
    ).toBeInTheDocument();
  });

  it('should keep showing the restriction as bare IDs if the taxonomy lookup fails', async () => {
    setupMocks({
      parameters: inputParams(stringParameter('taxids', '9606')),
      taxonomyStatus: 500,
    });

    customRender(<BlastResult />, { route });

    // Dropping the clause entirely would misstate the scope of the search
    expect(await screen.findByText(/restricted to 9606/)).toBeInTheDocument();
  });
});
