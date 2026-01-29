import { fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { type FormParameters } from '../../../../jobs/types/jobsFormParameters';
import { type JobTypes } from '../../../../jobs/types/jobTypes';
import customRender from '../../../__test-helpers__/customRender';
import useDataApi from '../../../hooks/useDataApi';
import SequenceView from '../SequenceView';
import SequenceUIDataJson from './__mocks__/sequenceUIData';

jest.mock('../../../hooks/useDataApi.ts');

(useDataApi as jest.Mock).mockImplementation((url) =>
  url
    ? {
        data: {
          sequence: {
            length: 100,
            molWeight: 100000,
            crc64: 'ABCSSDDD',
            value: 'MNOPQRSTUVWXYZ',
            md5: 'C899F597B1B5D205357C9FAEDA9FF554',
          },
        },
      }
    : {}
);

let rendered: ReturnType<typeof customRender>;
const history = createMemoryHistory<{ parameters: FormParameters[JobTypes] }>();

describe('SequenceView component', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
    rendered = customRender(
      <SequenceView data={SequenceUIDataJson} accession="P05067" />,
      { history }
    );
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.SVGElement.prototype.getBBox;
  });

  it('should render SequenceInfo with provided sequence info (canonical)', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger Isoform sequence load', async () => {
    const viewSequenceButton = screen.getByRole('button', {
      name: /Show sequence/i,
    });
    expect(
      screen.queryByText(/C899F597B1B5D205357C9FAEDA9FF554/)
    ).not.toBeInTheDocument();
    fireEvent.click(viewSequenceButton);
    const sequence = await screen.findByText(
      /C899F597B1B5D205357C9FAEDA9FF554/
    );
    expect(sequence).toBeInTheDocument();
  });

  it('should submit Blast', async () => {
    const toolsButtons = screen.getAllByRole('button', { name: /Tools/i });
    fireEvent.click(toolsButtons[0]);
    const blastButton = await screen.findByRole('button', { name: 'BLAST' });
    fireEvent.click(blastButton);
    expect(history.location.pathname).toBe('/blast');
    expect(history.location.state.parameters).toStrictEqual({
      sequence: 'ATGHASOADSDKDSAJALDSAMCMNDSKMDSKNCSAKN',
    });
  });
});
