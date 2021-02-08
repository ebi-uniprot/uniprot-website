import {
  BuscoPartition,
  buscoPartitions,
  buscoPartitionToColor,
} from './BuscoView';

import './styles/busco-label.scss';

const buscoPartitionToLabel: Record<BuscoPartition, string> = {
  completeSingle: 'Single',
  completeDuplicated: 'Duplicated',
  fragmented: 'Fragmented',
  missing: 'Missing',
};

const BuscoLabel = () => (
  <>
    <abbr title="Benchmarking Universal Single-Copy Orthologs">BUSCO</abbr>
    <div>
      {buscoPartitions.map((partition) => (
        <span key={partition} className="busco-legend-item">
          <span
            className="busco-legend-item__swatch"
            style={{
              backgroundColor: buscoPartitionToColor[partition],
            }}
          />
          {buscoPartitionToLabel[partition]}
        </span>
      ))}
    </div>
  </>
);

export default BuscoLabel;
