import { Link } from 'react-router-dom';
import cn from 'classnames';

import useUniProtDataVersion from '../../hooks/useUniProtDataVersion';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';
import blurLoading from '../../styles/blur-loading.module.scss';
import styles from './styles/release-info.module.css';

const today = new Date();

const ReleaseInfo = () => {
  // NOTE: release numbers don't correspond to dates, even if they look like it
  const release = useUniProtDataVersion();

  return (
    <span
      className={cn(
        styles['release-info'],
        helper['no-wrap'],
        blurLoading['blur-loading__item']
      )}
    >
      <span
        className={cn({ [blurLoading['blur-loading__placeholder']]: !release })}
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
      <Link to={LocationToPath[Location.UniProtKBStatistics]}>Statistics</Link>
    </span>
  );
};

export default ReleaseInfo;
