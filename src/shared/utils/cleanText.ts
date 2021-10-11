/**
 * See https://github.com/apostrophecms/sanitize-html#sanitize-html for the
 * library's configuration
 */
import deepFreeze from 'deep-freeze';
import sanitizeHtml, { defaults, IOptions, Attributes } from 'sanitize-html';
import styles from './styles/clean-text.module.scss';

type HeaderLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const getLowerHeaderLevel = (
  initialLevel: HeaderLevels,
  currentLevel: HeaderLevels
) => {
  const headerRegexp = new RegExp(/h(\d)/i);
  const initialMatch = initialLevel.match(headerRegexp);
  const currentMatch = currentLevel.match(headerRegexp);
  if (initialMatch && currentMatch) {
    const initialLevel = parseInt(initialMatch[1], 10);
    const currentLevel = parseInt(currentMatch[1], 10);
    return initialLevel + currentLevel <= 6
      ? `h${initialLevel + currentLevel}`
      : 'strong';
  }
  return 'strong';
};

// List of tags to remove from the library default accepted set
const excludedTags = new Set(['a']);

const updateHeadingLevel =
  (currentHLevel: HeaderLevels = 'h1') =>
  (_: string, attribs: Attributes) => {
    const headerLevel = getLowerHeaderLevel(currentHLevel, _ as HeaderLevels);
    return {
      tagName: headerLevel,
      attribs: {
        id: attribs.id,
      },
    };
  };

export const cleanTextDefaultOptions = (currentHLevel: HeaderLevels = 'h1') =>
  deepFreeze<IOptions>({
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
      h1: updateHeadingLevel(currentHLevel),
      h2: updateHeadingLevel(currentHLevel),
      h3: updateHeadingLevel(currentHLevel),
      h4: updateHeadingLevel(currentHLevel),
      h5: updateHeadingLevel(currentHLevel),
      h6: updateHeadingLevel(currentHLevel),
    },
  }) as IOptions;

const cleanText = (
  text?: string | null,
  options: IOptions = cleanTextDefaultOptions()
) => {
  if (!text) {
    return '';
  }
  return sanitizeHtml(text, options); // eslint-disable-line consistent-return
};

export default cleanText;
