import { createMemoryHistory } from 'history';
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

  test('should render for generic contact form', () => {
    const { asFragment } = customRender(<ContactForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render for feedback contact form', () => {
    const { asFragment } = customRender(<ContactForm />, {
      history: createMemoryHistory({
        initialEntries: [LocationToPath[Location.ContactUpdate]],
      }),
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test('should be disabled when submitting', () => {
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
