import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { LocationToPath, Location } from '../../../app/config/urls';

type ToolsButtonProps = {
  selectedEntries: string[];
  sequence?: string;
  disabled: boolean;
  title: string;
  location: Location;
};

const ToolsButton: FC<ToolsButtonProps> = ({
  selectedEntries,
  sequence,
  disabled,
  title,
  location,
  children,
}) => {
  const searchParams = new URLSearchParams({ ids: selectedEntries.join(',') });
  if (sequence) {
    searchParams.set('sequence', sequence);
  }

  return (
    <Button
      element={disabled ? 'button' : Link}
      variant="tertiary"
      title={title}
      disabled={disabled}
      to={
        disabled
          ? undefined
          : {
              pathname: LocationToPath[location],
              search: searchParams.toString(),
            }
      }
    >
      {children}
    </Button>
  );
};

export default ToolsButton;
