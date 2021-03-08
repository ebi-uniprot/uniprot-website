import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Location, LocationToPath } from '../../app/config/urls';
import { ProteomesAPIModel } from '../adapters/proteomesConverter';

const ProteinCount: FC<Pick<ProteomesAPIModel, 'id' | 'proteinCount'>> = ({
  id,
  proteinCount,
}) => (
  <Link
    to={{
      pathname: LocationToPath[Location.UniProtKBResults],
      search: `query=proteome:${id}`,
    }}
  >
    {/* TODO: to eventually be supported by the backend in 2021_02 - 2021_03 */}
    {proteinCount ?? 'no data yet'}
  </Link>
);

export default ProteinCount;
