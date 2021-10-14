import { render, fireEvent, screen } from '@testing-library/react';

import EvidenceField, { EvidenceFieldProps } from '../EvidenceField';
import { idToSearchTerm } from './__mocks__/configureSearchTerms';

const props: EvidenceFieldProps = {
  handleChange: jest.fn(),
  field: idToSearchTerm.ccev_webresource,
  initialValue: { ccev_webresource: 'manual' },
};

describe('EvidenceField component', () => {
  beforeEach(() => {
    (props.handleChange as jest.Mock).mockClear();
  });

  test('should change evidence', () => {
    render(<EvidenceField {...props} />);
    const evidenceSelect = screen.getByRole('combobox');
    fireEvent.change(evidenceSelect, {
      target: { value: 'automatic' },
    });
    expect(props.handleChange).toBeCalledWith({
      ccev_webresource: 'automatic',
    });
  });

  test('should render', () => {
    const { asFragment } = render(<EvidenceField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should initialise', () => {
    render(<EvidenceField {...props} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('manual');
  });
});
