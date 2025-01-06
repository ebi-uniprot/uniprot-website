import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';

import { Xref } from '../../../shared/types/apiModel';

type Props = {
  data?: Xref[];
  isCompact?: boolean;
};
const ProteomesView = ({ data, isCompact = false }: Props) => {
  const mergedData: { [key: string]: Array<string | undefined> } = {};

  if (data) {
    data.forEach((proteome) => {
      const { id, properties } = proteome;
      if (id && properties?.Component) {
        if (!mergedData[id]) {
          mergedData[id] = [];
        }
        mergedData[id].push(properties.Component);
      }
    });
  }

  return (
    <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
      {Object.entries(mergedData).map(([id, components]) => (
        <InfoList
          key={id}
          isCompact={isCompact}
          infoData={[
            {
              title: 'Identifier',
              content: id && (
                <Link to={getEntryPath(Namespace.proteomes, id)}>{id}</Link>
              ),
            },
            {
              title: (
                <span data-article-id="proteome_component">Component</span>
              ),
              content: components?.join(', '),
            },
          ]}
        />
      ))}
    </ExpandableList>
  );
};

export default ProteomesView;
