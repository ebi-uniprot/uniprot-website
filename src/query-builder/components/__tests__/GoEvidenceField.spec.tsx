import { render, fireEvent, screen } from '@testing-library/react';

import GoEvidenceField, { GoEvidenceFieldProps } from '../GoEvidenceField';
import { getSearchTerm } from './__mocks__/configureSearchTerms';

const props: GoEvidenceFieldProps = {
  handleChange: jest.fn(),
  field: getSearchTerm('go_evidence'),
  initialValue: { go_evidence: 'manual' },
};

describe('GoEvidenceField component', () => {
  beforeEach(() => {
    (props.handleChange as jest.Mock).mockClear();
  });

  it('should render', () => {
    const { asFragment } = render(<GoEvidenceField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should initialise', () => {
    render(<GoEvidenceField {...props} />);
    const select = screen.getByRole<HTMLSelectElement>('combobox');
    expect(select.value).toBe('manual');
  });

  it('should change evidence', () => {
    render(<GoEvidenceField {...props} />);
    const evidenceSelect = screen.getByRole('combobox');
    fireEvent.change(evidenceSelect, {
      target: { value: 'automatic' },
    });
    expect(props.handleChange).toBeCalledWith({
      go_evidence: 'automatic',
    });
  });
});
