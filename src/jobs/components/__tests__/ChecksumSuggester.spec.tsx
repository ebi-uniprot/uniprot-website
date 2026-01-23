import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../shared/__test-helpers__/customRender';
import ChecksumSuggester from '../ChecksumSuggester';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, {
  results: [
    {
      uniParcId: 'UPI000002DB1C',
      uniProtKBAccessions: [
        'A0A140VJC8',
        'B2R5V1.1',
        'P05067-1',
        'D3DSD3.1',
        'P05067',
        // Not existing, but just for testing
        'P00000-0',
      ],
      oldestCrossRefCreated: '1991-11-01',
      mostRecentCrossRefUpdated: '2024-11-27',
    },
  ],
});

const sequence =
  'MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSAMSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN';

describe('ChecksumSuggester', () => {
  it('should show message', async () => {
    customRender(<ChecksumSuggester sequence={sequence} />);
    expect(
      await screen.findByRole('link', {
        name: 'View the active entries in UniProtKB',
      })
    ).toHaveAttribute('href', '/uniprotkb?query=%28uniparc%3AUPI000002DB1C%29');
    expect(
      await screen.findByRole('link', {
        name: 'View the matching entry in UniParc',
      })
    ).toHaveAttribute('href', '/uniparc/UPI000002DB1C/entry');
  });
  it('should call onMatch when matching entries are found and userDimiss after user acknowledgement', async () => {
    const onMatch = jest.fn();
    const onUserDismiss = jest.fn();

    customRender(
      <ChecksumSuggester
        sequence={sequence}
        onMatch={onMatch}
        onUserDismiss={onUserDismiss}
      />
    );
    await screen.findByRole('link', {
      name: 'View the matching entry in UniParc',
    });
    await waitFor(() => {
      expect(onMatch).toHaveBeenCalled();
    });

    const checkbox = await screen.findByRole('checkbox', {
      name: 'None of the entries are of interest to me',
    });
    checkbox.click();
    expect(onUserDismiss).toHaveBeenCalledTimes(1);
  });
  it('should not show message because sequence md5 does not match', async () => {
    customRender(<ChecksumSuggester sequence="FOO" />);
    await waitFor(() => {
      expect(
        screen.queryByText(
          'Are you looking for these entries which exactly match your sequence?'
        )
      ).not.toBeInTheDocument();
    });
  });
  it('should not show message because name is provided and matches the returned uniProtKBAccessions', async () => {
    customRender(<ChecksumSuggester sequence={sequence} name="P05067" />);
    await waitFor(() => {
      expect(
        screen.queryByText(
          'Are you looking for these entries which exactly match your sequence?'
        )
      ).not.toBeInTheDocument();
    });
  });
});
