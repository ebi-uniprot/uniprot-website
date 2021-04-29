/**
 * See https://github.com/apostrophecms/sanitize-html#sanitize-html for the
 * library's configuration
 */
import sanitizeHtml, {
  defaults,
  simpleTransform,
  IOptions,
} from 'sanitize-html';

import styles from './styles/clean-text.module.scss';

// List of tags to remove from the library default accepted set
const blacklist = new Set(['a']);

export const cleanTextDefaultOptions: IOptions = {
  // https://github.com/apostrophecms/sanitize-html/blob/main/index.js#L691-L710
  allowedTags: defaults.allowedTags.filter((tag) => !blacklist.has(tag)),
  allowedClasses: {
    // Allow only the class names that we add here from the CSS module imported
    '*': Object.values(styles),
  },
  transformTags: {
    h1: simpleTransform('strong', { class: styles.heading }, false),
    h2: simpleTransform('strong', { class: styles.heading }, false),
    h3: simpleTransform('strong', { class: styles.heading }, false),
    h4: simpleTransform('strong', { class: styles.heading }, false),
    h5: simpleTransform('strong', { class: styles.heading }, false),
    h6: simpleTransform('strong', { class: styles.heading }, false),
  },
};

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
