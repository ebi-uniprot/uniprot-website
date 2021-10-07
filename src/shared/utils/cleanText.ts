/**
 * See https://github.com/apostrophecms/sanitize-html#sanitize-html for the
 * library's configuration
 */
import deepFreeze from 'deep-freeze';
import sanitizeHtml, { defaults, IOptions, Attributes } from 'sanitize-html';
import styles from './styles/clean-text.module.scss';

// List of tags to remove from the library default accepted set
const excludedTags = new Set(['a']);

const updateHeadingLevel = (_: string, attribs: Attributes) => {
  let headerLevel;
  switch (_) {
    case 'h1':
      headerLevel = 'h2';
      break;
    case 'h2':
      headerLevel = 'h3';
      break;
    case 'h3':
      headerLevel = 'h4';
      break;
    case 'h4':
      headerLevel = 'h5';
      break;
    default:
      headerLevel = 'strong';
  }
  return {
    tagName: headerLevel,
    attribs: {
      id: attribs.id,
    },
  };
};

export const cleanTextDefaultOptions = deepFreeze<IOptions>({
  // https://github.com/apostrophecms/sanitize-html/blob/main/index.js#L691-L710
  allowedTags: defaults.allowedTags.filter((tag) => !excludedTags.has(tag)),
  allowedClasses: {
    // Allow only the class names that we add here from the CSS module imported
    '*': Object.values(styles),
  },
  allowedAttributes: {
    ...defaults.allowedAttributes,
    '*': ['id'],
  },
  transformTags: {
    h1: updateHeadingLevel,
    h2: updateHeadingLevel,
    h3: updateHeadingLevel,
    h4: updateHeadingLevel,
    h5: updateHeadingLevel,
    h6: updateHeadingLevel,
  },
}) as IOptions;

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
