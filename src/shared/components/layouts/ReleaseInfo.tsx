import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useUniProtDataVersion } from '../../contexts/UniProtData';

import { getLocationEntryPath, Location } from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';
import blurLoading from '../../styles/blur-loading.module.scss';
import './styles/release-info.scss';

const today = new Date();

const ReleaseInfo = () => {
  // NOTE: release numbers don't correspond to dates, even if they look like it
  const release = useUniProtDataVersion();

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
          { [blurLoading['blur-loading__placeholder']]: !release },
          'release-info__release_number'
        )}
      >
        {release ? (
          <Link
            to={getLocationEntryPath(Location.HelpEntry, 'downloads')}
            title={`UniProt release ${
              release.releaseNumber
            } released on ${release.releaseDate.toDateString()}`}
          >
            Release {release.releaseNumber}
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
