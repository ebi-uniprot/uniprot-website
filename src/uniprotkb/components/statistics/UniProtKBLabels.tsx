import { SwissProtIcon, TremblIcon } from 'franklin-sites';

import styles from './styles/uniprotkb-labels.module.scss';

export const ReviewedLabel = () => (
  <>
    <SwissProtIcon width="1em" className={styles['reviewed-icon']} /> Reviewed
    (Swiss-Prot)
  </>
);

export const UnreviewedLabel = () => (
  <>
    <TremblIcon width="1em" className={styles['unreviewed-icon']} />
    Unreviewed (TrEMBL)
  </>
);
