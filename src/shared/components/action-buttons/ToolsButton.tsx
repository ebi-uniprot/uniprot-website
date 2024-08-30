import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';
import cn from 'classnames';

import { stringifyQuery } from '../../utils/url';
import { roundNumber } from '../../utils/roundNumber';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';

type ToolsButtonProps = {
  selectedEntries?: string[];
  sequence?: string;
  from?: string;
  to?: string;
  peps?: string;
  disabled?: boolean;
  title: string;
  location: Location;
};

const ToolsButton: FC<React.PropsWithChildren<ToolsButtonProps>> = ({
  selectedEntries,
  sequence,
  from,
  to,
  peps,
  disabled,
  title,
  location,
  children,
}) => {
  const content = (
    <>
      {children}
      {/* Just show count when it wouldn't be 0 */}
      {selectedEntries?.length
        ? ` (${roundNumber(selectedEntries.length + (sequence ? 1 : 0))})`
        : null}
    </>
  );

  if (disabled) {
    return (
      <Button
        variant="tertiary"
        title={title}
        disabled={disabled}
        className={helper['no-small']}
      >
        {content}
      </Button>
    );
  }

  return (
    <Link
      className={cn('button', 'tertiary', helper['no-small'])}
      title={title}
      to={{
        pathname: LocationToPath[location],
        search: stringifyQuery({
          ids: selectedEntries?.join(','),
          sequence,
          from,
          to,
          peps,
        }),
      }}
    >
      {content}
    </Link>
  );
};

export default ToolsButton;
