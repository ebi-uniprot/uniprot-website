import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import customRender from '../../../../shared/__test-helpers__/customRender';
import UniProtKBFeaturesView, {
  type FeatureDatum,
} from '../UniProtKBFeaturesView';

const exact = { modifier: 'EXACT' as const };

const features: FeatureDatum[] = [
  {
    type: 'Domain',
    featureId: 'PRO_DOM_1',
    description: 'BRCT 1',
    location: { start: { value: 1, ...exact }, end: { value: 10, ...exact } },
    source: 'UniProt',
  },
  {
    type: 'Domain',
    featureId: 'PRO_DOM_2',
    description: 'BRCT 2',
    location: { start: { value: 20, ...exact }, end: { value: 30, ...exact } },
    source: 'UniProt',
  },
  {
    type: 'Region',
    featureId: 'PRO_REG_1',
    description: 'Disordered',
    location: { start: { value: 40, ...exact }, end: { value: 60, ...exact } },
    source: 'UniProt',
  },
  {
    type: 'Active site',
    featureId: 'PRO_ACT_1',
    description: 'Nucleophile',
    location: { start: { value: 70, ...exact }, end: { value: 70, ...exact } },
    source: 'PTMeXchange',
  },
];

describe('UniProtKBFeaturesView filter dropdowns', () => {
  it('renders a Type column dropdown populated with the distinct feature types', () => {
    customRender(
      <UniProtKBFeaturesView primaryAccession="P12345" features={features} />
    );

    const typeHeader = screen.getByRole('columnheader', { name: /Type/i });
    const select = within(typeHeader).getByRole('combobox');
    const options = within(select)
      .getAllByRole('option')
      .map((o) => o.textContent);
    expect(options).toEqual(
      expect.arrayContaining(['All', 'Active site', 'Domain', 'Region'])
    );
  });

  it('filters rows when a Type is selected', async () => {
    customRender(
      <UniProtKBFeaturesView primaryAccession="P12345" features={features} />
    );

    expect(screen.getAllByRole('row')).toHaveLength(1 + features.length);

    const typeHeader = screen.getByRole('columnheader', { name: /Type/i });
    const select = within(typeHeader).getByRole('combobox');
    await userEvent.selectOptions(select, 'Domain');

    const rows = screen.getAllByRole('row').slice(1); // drop header
    expect(rows).toHaveLength(2);
    rows.forEach((row) => expect(row).toHaveTextContent('Domain'));
  });

  it('omits the Source column dropdown by default', () => {
    customRender(
      <UniProtKBFeaturesView primaryAccession="P12345" features={features} />
    );
    expect(
      screen.queryByRole('columnheader', { name: /Source/i })
    ).not.toBeInTheDocument();
  });

  it('renders a Source dropdown when showSourceColumn is set', () => {
    customRender(
      <UniProtKBFeaturesView
        primaryAccession="P12345"
        features={features}
        showSourceColumn
      />
    );
    const sourceHeader = screen.getByRole('columnheader', { name: /Source/i });
    const select = within(sourceHeader).getByRole('combobox');
    const options = within(select)
      .getAllByRole('option')
      .map((o) => o.textContent);
    expect(options).toEqual(
      expect.arrayContaining(['All', 'PTMeXchange', 'UniProt'])
    );
  });
});
