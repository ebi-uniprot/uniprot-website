import { Method } from 'axios';
import cn from 'classnames';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { Namespace } from '../../types/namespaces';

import './styles/release-info.scss';

const fetchOptions: { method: Method } = { method: 'HEAD' };

const today = new Date();

const ReleaseInfo = () => {
  // TODO: replace with statistics endpoint
  const { headers } = useDataApi(
    `${apiUrls.queryBuilderTerms(Namespace.uniprotkb)}`,
    fetchOptions
  );
  // NOTE: don't use release number as date, might be different
  const releaseNumber = headers?.['x-release-number'];

  return (
    <>
      <span
        className={cn(
          { 'release-info__placeholder': !releaseNumber },
          'release-info__release_number'
        )}
      >
        {releaseNumber ? (
          <a href="//www.uniprot.org/downloads">
            {/* TODO: update link */}
            Release {releaseNumber}
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
