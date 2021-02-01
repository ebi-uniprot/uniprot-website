import { FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { Link, generatePath } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { Xref } from '../../../shared/types/apiModel';

const ProteomesId: FC<{ id?: string }> = ({ id }) =>
  id ? (
    <Link
      to={generatePath(LocationToPath[Location.ProteomesEntry], {
        accession: id,
      })}
    >
      {id}
    </Link>
  ) : null;

const ProteomesComponents: FC<{
  components?: { [key: string]: string };
}> = ({ components }) => (
  <>{components && Object.values(components).join(', ')}</>
);

const ProteomesView: FC<{ data?: Xref[]; isCompact?: boolean }> = ({
  data,
  isCompact = false,
}) => {
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
};

export default ProteomesView;
