import { render, fireEvent, screen } from '@testing-library/react';

import EvidenceField from '../EvidenceField';

import { DataType, FieldType, ItemType } from '../../types/searchTypes';

const props = {
  handleChange: jest.fn(),
  field: {
    id: 'ccev_webresource',
    label: 'CCEV web resource',
    itemType: ItemType.single,
    term: 'ccev_webresource',
    dataType: DataType.string,
    fieldType: FieldType.evidence,
    example: 'manual',
    evidenceGroups: [
      {
        groupName: 'foo',
        items: [
          {
            code: 'bar_code',
            name: 'bar',
          },
          {
            code: 'baz_code',
            name: 'baz',
          },
        ],
      },
    ],
  },
  initialValue: { ccev_webresource: 'baz_code' },
};

describe('EvidenceField component', () => {
  beforeEach(() => {
    props.handleChange.mockClear();
  });

  test('should change evidence', () => {
    render(<EvidenceField {...props} />);
    const evidenceSelect = screen.getByRole('combobox');
    fireEvent.change(evidenceSelect, {
      target: { value: 0 },
    });
    expect(props.handleChange).toBeCalledWith({
      ccev_webresource: 'baz_code',
    });
  });

  test('should render', () => {
    const { asFragment } = render(<EvidenceField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should initialise', () => {
    render(<EvidenceField {...props} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('baz_code');
  });
});
