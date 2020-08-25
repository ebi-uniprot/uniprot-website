/* eslint-disable camelcase */
import React, { FC, useCallback, useState, useRef, useMemo } from 'react';
import { DataTable, DENSITY_COMPACT, Chip, Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';

import { ReviewedUnreviewed } from '../../../../uniprotkb/components/protein-data-views/UniProtKBTitle';

import useStaggeredRenderingHelper from '../../../../shared/hooks/useStaggeredRenderingHelper';

import { loadWebComponent } from '../../../../shared/utils/utils';

import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { HSPDetailPanelProps } from './HSPDetailPanel';
import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/BlastResultTable.scss';

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
                key={`hsp_${hsp.hsp_num}`}
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

  const nItemsToRender = useStaggeredRenderingHelper(
    hitsRef.current.length
      ? { first: 25, max: hitsRef.current.length }
      : undefined
  );

  // The "query" column header
  const queryColumnHeaderRef = useCallback(
    (node) => {
      if (node && data) {
        const { query_len } = data;
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: 1,
            end: query_len,
          },
        ];
      }
    },
    [data]
  );

  loadWebComponent('protvista-track', ProtvistaTrack);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  const queryLen = data?.query_len;
  const columns = useMemo(() => {
    if (queryLen === undefined) {
      return [];
    }
    return [
      {
        label: 'Accession',
        name: 'accession',
        render: ({ hit_acc, hit_db }: BlastHit) => {
          let reviewImg;
          switch (hit_db) {
            case 'SP':
              reviewImg = <ReviewedUnreviewed entryType={EntryType.REVIEWED} />;
              break;
            case 'TR':
              reviewImg = (
                <ReviewedUnreviewed entryType={EntryType.UNREVIEWED} />
              );
              break;
            default:
              reviewImg = null;
          }
          return (
            <Link to={`/uniprotkb/${hit_acc}`}>
              {reviewImg}
              {hit_acc}
            </Link>
          );
        },
        width: '8rem',
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
        label: (
          <div className="query-sequence-wrapper">
            <protvista-navigation
              ref={queryColumnHeaderRef}
              length={queryLen}
              height={10}
              title="Query"
            />
          </div>
        ),
        name: 'alignment',
        width: '40vw',
        render: ({ hit_hsps, hit_len, hit_acc }: BlastHit) => (
          <BlastSummaryHsps
            hsps={hit_hsps}
            queryLength={queryLen}
            hitLength={hit_len}
            hitAccession={hit_acc}
            setHspDetailPanel={setHspDetailPanel}
          />
        ),
      },
    ];
  }, [queryLen, queryColumnHeaderRef, setHspDetailPanel]);

  if (loading && !hitsRef.current.length) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={loading ? 'loading-data-table' : undefined}>
      <DataTable
        getIdKey={({ hit_acc }: { hit_acc: string }) => hit_acc}
        density={DENSITY_COMPACT}
        columns={columns}
        data={hitsRef.current.slice(0, nItemsToRender)}
        selectable
        selected={selectedEntries}
        onSelect={handleSelectedEntries}
        fixedLayout
      />
    </div>
  );
};

export default BlastResultTable;
