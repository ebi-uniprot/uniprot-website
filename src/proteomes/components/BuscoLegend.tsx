import cn from 'classnames';

import styles from './styles/busco.module.scss';

const buscoPartitionToLabel = {
  s: 'Single',
  d: 'Duplicated',
  f: 'Fragmented',
  m: 'Missing',
};

const BuscoLegend = () => (
  <>
    {Object.entries(buscoPartitionToLabel).map(([partition, label]) => (
      <span key={partition} className={styles['busco-legend-item']}>
        <span
          className={cn(
            styles['busco-legend-item__swatch'],
            styles[`busco-legend-item__swatch--${partition}`]
          )}
        />
        <span className={styles['busco-legend-item__label']}>{label}</span>
      </span>
    ))}
  </>
);

export default BuscoLegend;
