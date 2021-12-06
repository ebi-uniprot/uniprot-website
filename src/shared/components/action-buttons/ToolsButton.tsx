import { FC, useRef, useCallback } from 'react';
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

  const entriesRef = useRef(selectedEntries);
  entriesRef.current = selectedEntries;

  const handleClick = useCallback(async () => {
    const entries = entriesRef.current;

    history.push(LocationToPath[location], {
      parameters: {
        ids: entries,
      },
    });
  }, [history, location]);

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
