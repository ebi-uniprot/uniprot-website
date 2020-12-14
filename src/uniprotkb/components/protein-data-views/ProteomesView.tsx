import { FC } from 'react';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Xref } from '../../types/commentTypes';

const ProteomesId: FC<{ id?: string }> = ({ id }) => (
  <Link to={`/proteomes/${id}`}>{id}</Link>
);

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
    <>
      {data.map((proteome) => (
        <InfoList
          key={proteome.id}
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
    </>
  );
};

export default ProteomesView;
