import { screen } from '@testing-library/react';

import customRender from '../../../shared/__test-helpers__/customRender';

import ContactForm from '../ContactForm';

import {
  useFormLogic,
  UseFormLogicReturnType,
} from '../../adapters/contactFormAdapter';

import { Location, LocationToPath } from '../../../app/config/urls';

jest.mock('../../adapters/contactFormAdapter');
const handleSubmit = jest.fn();

describe('ContactForm', () => {
  beforeEach(async () => {
    handleSubmit.mockClear();
    (useFormLogic as jest.Mock<UseFormLogicReturnType>).mockReturnValue({
      sending: false,
      handleSubmit,
    });
  });

  it('should render for generic contact form', () => {
    const { asFragment } = customRender(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render for feedback contact form', () => {
    const { asFragment } = customRender(<ContactForm />, {
      route: LocationToPath[Location.ContactUpdate],
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should prefill the form for feedback contact form', () => {
    customRender(<ContactForm />, {
      route: `${
        LocationToPath[Location.ContactUpdate]
      }?entry=P05067&entryType=Reviewed (Swiss-Prot)`,
    });
    expect(screen.getByRole('textbox', { name: /subject/i })).toHaveValue(
      'Reviewed (Swiss-Prot) P05067 entry update request'
    );
  });

  it('should be disabled when submitting', () => {
    (useFormLogic as jest.Mock<UseFormLogicReturnType>).mockReturnValue({
      sending: true,
      handleSubmit,
    });
    const { asFragment } = customRender(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(button).toBeDisabled();
  });
});
