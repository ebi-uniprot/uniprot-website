import { Method } from 'axios';
import cn from 'classnames';
import apiUrls from '../../config/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';

import './styles/release-info.scss';

const fetchOptions: { method: Method } = { method: 'HEAD' };

const today = new Date();

const ReleaseInfo = () => {
  // TODO: replace with statistics endpoint
  const { headers } = useDataApi(
    `${apiUrls.search(Namespace.uniprotkb)}?query=*&size=0`,
    fetchOptions
  );
  const releaseDate = headers?.['x-release']
    ? new Date(headers['x-release'])
    : undefined;

  return (
    <>
      <span
        className={cn(
          { 'release-info__placeholder': !releaseDate },
          'release-info__release_number'
        )}
      >
        {releaseDate ? (
          <a href="//www.uniprot.org/downloads">
            {/* TODO: update link */}
            {/* TODO: don't use release number as date, might be different */}
            Release {releaseDate.getFullYear()}_
            {`${releaseDate.getMonth() + 1}`.padStart(2, '0')}
          </a>
        ) : (
          `Release ${today.getFullYear()}_00`
        )}
      </span>
      {' | '}
      <a href="//www.uniprot.org/statistics/?sort=published">
        {/* TODO: update link */}Statistics
      </a>
    </>
  );
};

export default ReleaseInfo;
