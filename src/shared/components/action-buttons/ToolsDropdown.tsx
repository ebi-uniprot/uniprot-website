import { Dropdown, Button, ToolboxIcon } from 'franklin-sites';

import MapIDButton from './MapID';

import useNS from '../../hooks/useNS';

import { mainNamespaces, Namespace } from '../../types/namespaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseProps {}

interface PropsWithEntries extends BaseProps {
  selectedEntries: string[];
  selectedSequences?: never;
}

interface PropsWithSequences extends BaseProps {
  selectedEntries?: never;
  selectedSequences: string[];
}

type Props = PropsWithEntries | PropsWithSequences;

const ToolsDropdown = ({ selectedEntries, selectedSequences }: Props) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const isMain = mainNamespaces.has(namespace);

  const hasBLAST = true;
  const hasAlign = true;
  const hasMapID =
    isMain &&
    namespace !== Namespace.proteomes &&
    Array.isArray(selectedEntries);
  const hasPeptideSearch = Array.isArray(selectedSequences);
  const hasCopy = Array.isArray(selectedSequences);

  return (
    <Dropdown
      visibleElement={
        <Button variant="tertiary">
          <ToolboxIcon width="1.4ch" />
          Tools
        </Button>
      }
    >
      <ul>
        {hasBLAST && <li>BLAST</li>}
        {hasAlign && <li>Align</li>}

        {hasMapID && (
          <li>
            <MapIDButton
              selectedEntries={selectedEntries}
              namespace={namespace}
            />
          </li>
        )}

        {hasPeptideSearch && <li>Peptide Search</li>}
        {hasCopy && <li>Copy</li>}
      </ul>
    </Dropdown>
  );
};

export default ToolsDropdown;
