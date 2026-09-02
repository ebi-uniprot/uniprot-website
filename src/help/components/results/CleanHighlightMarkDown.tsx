import './styles/highlight.scss';

import { cleanTextDefaultOptions } from '../../../shared/utils/cleanText';
import { parseMarkdown } from '../../../shared/utils/markdown';

const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedClasses: {
    ...cleanTextDefaultOptions.allowedClasses,
    '*': ['match-highlight'],
  },
};

const CleanHighlightMarkDown = ({ md }: { md: string }) => (
  <span
    // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- content is sanitized by parseMarkdown via cleanText
    dangerouslySetInnerHTML={{
      __html: parseMarkdown(md, cleanTextOptions, true),
    }}
  />
);

export default CleanHighlightMarkDown;
