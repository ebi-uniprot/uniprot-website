/**
 * See https://github.com/apostrophecms/sanitize-html#sanitize-html for the
 * library's configuration
 */
import sanitizeHtml, { defaults, IOptions, Attributes } from 'sanitize-html';

import styles from './styles/clean-text.module.scss';

// List of tags to remove from the library default accepted set
const excludedTags = new Set(['a']);

const headingToStrong = (_: string, attribs: Attributes) => ({
  tagName: 'strong',
  attribs: {
    id: attribs.id,
    class: styles.heading,
  },
});

export const cleanTextDefaultOptions = Object.freeze<IOptions>({
  // https://github.com/apostrophecms/sanitize-html/blob/main/index.js#L691-L710
  allowedTags: defaults.allowedTags.filter((tag) => !excludedTags.has(tag)),
  allowedClasses: Object.freeze({
    // Allow only the class names that we add here from the CSS module imported
    '*': Object.values(styles),
  }),
  allowedAttributes: Object.freeze({
    ...defaults.allowedAttributes,
    '*': ['id'],
  }),
  transformTags: Object.freeze({
    h1: headingToStrong,
    h2: headingToStrong,
    h3: headingToStrong,
    h4: headingToStrong,
    h5: headingToStrong,
    h6: headingToStrong,
  }),
});

const cleanText = (
  text?: string | null,
  options: IOptions = cleanTextDefaultOptions
) => {
  if (!text) {
    return '';
  }
  return sanitizeHtml(text, options); // eslint-disable-line consistent-return
};

export default cleanText;
