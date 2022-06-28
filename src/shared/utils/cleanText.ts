/**
 * See https://github.com/apostrophecms/sanitize-html#sanitize-html for the
 * library's configuration
 */
import deepFreeze from 'deep-freeze';
import sanitizeHtml, { defaults, IOptions, Attributes } from 'sanitize-html';
import styles from './styles/clean-text.module.scss';

export type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong';
const headingRegexp = /h(\d)/i;

const getLowerHeadingLevel = (
  initialLevel: HeadingLevels,
  currentLevel: HeadingLevels
) => {
  const initialMatch = initialLevel.match(headingRegexp);
  const currentMatch = currentLevel.match(headingRegexp);
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
  (currentHLevel: HeadingLevels = 'h1') =>
  (_: string, attribs: Attributes) => {
    const headingLevel = getLowerHeadingLevel(
      currentHLevel,
      _ as HeadingLevels
    );
    return {
      tagName: headingLevel,
      attribs: {
        id: attribs.id,
        class: headingLevel === 'strong' ? styles['strong-block'] : '',
      },
    };
  };

export const getTransformTags = (currentHLevel: HeadingLevels = 'h1') => ({
  h1: updateHeadingLevel(currentHLevel),
  h2: updateHeadingLevel(currentHLevel),
  h3: updateHeadingLevel(currentHLevel),
  h4: updateHeadingLevel(currentHLevel),
  h5: updateHeadingLevel(currentHLevel),
  h6: updateHeadingLevel(currentHLevel),
});

export const cleanTextDefaultOptions = deepFreeze<IOptions>({
  // https://github.com/apostrophecms/sanitize-html/blob/main/index.js#L691-L710
  allowedTags: defaults.allowedTags.filter((tag) => !excludedTags.has(tag)),
  allowedClasses: {
    // Allow only the class names that we add here from the CSS module imported
    '*': Object.values(styles),
  },
  allowedAttributes: {
    ...defaults.allowedAttributes,
    img: ['src', 'alt'],
    '*': ['id', 'style'],
  },
  transformTags: getTransformTags(),
}) as IOptions;

const cleanText = (text: string | null | undefined, options: IOptions) => {
  if (!text) {
    return '';
  }
  return sanitizeHtml(text, options); // eslint-disable-line consistent-return
};

export default cleanText;
