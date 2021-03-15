import { render, fireEvent, screen } from '@testing-library/react';

import EvidenceField from '../EvidenceField';

let rendered;
let props;

describe('EvidenceField component', () => {
  beforeEach(() => {
    props = {
      handleChange: jest.fn(),
      field: {
        id: 'ccev_webresource',
        itemType: 'single',
        term: 'ccev_webresource',
        dataType: 'string',
        fieldType: 'evidence',
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

    rendered = render(<EvidenceField {...props} />);
  });

  test('should change evidence', () => {
    const evidenceSelect = screen.getByTestId('evidence-select');
    fireEvent.change(evidenceSelect, {
      target: { value: 0 },
    });
    expect(props.handleChange).toBeCalledWith({
      ccev_webresource: 'baz_code',
    });
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should initialise', () => {
    expect(screen.getByTestId('evidence-select').value).toBe('baz_code');
  });
});
