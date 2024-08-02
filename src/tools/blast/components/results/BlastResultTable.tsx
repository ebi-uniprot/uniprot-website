/* eslint-disable camelcase */
import {
  useCallback,
  useState,
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { DataTable, Chip, Loader, Button } from 'franklin-sites';
import cn from 'classnames';
import { Except } from 'type-fest';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../../node_modules/franklin-sites/src/styles/colours.json';

import { HSPDetailPanelProps } from './HSPDetailPanel';

import useStaggeredRenderingHelper from '../../../../shared/hooks/useStaggeredRenderingHelper';
import useColumns, {
  ColumnDescriptor,
} from '../../../../shared/hooks/useColumns';

import { SearchableNamespace } from '../../../../shared/types/namespaces';
import { BlastResults, BlastHsp } from '../../types/blastResults';
import { EnrichedBlastHit } from './BlastResult';

import './styles/BlastResultTable.scss';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';
import NoResultsPage from '../../../../shared/components/error-pages/full-pages/NoResultsPage';
import NightingalTrackComponent from '../../../../shared/custom-elements/NightingaleTrack';
import NightingaleNavigationComponent from '../../../../shared/custom-elements/NightingaleNavigation';

const scoringDict: Partial<Record<keyof BlastHsp, string>> = {
  hsp_identity: 'Identity',
  hsp_score: 'Score',
  hsp_expect: 'E-value',
};

const scoringColorDict: Partial<Record<keyof BlastHsp, string>> = {
  hsp_identity: colors.sapphireBlue,
  hsp_score: colors.coyoteBrown,
  hsp_expect: colors.outerSpace,
};

type TrackNodeData = {
  start: number;
  end: number;
  color: string | undefined;
  shape?: string;
  opacity?: number;
};

type BlastSummaryTrackProps = {
  hsp: BlastHsp;
  queryLength: number;
  hitLength: number;
  setHspDetailPanel: (props: Except<HSPDetailPanelProps, 'namespace'>) => void;
  hitAccession: string;
  selectedScoring: keyof BlastHsp;
  setSelectedScoring: Dispatch<SetStateAction<keyof BlastHsp>>;
  maxScorings: Partial<Record<keyof BlastHsp, number>>;
};

const BlastSummaryTrack = ({
  hsp,
  queryLength,
  hitLength,
  setHspDetailPanel,
  hitAccession,
  selectedScoring,
  setSelectedScoring,
  maxScorings,
}: BlastSummaryTrackProps) => {
  const { hsp_query_from, hsp_query_to } = hsp;

  const setTrackData = useCallback(
    (node: { data: TrackNodeData[] }): void => {
      if (node) {
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
            case 'hsp_score':
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
    [hsp, selectedScoring, hitLength, maxScorings]
  );

  return (
    <div className="data-table__blast-hsp__tracks">
      <section className="data-table__blast-hsp__blast-track">
        <NightingalTrackComponent
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

type BlastSummaryHspsProps = {
  hsps: BlastHsp[];
  queryLength: number;
  hitLength: number;
  hitAccession: string;
  setHspDetailPanel: (props: Except<HSPDetailPanelProps, 'namespace'>) => void;
  selectedScoring: keyof BlastHsp;
  setSelectedScoring: Dispatch<SetStateAction<keyof BlastHsp>>;
  maxScorings: Partial<Record<keyof BlastHsp, number>>;
};

const BlastSummaryHsps = ({
  hsps,
  queryLength,
  hitLength,
  setHspDetailPanel,
  hitAccession,
  selectedScoring,
  setSelectedScoring,
  maxScorings,
}: BlastSummaryHspsProps) => {
  const [restVisible, setRestVisible] = useState(0);

  // "first", ordered by score
  const [first, ...rest] = useMemo<BlastHsp[]>(
    () =>
      // Operate on a copy to not mutate the original data
      Array.from(hsps).sort((hspA, hspB) => hspB.hsp_score - hspA.hsp_score),
    [hsps]
  );

  return (
    <div className="data-table__blast-hsp">
      <div>
        <BlastSummaryTrack
          hsp={first}
          queryLength={queryLength}
          hitLength={hitLength}
          hitAccession={hitAccession}
          setHspDetailPanel={setHspDetailPanel}
          selectedScoring={selectedScoring}
          setSelectedScoring={setSelectedScoring}
          maxScorings={maxScorings}
        />
        {rest.slice(0, restVisible).map((hsp) => (
          <BlastSummaryTrack
            hsp={hsp}
            queryLength={queryLength}
            hitLength={hitLength}
            key={`hsp_${hsp.hsp_num}`}
            hitAccession={hitAccession}
            setHspDetailPanel={setHspDetailPanel}
            selectedScoring={selectedScoring}
            setSelectedScoring={setSelectedScoring}
            maxScorings={maxScorings}
          />
        ))}
      </div>
      {restVisible < rest.length && (
        <Button
          variant="tertiary"
          onClick={() => setRestVisible((restVisible) => restVisible + 10)}
        >{`+${rest.length - restVisible} more`}</Button>
      )}
    </div>
  );
};

type QueryNodeData = { start: number; end: number };

type BlastResultTableProps = {
  data: BlastResults | null;
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void;
  setHspDetailPanel: (props: Except<HSPDetailPanelProps, 'namespace'>) => void;
  loading: boolean;
  namespace: SearchableNamespace;
};

type BlastTableResultsData = EnrichedBlastHit &
  (UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel);

const BlastResultTable = ({
  data,
  setSelectedItemFromEvent,
  setHspDetailPanel,
  loading,
  namespace,
}: BlastResultTableProps) => {
  // logic to keep stale data available
  const hitsRef = useRef<BlastTableResultsData[]>([]);

  const [selectedScoring, setSelectedScoring] =
    useState<keyof BlastHsp>('hsp_identity');

  if (!loading) {
    const hits = data?.hits.map((hit: EnrichedBlastHit) => {
      const merge = { ...hit, ...hit.extra }; // For the respective column renderers to fetch the fields
      return merge;
    }) as BlastTableResultsData[] | undefined;
    hitsRef.current = hits || [];
  }

  const nItemsToRender = useStaggeredRenderingHelper(
    hitsRef.current.length
      ? { first: 25, max: hitsRef.current.length }
      : undefined
  );

  const maxScorings = useMemo<Partial<Record<keyof BlastHsp, number>>>(() => {
    if (!data?.hits) {
      return { hsp_identity: 100, hsp_score: 1, hsp_expect: 1 };
    }
    const output = {
      hsp_identity: -Infinity,
      hsp_score: -Infinity,
      hsp_expect: -Infinity,
    };
    for (const hit of data.hits) {
      for (const hsp of hit.hit_hsps) {
        if (output.hsp_identity < hsp.hsp_identity) {
          output.hsp_identity = hsp.hsp_identity;
        }
        if (output.hsp_score < hsp.hsp_score) {
          output.hsp_score = hsp.hsp_score;
        }
        if (output.hsp_expect < hsp.hsp_expect) {
          output.hsp_expect = hsp.hsp_expect;
        }
      }
    }
    return output;
  }, [data]);

  const queryLen = data?.query_len;

  const [columns] = useColumns(namespace);
  // Disable sorting, as we want to keep the BLAST sorting (for now...);
  // If anything, we might want to sort by BLAST result values before anything
  const columnsByNamespace = columns?.map(({ sortable, ...column }) => column);

  const trackColumn = {
    label: (
      <div className="query-sequence-wrapper">
        <NightingaleNavigationComponent
          length={queryLen}
          title="Query"
          height={40}
          margin-left={0}
          margin-right={0}
        />
      </div>
    ),
    name: 'alignment',
    width: '40vw',
    render: (hit: EnrichedBlastHit) => (
      <BlastSummaryHsps
        hsps={hit.hit_hsps}
        queryLength={queryLen || 0}
        hitLength={hit.hit_len}
        hitAccession={hit.hit_acc}
        setHspDetailPanel={setHspDetailPanel}
        selectedScoring={selectedScoring}
        setSelectedScoring={setSelectedScoring}
        maxScorings={maxScorings}
      />
    ),
  };

  const cols: ColumnDescriptor<BlastTableResultsData>[] = [
    ...(columnsByNamespace || []),
    trackColumn,
  ];

  if (loading && !hitsRef.current.length) {
    return <Loader />;
  }

  if (!hitsRef.current.length) {
    return <NoResultsPage />;
  }

  return (
    <DataTable
      className={loading ? 'loading-data-table' : undefined}
      getIdKey={({ hit_acc }) => hit_acc}
      density="compact"
      columns={cols}
      data={hitsRef.current.slice(0, nItemsToRender)}
      onSelectionChange={setSelectedItemFromEvent}
    />
  );
};

export default BlastResultTable;
