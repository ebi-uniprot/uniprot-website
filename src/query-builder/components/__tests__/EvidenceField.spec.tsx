import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EvidenceField from '../EvidenceField';

let rendered;
let props;

describe('EvidenceField component', () => {
  beforeEach(() => {
    props = {
      value: '',
      handleChange: jest.fn(),
      data: [
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
    };

    rendered = render(<EvidenceField {...props} />);
  });

  test('should change evidence', () => {
    const { getByTestId } = rendered;
    const evidenceSelect = getByTestId('evidence-select');
    fireEvent.change(evidenceSelect, {
      target: { value: props.data[0].items[0].code },
    });
    expect(props.handleChange).toBeCalled();
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
