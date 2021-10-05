import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'franklin-sites';

import { getLocationEntryPath, Location } from '../../../app/config/urls';

import CleanHighlightMarkDown from './CleanHighlightMarkDown';

type Props = {
  id: string;
  title: string;
  titleMatch?: string;
  contentMatch?: string;
};

const HelpCard = ({ id, title, titleMatch, contentMatch }: Props) => {
  const to = getLocationEntryPath(Location.HelpEntry, id);

  return (
    <Card
      data-testid="help-card"
      header={
        <h2 className="tiny" data-testid="help-title">
          <Link to={to}>
            {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
          </Link>
        </h2>
      }
      headerSeparator={false}
      to={to}
    >
      {contentMatch && <CleanHighlightMarkDown md={contentMatch} />}
    </Card>
  );
};

export default memo(HelpCard);
