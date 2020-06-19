/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, Fragment, useCallback, useState } from 'react';
import { DataTable, DENSITY_COMPACT } from 'franklin-sites';
import { Link } from 'react-router-dom';
import ProtvistaTrack from 'protvista-track';
import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';

import '../styles/BlastResultTable.scss';

const BlastSummaryTrack: FC<{
  hsp: BlastHsp;
  length: number;
}> = ({ hsp, length }) => {
  const { hsp_query_from, hsp_query_to, hsp_identity } = hsp;

  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: hsp_query_from,
            end: hsp_query_to,
            // franklin $colour-sapphire-blue
            color: '#014371',
            opacity: hsp_identity / 100,
          },
        ];
      }
    },
    [hsp_query_from, hsp_query_to, hsp_identity]
  );

  return (
    <protvista-track
      data-testid="blast-summary-track"
      length={length}
      height={10}
      ref={setTrackData}
      title={`Start: ${hsp_query_from}\nEnd: ${hsp_query_to}\nIdentity: ${hsp_identity}%`}
    />
  );
};

const BlastSummaryHsps: FC<{ hsps: BlastHsp[]; length: number }> = ({
  hsps,
  length,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const hspsOrderedByScore = hsps.sort(
    (hspA, hspB) => hspB.hsp_bit_score - hspA.hsp_bit_score
  );

  return (
    <div className="data-table__blast-hsp">
      <div className="data-table__blast-hsp__tracks">
        <BlastSummaryTrack hsp={hspsOrderedByScore[0]} length={length} />
        {hspsOrderedByScore.length > 1 &&
          !collapsed &&
          hspsOrderedByScore
            .slice(1)
            .map((hsp) => (
              <BlastSummaryTrack
                hsp={hsp}
                length={length}
                key={`${hsp.hsp_hit_from}-${hsp.hsp_hit_to}`}
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
  data: BlastResults;
  selectedEntries: string[];
  handleSelectedEntries: (rowId: string) => void;
}> = ({ data, selectedEntries, handleSelectedEntries }) => {
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
    },
    {
      label: 'Gene',
      name: 'gene',
      render: ({ hit_uni_gn }: BlastHit) => hit_uni_gn,
    },
    {
      label: 'Organism',
      name: 'organism',
      render: ({ hit_uni_ox, hit_uni_os }: BlastHit) => (
        <Link to={`/taxonomy/${hit_uni_ox}`}>{hit_uni_os}</Link>
      ),
    },
    {
      label: 'Alignment',
      name: 'alignment',
      render: ({ hit_hsps }: BlastHit) => (
        <BlastSummaryHsps hsps={hit_hsps} length={data.query_len} />
      ),
    },
  ];

  return (
    <Fragment>
      <DataTable
        getIdKey={({ hit_acc }: { hit_acc: string }) => hit_acc}
        density={DENSITY_COMPACT}
        columns={columns}
        data={data.hits}
        selectable
        selected={selectedEntries}
        onSelect={handleSelectedEntries}
      />
    </Fragment>
  );
};

export default BlastResultTable;
