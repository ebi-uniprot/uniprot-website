import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { LocationToPath, Location } from '../../../app/config/urls';

type ToolsButtonProps = {
  selectedEntries: string[];
  disabled: boolean;
  title: string;
  location: Location;
};

const ToolsButton: FC<ToolsButtonProps> = ({
  selectedEntries,
  disabled,
  title,
  location,
  children,
}) => {
  const history = useHistory();

  const handleClick = useCallback(async () => {
    history.push({
      pathname: LocationToPath[location],
      search: `ids=${selectedEntries.join()}`,
    });
  }, [history, location, selectedEntries]);

  return (
    <Button
      variant="tertiary"
      title={title}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ToolsButton;
