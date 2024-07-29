import { CSSProperties, useMemo } from 'react';

import { formatPercentage } from '../../shared/utils/utils';

import { BuscoReport } from '../adapters/proteomesConverter';

import styles from './styles/busco-view.module.scss';

interface Style extends CSSProperties {
  '--s': string;
  '--d': string;
  '--f': string;
}

const getPercentageOfTotal = (total: number) => (x: number) =>
  (100 * x) / total;

const BuscoView = ({ report }: { report: BuscoReport }) => {
  const [cssProperties, formattedPercentages] = useMemo(() => {
    const getPercentage = getPercentageOfTotal(report.total);
    const percentages = {
      c: getPercentage(report.complete),
      s: getPercentage(report.completeSingle),
      d: getPercentage(report.completeDuplicated),
      f: getPercentage(report.fragmented),
      m: getPercentage(report.missing),
    };
    const cssProperties: Style = {
      '--s': `${percentages.s}%`,
      '--d': `${percentages.d}%`,
      '--f': `${percentages.f}%`,
    };
    const formattedPercentages = {
      c: formatPercentage(percentages.c),
      s: formatPercentage(percentages.s),
      d: formatPercentage(percentages.d),
      f: formatPercentage(percentages.f),
      m: formatPercentage(percentages.m),
    };
    return [cssProperties, formattedPercentages];
  }, [report]);

  return (
    <div className={styles['busco-view']}>
      <div className={styles['busco-view__track']} style={cssProperties} />
      {/* TODO: add after implementation from backend - the creation date of the dataset (format: 2019-01-04) */}
      <div
        className={styles['busco-view__report']}
      >{`n:${report.total} · ${report.lineageDb}`}</div>
      <div>{`C:${formattedPercentages.c} (S:${formattedPercentages.s} D:${formattedPercentages.d}) F:${formattedPercentages.f} M:${formattedPercentages.m}`}</div>
    </div>
  );
};

export default BuscoView;
