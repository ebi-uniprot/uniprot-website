import { ComponentProps, ReactNode } from 'react';
import { Dropdown, Button, ToolboxIcon } from 'franklin-sites';

import MapIDButton from './MapID';
import BlastButton from './Blast';
import AlignButton from './Align';

import useNS from '../../hooks/useNS';

import { Namespace } from '../../types/namespaces';

const visibleElement = (onClick: () => unknown) => (
  <Button variant="tertiary" onClick={onClick}>
    <ToolboxIcon width="1.4ch" />
    Tools
  </Button>
);
type ToolsDropdownProps = {
  selectedEntries: string[];
  blast?: boolean | ReactNode;
  align?: boolean | ReactNode | ReactNode[];
  mapID?: boolean | ReactNode;
  children?: ReactNode | ((closeDropdown: () => unknown) => ReactNode);
} & Omit<ComponentProps<typeof Dropdown>, 'visibleElement' | 'children'>;

const ToolsDropdown = ({
  selectedEntries,
  blast,
  align,
  mapID,
  children,
  ...props
}: ToolsDropdownProps) => {
  const namespace = useNS() || Namespace.uniprotkb;

  let blastNode: ReactNode = null;
  if (blast === true && Array.isArray(selectedEntries)) {
    blastNode = (
      <li>
        <BlastButton selectedEntries={selectedEntries} />
      </li>
    );
  } else if (typeof blast === 'object') {
    blastNode = <li>{blast}</li>;
  }

  let alignNode: ReactNode | ReactNode[] = null;
  if (align === true && Array.isArray(selectedEntries)) {
    alignNode = (
      <li>
        <AlignButton selectedEntries={selectedEntries} />
      </li>
    );
  } else if (typeof align === 'object') {
    alignNode = Array.isArray(align) ? (
      // eslint-disable-next-line react/no-array-index-key
      align.map((alignItem, index) => <li key={index}>{alignItem}</li>)
    ) : (
      <li>{align}</li>
    );
  }

  let mapIDNode: ReactNode = null;
  if (mapID === true && Array.isArray(selectedEntries)) {
    mapIDNode = (
      <li>
        <MapIDButton selectedEntries={selectedEntries} namespace={namespace} />
      </li>
    );
  } else if (typeof mapID === 'object') {
    mapIDNode = <li>{mapID}</li>;
  }

  return (
    <Dropdown visibleElement={visibleElement} {...props}>
      {(closeDropdown: () => unknown) => (
        <ul className="no-bullet">
          {blastNode}
          {alignNode}
          {mapIDNode}
          {typeof children === 'function' ? children(closeDropdown) : children}
        </ul>
      )}
    </Dropdown>
  );
};

export default ToolsDropdown;
