import { screen } from '@testing-library/react';

import { Location, LocationToPath } from '../../../app/config/urls';
import customRender from '../../../shared/__test-helpers__/customRender';
import {
  useFormLogic,
  type UseFormLogicReturnType,
} from '../../adapters/contactFormAdapter';
import ContactForm from '../ContactForm';

jest.mock('../../adapters/contactFormAdapter');
const handleSubmit = jest.fn();
const handleChange = jest.fn();

describe('ContactForm', () => {
  beforeAll(() => {
    jest
      .spyOn(window.navigator, 'userAgent', 'get')
      .mockReturnValue('mocked user agent');
  });

  beforeEach(() => {
    handleSubmit.mockClear();
    (useFormLogic as jest.Mock<UseFormLogicReturnType>).mockReturnValue({
      sending: false,
      suggestions: undefined,
      handleSubmit,
      handleChange,
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
      suggestions: undefined,
      handleSubmit,
      handleChange,
    });
    const { asFragment } = customRender(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(button).toBeDisabled();
  });
});
