import { cleanTextDefaultOptions } from '../cleanText';

import { parseMarkdown } from '../markdown';

describe('parseMarkdown', () => {
  it('should handle inline markdown correctly', () => {
    const markdownInput = 'This is an **inline** rendered _markdown_';
    const expectedOutput =
      'This is an <strong>inline</strong> rendered <em>markdown</em>';

    const result = parseMarkdown(markdownInput, cleanTextDefaultOptions, true);

    expect(result).toBe(expectedOutput);
  });

  it('should handle markdown syntax with tables', () => {
    const markdown = `
  | Header 1 | Header 2 |
  | --- | --- |
  | Cell 1 | Cell 2 |
  `;

    const expectedResult = `<table>
<thead>
<tr>
<th>Header 1</th>
<th>Header 2</th>
</tr>
</thead>
<tbody><tr>
<td>Cell 1</td>
<td>Cell 2</td>
</tr>
</tbody></table>
`;

    expect(parseMarkdown(markdown, cleanTextDefaultOptions)).toEqual(
      expectedResult
    );
  });

  it('should handle markdown syntax correctly (with headings)', () => {
    const markdownInput =
      '# Heading\n\nThis is a paragraph with **bold** and _italic_ text.';
    const expectedOutput =
      '<h2 id="heading">Heading</h2>\n<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>\n';

    const result = parseMarkdown(markdownInput, cleanTextDefaultOptions);

    expect(result).toBe(expectedOutput);
  });
});
