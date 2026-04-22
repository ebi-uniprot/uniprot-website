import { deflateSync } from 'node:zlib';

import { screen, waitFor } from '@testing-library/react';
import { TextDecoder, TextEncoder } from 'util';

// JSDOM Polyfills
Object.assign(global, {
  TextEncoder,
  TextDecoder,
  atob: (str: string) => Buffer.from(str, 'base64').toString('binary'),
  btoa: (str: string) => Buffer.from(str, 'binary').toString('base64'),
});

if (typeof global.DecompressionStream === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DecompressionStream } = require('node:stream/web');
  global.DecompressionStream = DecompressionStream;
}
{
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Blob } = require('node:buffer');
  global.Blob = Blob;
}
{
  global.Response = class MockResponse {
    stream: ReadableStream;
    constructor(stream: ReadableStream) {
      this.stream = stream;
    }
    async text() {
      const chunks: Uint8Array[] = [];
      const reader = this.stream.getReader();
      const readAll = async (): Promise<Uint8Array[]> => {
        const { done, value } = await reader.read();
        if (value) {
          chunks.push(value);
        }
        return done ? chunks : readAll();
      };
      await readAll();
      return new TextDecoder().decode(Buffer.concat(chunks));
    }
  } as unknown as typeof Response;
}

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
  // deflateSync creates a zlib-wrapped deflate payload,
  // which exactly matches what DecompressionStream('deflate') expects.
  const compressed = deflateSync(Buffer.from(text, 'utf-8'));
  return encodeURIComponent(compressed.toString('base64'));
}

describe('ContactForm', () => {
  beforeAll(() => {
    jest
      .spyOn(window.navigator, 'userAgent', 'get')
      .mockReturnValue('mocked user agent');
  });

  afterAll(() => {
    jest.restoreAllMocks();
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
    const params = new URLSearchParams({
      entry: 'P05067',
      entryType: 'Reviewed (Swiss-Prot)',
    });
    customRender(<ContactForm />, {
      route: `${LocationToPath[Location.ContactUpdate]}?${params.toString()}`,
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
    const button = screen.getByRole<HTMLButtonElement>('button', {
      name: /sending message/i,
    });
    expect(button).toBeDisabled();
  });

  describe('prefill from URL params', () => {
    it('should prefill message from URL param', () => {
      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?message=hello+from+url`,
      });
      expect(screen.getByRole('textbox', { name: /^message/i })).toHaveValue(
        'hello from url'
      );
    });

    // 3. Update to async/await for DecompressionStream
    it('should append decoded history to context textarea', async () => {
      const history = 'What is P12345?\nIt is a protein.';
      const encoded = encodeHistory(history);

      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?history=${encoded}`,
      });

      const textarea = screen.getByRole('textbox', {
        name: /Additional information/i,
      });

      // We must wait for the useEffect to finish the stream decompression
      await waitFor(() => {
        expect((textarea as HTMLTextAreaElement).value).toContain(
          'Previous context:\nWhat is P12345?'
        );
      });
    });

    it('should skip silently on corrupted history', async () => {
      customRender(<ContactForm />, {
        route: `${LocationToPath[Location.ContactGeneric]}?history=notvalidbase64$$`,
      });

      const textarea = screen.getByRole('textbox', {
        name: /Additional information/i,
      });

      // Wait to ensure the catch block executes and state settles
      await waitFor(() => {
        expect((textarea as HTMLTextAreaElement).value).not.toContain(
          'Previous context:'
        );
      });
    });

    it('should skip context when history param absent', () => {
      customRender(<ContactForm />);
      const textarea = screen.getByRole('textbox', {
        name: /Additional information/i,
      });
      expect((textarea as HTMLTextAreaElement).value).not.toContain(
        'Previous context:'
      );
    });
  });
});
