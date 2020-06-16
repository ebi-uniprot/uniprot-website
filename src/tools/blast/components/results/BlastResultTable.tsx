/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import ProtvistaTrack from 'protvista-track';
import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';

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
    <Fragment>
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
      {hspsOrderedByScore.length > 1 && collapsed && (
        <small>
          <button type="button" onClick={() => setCollapsed(false)}>{`+${
            hspsOrderedByScore.length - 1
          } more`}</button>
        </small>
      )}
    </Fragment>
  );
};

const BlastResultTable: FC<{ data: BlastResults }> = ({ data }) => {
  if (!data) {
    return null;
  }
  loadWebComponent('protvista-track', ProtvistaTrack);

  return (
    <Fragment>
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table__header-cell">Accession</th>
            <th className="data-table__header-cell">Gene</th>
            <th className="data-table__header-cell">Organism</th>
            <th className="data-table__header-cell">Alignment</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.hits &&
            data.hits.map((hit: BlastHit) => {
              const {
                hit_acc,
                hit_hsps,
                hit_uni_gn,
                hit_uni_os,
                hit_uni_ox,
              } = hit;
              return (
                <tr key={hit_acc}>
                  <td className="data-table__cell">
                    <Link to={`/uniprotkb/${hit_acc}`}>{hit_acc}</Link>
                  </td>
                  <td className="data-table__cell">{hit_uni_gn}</td>
                  <td className="data-table__cell">
                    <Link to={`/taxonomy/${hit_uni_ox}`}>{hit_uni_os}</Link>
                  </td>
                  <td className="data-table__cell data-table__blast-hsp">
                    <BlastSummaryHsps hsps={hit_hsps} length={data.query_len} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BlastResultTable;
