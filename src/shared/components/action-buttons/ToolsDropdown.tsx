import { Dropdown, Button, ToolboxIcon } from 'franklin-sites';

const ToolsDropdown = () => {
  const isMain = mainNamespaces.has(namespace);

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
        <li>content</li>
        {isMain && namespace !== Namespace.proteomes && (
          <MapIDButton
            selectedEntries={selectedEntries}
            namespace={namespace}
          />
        )}
      </ul>
    </Dropdown>
  );
};

export default ToolsDropdown;
