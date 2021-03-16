import { Method } from 'axios';
import { Link } from 'react-router-dom';
import apiUrls from '../../config/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';

const fetchOptions: { method: Method } = { method: 'HEAD' };
const ReleaseInfo = () => {
  // TODO: replace with statistics endpoint
  const { headers } = useDataApi(
    `${apiUrls.search(Namespace.uniprotkb)}?query=*&size=0`,
    fetchOptions
  );
  const releaseDate = headers?.['x-release']
    ? new Date(headers['x-release'])
    : undefined;

  if (!releaseDate) {
    return <>Loading release information</>;
  }

  return (
    <>
      <Link to="/">
        {/* TODO: don't use release number as date, might be different */}
        Release {releaseDate.getFullYear()}_
        {`${releaseDate.getMonth() + 1}`.padStart(2, '0')}
      </Link>
      | <Link to="/">Statistics</Link>
    </>
  );
};

export default ReleaseInfo;
