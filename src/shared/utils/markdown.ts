import { Marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { IOptions } from 'sanitize-html';
import cleanText from './cleanText';

const options = { async: false } as const;

const marked = new Marked(options, gfmHeadingId());

export const parseMarkdown = (
  markdown: string,
  cleanTextOptions: IOptions,
  inline?: boolean
): string => {
  // Repeating "options" to prevent TypeScript complaining about returning promises or string
  const parsed = marked[inline ? 'parseInline' : 'parse'](markdown, options);
  const cleaned = cleanText(parsed, cleanTextOptions);
  return cleaned;
};
