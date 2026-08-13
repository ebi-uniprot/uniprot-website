import cn from 'classnames';
import { Button } from 'franklin-sites';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { type Location, LocationToPath } from '../../../app/config/urls';
import { type SelectedTaxon } from '../../../jobs/types/jobsFormData';
import helper from '../../styles/helper.module.scss';
import { roundNumber } from '../../utils/roundNumber';
import { stringifyQuery } from '../../utils/url';

type ToolsButtonProps = {
  selectedEntries?: string[];
  sequence?: string;
  from?: string;
  to?: string;
  peps?: string;
  disabled?: boolean;
  title: string;
  location: Location;
  taxons?: SelectedTaxon[];
  /** Hide the trailing " (n)" entry count (e.g. for descriptive menu labels) */
  hideCount?: boolean;
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
  taxons,
  hideCount,
  children,
}) => {
  const content = (
    <>
      {children}
      {/* Just show count when it wouldn't be 0 */}
      {!hideCount && selectedEntries?.length
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
          taxIDs: taxons?.length
            ? taxons.map(({ id, label }) => `${id}|${label}`).join(',')
            : undefined,
        }),
      }}
    >
      {content}
    </Link>
  );
};

export default ToolsButton;
