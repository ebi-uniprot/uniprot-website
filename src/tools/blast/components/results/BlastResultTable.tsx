/* eslint-disable camelcase */
import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { DataTable, DENSITY_COMPACT, Chip, Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import colors from '../../../../../node_modules/franklin-sites/src/styles/colours.json';

import { EnrichedBlastHit } from './BlastResult';

import useStaggeredRenderingHelper from '../../../../shared/hooks/useStaggeredRenderingHelper';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { HSPDetailPanelProps } from './HSPDetailPanel';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/BlastResultTable.scss';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';

const scoringDict: Partial<Record<keyof BlastHsp, string>> = {
  hsp_identity: 'Identity',
  hsp_bit_score: 'Score',
  hsp_expect: 'E-value',
};

const scoringColorDict: Partial<Record<keyof BlastHsp, string>> = {
  hsp_identity: colors.sapphireBlue,
  hsp_bit_score: colors.coyoteBrown,
  hsp_expect: colors.outerSpace,
};

const BlastSummaryTrack: FC<{
  hsp: BlastHsp;
  extra?: UniProtkbAPIModel;
  queryLength: number;
  hitLength: number;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
  hitAccession: string;
  selectedScoring: keyof BlastHsp;
  setSelectedScoring: Dispatch<SetStateAction<keyof BlastHsp>>;
  maxScorings: Partial<Record<keyof BlastHsp, number>>;
}> = ({
  hsp,
  queryLength,
  hitLength,
  setHspDetailPanel,
  hitAccession,
  extra,
  selectedScoring,
  setSelectedScoring,
  maxScorings,
}) => {
  const { hsp_query_from, hsp_query_to } = hsp;

  const ceDefined = useCustomElement(
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && ceDefined) {
        /**
         * TODO - would be nice to add gaps
         * at some point
         */
        let opacity = +hsp[selectedScoring];
        const max = maxScorings[selectedScoring];
        if (max !== undefined) {
          switch (selectedScoring) {
            case 'hsp_expect':
              // invert scale and rescale for e-value
              opacity = 1 - +hsp[selectedScoring] / (2 * max);
              break;
            case 'hsp_identity':
              // rescale for percents
              opacity /= 100;
              break;
            case 'hsp_bit_score':
              opacity /= max;
              break;
            default:
            //
          }
        }
        const color = scoringColorDict[selectedScoring];
        // eslint-disable-next-line no-param-reassign
        node.data = [
          {
            start: 1,
            end: hsp.hsp_query_from,
            shape: 'line',
            color,
          },
          {
            start: hsp.hsp_query_from,
            end: hsp.hsp_query_to,
            color,
            opacity,
          },
          {
            start: hsp.hsp_query_to,
            end: hitLength > hsp.hsp_query_to ? hitLength : hsp.hsp_query_to,
            shape: 'line',
            color,
          },
        ];
      }
    },
    [ceDefined, hsp, selectedScoring, hitLength, maxScorings]
  );

  return (
    <div className="data-table__blast-hsp__tracks">
      <section className="data-table__blast-hsp__blast-track">
        <protvista-track
          data-testid="blast-summary-track"
          length={queryLength}
          height={10}
          ref={setTrackData}
          title={`Start: ${hsp_query_from}\nEnd: ${hsp_query_to}\nHit length: ${hitLength}`}
          onClick={() => {
            setHspDetailPanel({
              hsp,
              hitAccession,
              onClose: () => null,
              queryLength,
              hitLength,
              extra,
            });
          }}
        />
      </section>
      <span className="data-table__blast-hsp__blast-params">
        {Object.entries(scoringDict).map(([key, title]) => (
          <Chip
            key={key}
            compact
            title={title}
            className={cn(
              key,
              key === selectedScoring ? 'primary' : 'secondary'
            )}
            onClick={() => setSelectedScoring(key as keyof BlastHsp)}
          >
            {`${hsp[key as keyof BlastHsp]}${
              key === 'hsp_identity' ? '%' : ''
            }`}
          </Chip>
        ))}
      </span>
    </div>
  );
};

const BlastSummaryHsps: FC<{
  hsps: BlastHsp[];
  queryLength: number;
  hitLength: number;
  hitAccession: string;
  extra?: UniProtkbAPIModel;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
  selectedScoring: keyof BlastHsp;
  setSelectedScoring: Dispatch<SetStateAction<keyof BlastHsp>>;
  maxScorings: Partial<Record<keyof BlastHsp, number>>;
}> = ({
  hsps,
  queryLength,
  hitLength,
  setHspDetailPanel,
  hitAccession,
  extra,
  selectedScoring,
  setSelectedScoring,
  maxScorings,
}) => {
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
          extra={extra}
          setHspDetailPanel={setHspDetailPanel}
          selectedScoring={selectedScoring}
          setSelectedScoring={setSelectedScoring}
          maxScorings={maxScorings}
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
                extra={extra}
                setHspDetailPanel={setHspDetailPanel}
                selectedScoring={selectedScoring}
                setSelectedScoring={setSelectedScoring}
                maxScorings={maxScorings}
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

  const [selectedScoring, setSelectedScoring] = useState<keyof BlastHsp>(
    'hsp_identity'
  );

  if (data?.hits.length) {
    hitsRef.current = data?.hits || [];
  }

  const nItemsToRender = useStaggeredRenderingHelper(
    hitsRef.current.length
      ? { first: 25, max: hitsRef.current.length }
      : undefined
  );

  const ceDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );

  // The "query" column header
  const queryColumnHeaderRef = useCallback(
    (node) => {
      if (node && ceDefined && data) {
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
    [data, ceDefined]
  );

  const maxScorings: Partial<Record<keyof BlastHsp, number>> = useMemo(
    () => ({
      hsp_identity: Math.max(
        ...(data?.hits.flatMap((hit) =>
          hit.hit_hsps.map((hsp) => hsp.hsp_identity)
        ) ?? [100])
      ),
      hsp_bit_score: Math.max(
        ...(data?.hits.flatMap((hit) =>
          hit.hit_hsps.map((hsp) => hsp.hsp_bit_score)
        ) ?? [1])
      ),
      hsp_expect: Math.max(
        ...(data?.hits.flatMap((hit) =>
          hit.hit_hsps.map((hsp) => hsp.hsp_expect)
        ) ?? [1])
      ),
    }),
    [data]
  );

  const queryLen = data?.query_len;
  const columns = useMemo(() => {
    if (queryLen === undefined) {
      return [];
    }
    return [
      {
        label: 'Accession',
        name: 'accession',
        render: ({ hit_acc, hit_db }: BlastHit) => (
          <Link to={`/uniprotkb/${hit_acc}`}>
            <EntryTypeIcon entryType={hit_db} />
            {hit_acc}
          </Link>
        ),
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
              title="Query"
            />
          </div>
        ),
        name: 'alignment',
        width: '40vw',
        render: ({ hit_hsps, hit_len, hit_acc, extra }: EnrichedBlastHit) => (
          <BlastSummaryHsps
            hsps={hit_hsps}
            queryLength={queryLen}
            hitLength={hit_len}
            hitAccession={hit_acc}
            setHspDetailPanel={setHspDetailPanel}
            extra={extra}
            selectedScoring={selectedScoring}
            setSelectedScoring={setSelectedScoring}
            maxScorings={maxScorings}
          />
        ),
      },
    ];
  }, [
    queryLen,
    queryColumnHeaderRef,
    setHspDetailPanel,
    selectedScoring,
    maxScorings,
  ]);

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
        scrollDataAttribute="sidebar-content"
      />
    </div>
  );
};

export default BlastResultTable;
