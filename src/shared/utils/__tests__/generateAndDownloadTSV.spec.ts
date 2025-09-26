import generateAndDownloadTSV from '../generateAndDownloadTSV';

describe('generateAndDownloadTSV', () => {
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

  it('should return early when data is undefined', () => {
    const result = generateAndDownloadTSV(undefined);
    expect(result).toBeUndefined();

    expect(createElementSpy).not.toHaveBeenCalled();
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(URLStatic.createObjectURL).not.toHaveBeenCalled();
    expect(BlobMock).not.toHaveBeenCalled();
  });

  it('should return early when data is empty', () => {
    const result = generateAndDownloadTSV([]);
    expect(result).toBeUndefined();

    expect(createElementSpy).not.toHaveBeenCalled();
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(URLStatic.createObjectURL).not.toHaveBeenCalled();
    expect(BlobMock).not.toHaveBeenCalled();
  });

  it('should create TSV with header order from first row and triggers a download (default filename)', () => {
    const data: Record<string, string>[] = [
      { b: '2', a: '1' },
      { b: '22', a: '11' },
    ];

    generateAndDownloadTSV(data);

    expect(BlobMock).toHaveBeenCalledTimes(1);
    const [parts, options] = BlobMock.mock.calls[0];
    expect(options).toEqual({
      type: 'text/tab-separated-values;charset=utf-8;',
    });

    const tsvString = (parts?.[0] ?? '') as string;
    expect(tsvString).toBe(['b\ta', '2\t1', '22\t11'].join('\n'));

    expect(URLStatic.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URLStatic.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({ __mockBlob: true })
    );

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'data.tsv');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(mockLink.click).toHaveBeenCalled();

    expect(removeChildSpy).toHaveBeenCalled();
    expect(URLStatic.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('should fill missing keys with empty strings when building rows', () => {
    const data = [
      { col1: 'x', col2: 'y' },
      { col1: 'only-col1' },
      { col2: 'only-col2' },
    ] as unknown as Record<string, string>[];

    generateAndDownloadTSV(data);

    const [parts] = BlobMock.mock.calls[0];
    const tsvString = (parts?.[0] ?? '') as string;

    expect(tsvString).toBe(
      ['col1\tcol2', 'x\ty', 'only-col1\t', '\tonly-col2'].join('\n')
    );
  });

  it('should use a custom filename when provided', () => {
    const data: Record<string, string>[] = [{ a: '1' }];
    generateAndDownloadTSV(data, 'custom.tsv');

    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      'custom.tsv'
    );
  });

  it('should set link href to the created object URL', () => {
    const data: Record<string, string>[] = [{ a: '1' }];
    generateAndDownloadTSV(data, 'anything.tsv');

    expect(mockLink.href).toBe('blob:mock-url');
  });
});
