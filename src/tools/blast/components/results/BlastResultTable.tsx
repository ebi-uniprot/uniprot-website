/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, Fragment, useCallback, useState, useRef } from 'react';
import { DataTable, DENSITY_COMPACT, Chip, Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';
import ProtvistaTrack from 'protvista-track';
import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';

import './styles/BlastResultTable.scss';
import { HSPDetailPanelProps } from './HSPDetailPanel';

const BlastSummaryTrack: FC<{
  hsp: BlastHsp;
  queryLength: number;
  hitLength: number;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
  hitAccession: string;
}> = ({ hsp, queryLength, hitLength, setHspDetailPanel, hitAccession }) => {
  const {
    hsp_query_from,
    hsp_query_to,
    hsp_identity,
    hsp_bit_score,
    hsp_expect,
  } = hsp;

  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        /**
         * TODO - would be nice to add gaps
         * at some point
         */
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: 1,
            end: hsp_query_from,
            shape: 'line',
            color: '#014371',
            opacity: hsp_identity / 100,
          },
          {
            start: hsp_query_from,
            end: hsp_query_to,
            // franklin $colour-sapphire-blue
            color: '#014371',
            opacity: hsp_identity / 100,
          },
          {
            start: hsp_query_to,
            end: hitLength > hsp_query_to ? hitLength : hsp_query_to,
            shape: 'line',
            color: '#014371',
            opacity: hsp_identity / 100,
          },
        ];
      }
    },
    [hsp_query_from, hsp_query_to, hsp_identity, hitLength]
  );

  return (
    <div className="data-table__blast-hsp__tracks">
      <section className="data-table__blast-hsp__blast-track">
        <protvista-track
          data-testid="blast-summary-track"
          length={queryLength}
          height={10}
          ref={setTrackData}
          title={`Start: ${hsp_query_from}\nEnd: ${hsp_query_to}\nHit Length: ${hitLength}`}
          onClick={() => {
            setHspDetailPanel({
              hsp,
              hitAccession,
              onClose: () => null,
              queryLength,
              hitLength,
            });
          }}
        />
      </section>
      <span className="data-table__blast-hsp__blast-params">
        <Chip compact title="Identity">{`${hsp_identity}%`}</Chip>
        <Chip compact title="Score">{`${hsp_bit_score}`}</Chip>
        <Chip compact title="e-value">{`${hsp_expect}`}</Chip>
      </span>
    </div>
  );
};

const BlastSummaryHsps: FC<{
  hsps: BlastHsp[];
  queryLength: number;
  hitLength: number;
  hitAccession: string;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
}> = ({ hsps, queryLength, hitLength, setHspDetailPanel, hitAccession }) => {
  const [collapsed, setCollapsed] = useState(true);

  const hspsOrderedByScore = hsps.sort(
    (hspA, hspB) => hspB.hsp_bit_score - hspA.hsp_bit_score
  );

  return (
    <div className="data-table__blast-hsp">
      <div>
        <BlastSummaryTrack
          hsp={hspsOrderedByScore[0]}
          queryLength={queryLength}
          hitLength={hitLength}
          hitAccession={hitAccession}
          setHspDetailPanel={setHspDetailPanel}
        />
        {hspsOrderedByScore.length > 1 &&
          !collapsed &&
          hspsOrderedByScore
            .slice(1)
            .map((hsp) => (
              <BlastSummaryTrack
                hsp={hsp}
                queryLength={queryLength}
                hitLength={hitLength}
                key={`${hsp.hsp_hit_from}-${hsp.hsp_hit_to}`}
                hitAccession={hitAccession}
                setHspDetailPanel={setHspDetailPanel}
              />
            ))}
      </div>
      {hspsOrderedByScore.length > 1 && collapsed && (
        <button type="button" onClick={() => setCollapsed(false)}>{`+${
          hspsOrderedByScore.length - 1
        } more`}</button>
      )}
    </div>
  );
};

const BlastResultTable: FC<{
  data: BlastResults | null;
  selectedEntries: string[];
  handleSelectedEntries: (rowId: string) => void;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
  loading: boolean;
}> = ({
  data,
  selectedEntries,
  handleSelectedEntries,
  setHspDetailPanel,
  loading,
}) => {
  // logic to keep stale data available
  const hitsRef = useRef<BlastHit[]>([]);
  if (data?.hits.length || !loading) {
    hitsRef.current = data?.hits || [];
  }

  if (loading && !hitsRef.current.length) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }
  loadWebComponent('protvista-track', ProtvistaTrack);

  const columns = [
    {
      label: 'Accession',
      name: 'accession',
      render: ({ hit_acc }: BlastHit) => (
        <Link to={`/uniprotkb/${hit_acc}`}>{hit_acc}</Link>
      ),
      width: '5rem',
    },
    {
      label: 'Gene',
      name: 'gene',
      render: ({ hit_uni_gn }: BlastHit) => hit_uni_gn,
      width: '5rem',
    },
    {
      label: 'Protein',
      name: 'protein_name',
      render: ({ hit_uni_de }: BlastHit) => hit_uni_de,
      ellipsis: true,
    },
    {
      label: 'Organism',
      name: 'organism',
      render: ({ hit_uni_ox, hit_uni_os }: BlastHit) => (
        <Link to={`/taxonomy/${hit_uni_ox}`}>{hit_uni_os}</Link>
      ),
      ellipsis: true,
    },
    {
      label: 'Alignment',
      name: 'alignment',
      width: '40vw',
      render: ({ hit_hsps, hit_len, hit_acc }: BlastHit) => (
        <BlastSummaryHsps
          hsps={hit_hsps}
          queryLength={data.query_len}
          hitLength={hit_len}
          hitAccession={hit_acc}
          setHspDetailPanel={setHspDetailPanel}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <DataTable
        getIdKey={({ hit_acc }: { hit_acc: string }) => hit_acc}
        density={DENSITY_COMPACT}
        columns={columns}
        data={hitsRef.current}
        selectable
        selected={selectedEntries}
        onSelect={handleSelectedEntries}
        fixedLayout
      />
    </Fragment>
  );
};

export default BlastResultTable;
