import { memo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Card } from 'franklin-sites';
import marked from 'marked';

import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/help-card.module.scss';

const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedClasses: {
    ...cleanTextDefaultOptions.allowedClasses,
    '*': ['match-highlight'],
  },
};

type Props = {
  id: string;
  title: string;
  titleMatch?: string;
  contentMatch?: string;
};

const HelpCard = ({ id, title, titleMatch, contentMatch }: Props) => {
  const to = generatePath(LocationToPath[Location.HelpEntry], {
    accession: id,
  });

  return (
    <Card
      header={
        <h2 className="tiny">
          <Link to={to}>
            {titleMatch ? (
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: cleanText(
                    marked.parseInline(titleMatch),
                    cleanTextOptions
                  ),
                }}
              />
            ) : (
              title
            )}
          </Link>
        </h2>
      }
      headerSeparator={false}
      to={to}
      className={styles['help-card']}
    >
      {contentMatch && (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: cleanText(
              marked.parseInline(contentMatch),
              cleanTextOptions
            ),
          }}
        />
      )}
    </Card>
  );
};

export default memo(HelpCard);
