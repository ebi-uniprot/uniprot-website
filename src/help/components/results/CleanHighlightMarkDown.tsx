import { marked } from 'marked';
import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';

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
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: cleanText(marked.parseInline(md), cleanTextOptions),
    }}
  />
);

export default CleanHighlightMarkDown;
