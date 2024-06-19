import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { stringifyQuery } from '../../utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';

type ToolsButtonProps = {
  selectedEntries: string[];
  sequence?: string;
  disabled: boolean;
  title: string;
  location: Location;
};

const ToolsButton: FC<React.PropsWithChildren<ToolsButtonProps>> = ({
  selectedEntries,
  sequence,
  disabled,
  title,
  location,
  children,
}) => (
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
            search: stringifyQuery({
              ids: selectedEntries.join(','),
              sequence,
            }),
          }
    }
    className={helper['no-small']}
  >
    {children}
  </Button>
);

export default ToolsButton;
