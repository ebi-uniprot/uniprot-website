import {
  BuscoPartition,
  buscoPartitions,
  buscoPartitionToColor,
} from './BuscoView';

import './styles/busco-legend.scss';

const buscoPartitionToLabel: Record<BuscoPartition, string> = {
  completeSingle: 'Single',
  completeDuplicated: 'Duplicated',
  fragmented: 'Fragmented',
  missing: 'Missing',
};

const BuscoLegend = () => (
  <>
    {buscoPartitions.map((partition) => (
      <span key={partition} className="busco-legend-item">
        <span
          className="busco-legend-item__swatch"
          style={{
            backgroundColor: buscoPartitionToColor[partition],
          }}
        />
        <span className="busco-legend-item__label">
          {buscoPartitionToLabel[partition]}
        </span>
      </span>
    ))}
  </>
);

export default BuscoLegend;
