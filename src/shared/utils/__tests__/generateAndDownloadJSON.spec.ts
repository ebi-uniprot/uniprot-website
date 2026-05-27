import generateAndDownloadJSON from '../generateAndDownloadJSON';

describe('generateAndDownloadJSON', () => {
  let createElementSpy: jest.SpyInstance<
    HTMLElement,
    [tagName: string, options?: ElementCreationOptions]
  >;
  let appendChildSpy: jest.SpyInstance<Node, [node: Node]>;
  let removeChildSpy: jest.SpyInstance<Node, [child: Node]>;

  type URLStaticMock = typeof URL & {
    createObjectURL: jest.Mock<string, [Blob]>;
    revokeObjectURL: jest.Mock<void, [string]>;
  };
  let URLStatic: URLStaticMock;

  type BlobConstructor = new (
    blobParts?: BlobPart[],
    options?: BlobPropertyBag
  ) => Blob;
  let originalBlob: BlobConstructor;
  let BlobMock: jest.Mock<Blob, [BlobPart[]?, BlobPropertyBag?]>;

  let mockLink: Partial<HTMLAnchorElement> & {
    setAttribute: jest.Mock<void, [string, string]>;
    click: jest.Mock<void, []>;
  };

  beforeEach(() => {
    mockLink = {
      href: '',
      setAttribute: jest.fn(),
      click: jest.fn(),
    };

    createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockLink as HTMLAnchorElement);

    appendChildSpy = jest
      .spyOn(document.body, 'appendChild')
      .mockImplementation((node: Node) => node);

    removeChildSpy = jest
      .spyOn(document.body, 'removeChild')
      .mockImplementation((node: Node) => node);

    URLStatic = URL as URLStaticMock;
    URLStatic.createObjectURL = jest
      .fn<string, [Blob]>()
      .mockReturnValue('blob:mock-url');
    URLStatic.revokeObjectURL = jest.fn<void, [string]>();

    originalBlob = globalThis.Blob as BlobConstructor;

    BlobMock = jest.fn<Blob, [BlobPart[]?, BlobPropertyBag?]>(function (
      this: unknown,
      parts?: BlobPart[],
      options?: BlobPropertyBag
    ) {
      return {
        __mockBlob: true,
        parts: parts ?? [],
        options,
      } as unknown as Blob;
    });

    Object.defineProperty(globalThis, 'Blob', {
      configurable: true,
      writable: true,
      value: BlobMock as typeof Blob,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    URLStatic.createObjectURL.mockReset();
    URLStatic.revokeObjectURL.mockReset();

    Object.defineProperty(globalThis, 'Blob', {
      configurable: true,
      writable: true,
      value: originalBlob as typeof Blob,
    });
  });

  it('returns early when data is undefined', () => {
    expect(generateAndDownloadJSON(undefined)).toBeUndefined();
    expect(createElementSpy).not.toHaveBeenCalled();
    expect(BlobMock).not.toHaveBeenCalled();
  });

  it('returns early when data is null', () => {
    generateAndDownloadJSON(null);
    expect(BlobMock).not.toHaveBeenCalled();
    expect(URLStatic.createObjectURL).not.toHaveBeenCalled();
  });

  it('serialises data to a pretty-printed JSON blob and triggers a download', () => {
    const data = { primaryAccession: 'UPI000002A2F6-9606', entryType: 'AA' };
    generateAndDownloadJSON(data, 'annotations.json');

    expect(BlobMock).toHaveBeenCalledTimes(1);
    const [parts, options] = BlobMock.mock.calls[0];
    expect(options).toEqual({ type: 'application/json;charset=utf-8;' });
    expect(parts?.[0]).toBe(JSON.stringify(data, null, 2));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe('blob:mock-url');
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      'annotations.json'
    );
    expect(mockLink.click).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(URLStatic.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('falls back to the default filename', () => {
    generateAndDownloadJSON({ a: 1 });
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'data.json');
  });
});
