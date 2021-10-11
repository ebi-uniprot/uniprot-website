import cleanText, {
  cleanTextDefaultOptions,
  getTransformTags,
} from '../cleanText';

const pairs: Array<[input: string | null | undefined, output: string]> = [
  [undefined, ''],
  [null, ''],
  ['text', 'text'],
  ['<a>link</a>', 'link'],
  ['<h1 id="title">title</h1>', '<h2 id="title">title</h2>'],
  /* */
  ['<strong class="clean-me">strong</strong>', '<strong>strong</strong>'],
  ['<div title="some title">strong</div>', '<div>strong</div>'],
  [
    '<div>Nested <span>content</span></div>',
    '<div>Nested <span>content</span></div>',
  ],
  ['<iframe>frame</iframe>', 'frame'],
  ['<script>script</script>', ''],
  ["<div onclick={alert('Alert!')}>some div</div>", '<div>some div</div>'],
  ['text<br />new line', 'text<br />new line'],
  ['<script onload={throw new Error()}/>', ''],
];

describe('cleanText', () => {
  it.each(pairs)('should clean text to inject safely', (input, output) =>
    expect(cleanText(input)).toBe(output)
  );

  it('should apply correct headers', () => {
    expect(
      cleanText('<h1 id="title">Title</h1>', {
        ...cleanTextDefaultOptions,
        transformTags: { ...getTransformTags('h3') },
      })
    ).toBe('<h4 id="title">Title</h4>');
    expect(
      cleanText('<h3 id="title">Title</h3>', {
        ...cleanTextDefaultOptions,
        transformTags: { ...getTransformTags('h1') },
      })
    ).toBe('<h4 id="title">Title</h4>');
    expect(
      cleanText('<h6 id="title">Title</h6>', {
        ...cleanTextDefaultOptions,
        transformTags: { ...getTransformTags('h6') },
      })
    ).toBe('<strong id="title">Title</strong>');
    /* Can't access the css modules values from tests, so no classes... 😕 */
    // .toBe('<strong id="title" class="strong-block">Title</strong>')
  });
});
