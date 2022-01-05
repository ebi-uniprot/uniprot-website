import { Link } from 'react-router-dom';
import { Method } from 'axios';
import cn from 'classnames';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import { getLocationEntryPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';
import blurLoading from '../../styles/blur-loading.module.scss';
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
    <span
      className={cn(
        'release-info',
        helper['no-wrap'],
        blurLoading['blur-loading__item']
      )}
    >
      <span
        className={cn(
          { [blurLoading['blur-loading__placeholder']]: !releaseNumber },
          'release-info__release_number'
        )}
      >
        {releaseNumber ? (
          <Link to={getLocationEntryPath(Location.HelpEntry, 'downloads')}>
            Release {releaseNumber}
          </Link>
        ) : (
          `Release ${today.getFullYear()}_00`
        )}
      </span>
      {' | '}
      <Link to={getLocationEntryPath(Location.HelpEntry, 'release-statistics')}>
        Statistics
      </Link>
    </span>
  );
};

export default ReleaseInfo;
