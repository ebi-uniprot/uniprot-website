import { Loader } from 'franklin-sites';
import cn from 'classnames';
import { SetRequired } from 'type-fest';

import useDataApi from '../../../shared/hooks/useDataApi';

import apiUrls from '../../../shared/config/apiUrls';
import ftpUrls from '../../../shared/config/ftpUrls';

import {
  ProteomesUIModel,
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import { Namespace } from '../../../shared/types/namespaces';

import styles from '../../../shared/styles/blur-loading.module.scss';

type PanProteomeProps = SetRequired<
  Pick<ProteomesUIModel, 'panproteome' | 'id' | 'taxonomy'>,
  'panproteome'
>;

export const PanProteome = ({
  panproteome,
  id,
  taxonomy,
}: PanProteomeProps) => {
  const entryIsPanProteome = id === panproteome;
  const { data: panProteomeData, loading } = useDataApi<ProteomesAPIModel>(
    entryIsPanProteome ? null : apiUrls.entry(id, Namespace.proteomes)
  );

  const name =
    // If loading, use current proteomes scientificName as a placeholder
    ((loading || entryIsPanProteome) && taxonomy?.scientificName) ||
    // At this point, the entry is not the pan proteome so try the loaded data
    panProteomeData?.taxonomy.scientificName ||
    // As a last resort fall back on the panproteome ID which we know must exist
    panproteome;

  return (
    <>
      {'This proteome is part of the '}
      <span className={styles['blur-loading']}>
        <span
          className={cn(
            { [styles['blur-loading__placeholder']]: loading },
            styles['blur-loading__item']
          )}
        >
          {name}
        </span>
      </span>
      {' pan proteome ('}
      <a href={ftpUrls.panProteomes(panproteome)}>FASTA</a>)
    </>
  );
};
