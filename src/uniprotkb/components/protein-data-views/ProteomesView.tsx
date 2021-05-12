import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';

import { Xref } from '../../../shared/types/apiModel';

type Props = {
  data?: Xref[];
  isCompact?: boolean;
};
const ProteomesView = ({ data, isCompact = false }: Props) => {
  if (!data) {
    return null;
  }
  return (
    <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
      {data.map((proteome) => (
        <InfoList
          key={`${proteome.id}-${proteome.properties?.Component}`}
          isCompact={isCompact}
          infoData={[
            {
              title: 'Identifier',
              content: proteome.id && (
                <Link to={getEntryPath(Namespace.proteomes, proteome.id)}>
                  {proteome.id}
                </Link>
              ),
            },
            {
              title: 'Component',
              content: proteome.properties?.Component,
            },
          ]}
        />
      ))}
    </ExpandableList>
  );
};

export default ProteomesView;
