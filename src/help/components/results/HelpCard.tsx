import { memo } from 'react';
import { Card } from 'franklin-sites';
import marked from 'marked';

import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';

import { HelpAPIModel } from '../../adapters/helpConverter';

import styles from './styles/help-card.module.scss';

const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedClasses: {
    ...cleanTextDefaultOptions.allowedClasses,
    '*': ['match-highlight'],
  },
};

const Preview = memo(({ children }: { children: string }) => (
  <div
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: cleanText(marked.parseInline(children), cleanTextOptions),
    }}
  />
));

type Props = {
  data: HelpAPIModel;
};

const HelpCard = ({ data }: Props) => (
  <Card
    header={<h2 className="tiny">{data.title}</h2>}
    headerSeparator={false}
    to={/* getEntryPath(Namespace.citations, id) */ ''}
    className={styles['help-card']}
  >
    <Preview>{Object.values(data.matches || {})[0]?.[0] || ''}</Preview>
  </Card>
);

export default HelpCard;
