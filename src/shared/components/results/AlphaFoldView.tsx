import { Link } from 'react-router-dom';
import { ErrorIcon, SpinnerIcon, SuccessIcon } from 'franklin-sites';
import cn from 'classnames';

import useDataApi from '../../hooks/useDataApi';

import { getEntryPathFor } from '../../../app/config/urls';

import EntrySection from '../../../uniprotkb/types/entrySection';
import { Namespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';
import styles from './styles/accession-view.module.scss';

const getEntryPathForUniProtKB = getEntryPathFor(Namespace.uniprotkb);

const AlphaFoldView = ({ accession }: { accession: string }) => {
  const { loading, status } = useDataApi(
    `https://alphafold.ebi.ac.uk/api/prediction/${accession}`
  );

  let title = 'Loading prediction';
  let icon = <SpinnerIcon width="2ch" />;
  if (!loading) {
    if (status === 200) {
      title = `AlphaFold prediction available for ${accession}`;
      icon = <SuccessIcon width="2ch" style={{ marginInlineStart: '0.5ch' }} />;
    } else {
      title = `No AlphaFold prediction available for ${accession} at the moment`;
      icon = <ErrorIcon width="2ch" />;
    }
  }

  if (!loading && status === 200) {
    return (
      <Link
        to={{
          pathname: getEntryPathForUniProtKB(accession),
          hash: EntrySection.Structure,
        }}
        className={cn(helper['no-wrap'], styles['accession-view'])}
        style={{
          color: '#3b6fb6',
          fontWeight: 600,
          fontFamily: '"IBM Plex Sans", Helvetica, Arial, sans-serif',
        }}
        title={title}
      >
        AlphaFold {icon}
      </Link>
    );
  }

  return (
    <span
      className={cn(helper['no-wrap'], styles['accession-view'])}
      title={title}
      style={{
        color: 'gray',
        fontWeight: 600,
        fontFamily: '"IBM Plex Sans", Helvetica, Arial, sans-serif',
      }}
    >
      AlphaFold&nbsp;{icon}
    </span>
  );
};

export default AlphaFoldView;
