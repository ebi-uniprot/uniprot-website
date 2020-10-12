import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
                code: 0,
                name: 'bar',
              },
              {
                code: 1,
                name: 'baz',
              },
            ],
          },
        ],
      },
    };

    rendered = render(<EvidenceField {...props} />);
  });

  test('should change evidence', () => {
    const { getByTestId } = rendered;
    const evidenceSelect = getByTestId('evidence-select');
    fireEvent.change(evidenceSelect, {
      target: { value: 0 },
    });
    expect(props.handleChange).toBeCalledWith({
      ccev_webresource: '(ccev_webresource:0)',
    });
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
