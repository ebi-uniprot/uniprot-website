import { CSSProperties } from 'react';

import { formatPercentage as fp } from '../../shared/utils/utils';

import { BuscoReport } from '../adapters/proteomesConverter';

import styles from './styles/busco.module.scss';

interface Style extends CSSProperties {
  '--s': string;
  '--d': string;
  '--f': string;
}

const getPercentageOfTotal = (total: number) => (x: number) =>
  (100 * x) / total;

const BuscoView = ({ report }: { report: BuscoReport }) => {
  const getPercentage = getPercentageOfTotal(report.total);
  const c = getPercentage(report.complete);
  const s = getPercentage(report.completeSingle);
  const d = getPercentage(report.completeDuplicated);
  const f = getPercentage(report.fragmented);
  const m = getPercentage(report.missing);

  const cssProperties: Style = {
    '--s': `${s}%`,
    '--d': `${d}%`,
    '--f': `${f}%`,
  };

  return (
    <div className={styles['busco-view']}>
      <div className={styles['busco-view__track']} style={cssProperties} />
      {/* TODO: add after implementation from backend - the creation date of the dataset (format: 2019-01-04) */}
      <div
        className={styles['busco-view__report']}
      >{`n:${report.total} · ${report.lineageDb}`}</div>
      <div>{`C:${fp(c)} (S:${fp(s)} D:${fp(d)}) F:${fp(f)} M:${fp(m)}`}</div>
    </div>
  );
};

export default BuscoView;
