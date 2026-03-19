import { screen } from '@testing-library/react';
import { deflate } from 'pako';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
  atob: (str: string) => Buffer.from(str, 'base64').toString('binary'),
  btoa: (str: string) => Buffer.from(str, 'binary').toString('base64'),
});

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

function encodeHistory(text: string): string {
  const compressed = deflate(new TextEncoder().encode(text));
  return encodeURIComponent(btoa(String.fromCharCode(...compressed)));
}

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
  describe('prefill from URL params', () => {
    it('should prefill message from URL param', () => {
      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?message=hello+from+url`,
      });
      expect(screen.getByRole('textbox', { name: /message/i })).toHaveValue(
        'hello from url'
      );
    });

    it('should append decoded history to context textarea', () => {
      const history = 'What is P12345?\nIt is a protein.';
      const encoded = encodeHistory(history);
      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?history=${encoded}`,
      });
      const textarea = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="context"]'
      );
      expect(textarea?.value).toContain('Previous context:\nWhat is P12345?');
    });

    it('should skip silently on corrupted history', () => {
      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?history=notvalidbase64$$`,
      });
      const textarea = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="context"]'
      );
      expect(textarea?.value).not.toContain('Previous context:');
    });

    it('should skip context when history param absent', () => {
      customRender(<ContactForm />);
      const textarea = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="context"]'
      );
      expect(textarea?.value).not.toContain('Previous context:');
    });
  });
});
