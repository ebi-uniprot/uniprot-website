import { cleanTextDefaultOptions } from '../../../shared/utils/cleanText';
import { parseMarkdown } from '../../../shared/utils/markdown';

import './styles/highlight.scss';

const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedClasses: {
    ...cleanTextDefaultOptions.allowedClasses,
    '*': ['match-highlight'],
  },
};

const CleanHighlightMarkDown = ({ md }: { md: string }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: parseMarkdown(md, cleanTextOptions, true),
    }}
  />
);

export default CleanHighlightMarkDown;
