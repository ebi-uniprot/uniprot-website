import { FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';

import { Xref } from '../../../shared/types/apiModel';

const ProteomesId: FC<{ id?: string }> = ({ id }) =>
  id ? <Link to={getEntryPath(Namespace.proteomes, id)}>{id}</Link> : null;

const ProteomesComponents: FC<{
  components?: { [key: string]: string };
}> = ({ components }) => (
  <>{components && Object.values(components).join(', ')}</>
);

const ProteomesView: FC<{ data?: Xref[]; isCompact?: boolean }> = ({
  data,
  isCompact = false,
}) => (
  <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
    {data?.map((proteome) => (
      <InfoList
        key={`${proteome.id}-${proteome.properties?.Component}`}
        isCompact={isCompact}
        infoData={[
          {
            title: 'Identifier',
            content: <ProteomesId id={proteome.id} />,
          },
          {
            title: 'Component',
            content: <ProteomesComponents components={proteome.properties} />,
          },
        ]}
      />
    ))}
  </ExpandableList>
);

export default ProteomesView;
