/* eslint-disable camelcase */
import {
  useCallback,
  useState,
  useRef,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { DataTable, Chip, Loader, Button } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { HSPDetailPanelProps } from './HSPDetailPanel';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';

import useStaggeredRenderingHelper from '../../../../shared/hooks/useStaggeredRenderingHelper';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import { getEntryPath } from '../../../../app/config/urls';

import {
  Namespace,
  SearchableNamespace,
} from '../../../../shared/types/namespaces';

import { EnrichedBlastHit } from './BlastResult';
import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';

import colors from '../../../../../node_modules/franklin-sites/src/styles/colours.json';
import './styles/BlastResultTable.scss';

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
  extra?: UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
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
    /* istanbul ignore next */
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
  extra?: UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
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
  const [restVisible, setRestVisible] = useState(0);

  // "first", ordered by score
  const [first, ...rest] = useMemo<BlastHsp[]>(
    () =>
      // Operate on a copy to not mutate the original data
      Array.from(hsps).sort(
        (hspA, hspB) => hspB.hsp_bit_score - hspA.hsp_bit_score
      ),
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
          extra={extra}
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
            extra={extra}
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

type ColumnRenderer = {
  label: ReactNode;
  render: (hit: BlastHit | EnrichedBlastHit) => ReactNode;
  name: string;
  width?: string;
  ellipsis?: boolean;
};

const BlastResultTable: FC<{
  data: BlastResults | null;
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void;
  setHspDetailPanel: (props: HSPDetailPanelProps) => void;
  loading: boolean;
  namespace: SearchableNamespace;
}> = ({
  data,
  setSelectedItemFromEvent,
  setHspDetailPanel,
  loading,
  namespace,
}) => {
  // logic to keep stale data available
  const hitsRef = useRef<BlastHit[]>([]);

  const [selectedScoring, setSelectedScoring] =
    useState<keyof BlastHsp>('hsp_identity');

  if (data?.hits.length) {
    hitsRef.current = data?.hits || [];
  }

  const nItemsToRender = useStaggeredRenderingHelper(
    hitsRef.current.length
      ? { first: 25, max: hitsRef.current.length }
      : undefined
  );

  const ceDefined = useCustomElement(
    /* istanbul ignore next */
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

  const maxScorings = useMemo<Partial<Record<keyof BlastHsp, number>>>(() => {
    if (!data?.hits) {
      return { hsp_identity: 100, hsp_bit_score: 1, hsp_expect: 1 };
    }
    const output = {
      hsp_identity: -Infinity,
      hsp_bit_score: -Infinity,
      hsp_expect: -Infinity,
    };
    for (const hit of data.hits) {
      for (const hsp of hit.hit_hsps) {
        if (output.hsp_identity < hsp.hsp_identity) {
          output.hsp_identity = hsp.hsp_identity;
        }
        if (output.hsp_bit_score < hsp.hsp_bit_score) {
          output.hsp_bit_score = hsp.hsp_bit_score;
        }
        if (output.hsp_expect < hsp.hsp_expect) {
          output.hsp_expect = hsp.hsp_expect;
        }
      }
    }
    return output;
  }, [data]);

  const queryLen = data?.query_len;
  const columns = useMemo<Array<ColumnRenderer>>(() => {
    if (queryLen === undefined) {
      return [];
    }
    const columns: Array<ColumnRenderer> = [];
    columns.push({
      label: 'Accession',
      name: 'accession',
      render: ({ hit_acc, hit_db }) => (
        <Link to={getEntryPath(namespace, hit_acc)}>
          <EntryTypeIcon entryType={hit_db} />
          {hit_acc}
        </Link>
      ),
    });
    if (namespace === Namespace.uniprotkb) {
      columns.push({
        label: 'Gene',
        name: 'gene',
        render: ({ hit_uni_gn }) => hit_uni_gn,
      });
      columns.push({
        label: 'Protein',
        name: 'protein',
        render: ({ hit_uni_de }) => hit_uni_de,
        ellipsis: true,
      });
      columns.push({
        label: 'Organism',
        name: 'organism',
        render: ({ hit_uni_ox, hit_uni_os }) => (
          <Link to={getEntryPath(Namespace.taxonomy, hit_uni_ox)}>
            {hit_uni_os}
          </Link>
        ),
        ellipsis: true,
      });
    } else if (namespace === Namespace.uniref) {
      columns.push({
        label: 'Cluster name',
        name: 'cluster_name',
        render: (data) =>
          'extra' in data &&
          data.extra &&
          'name' in data.extra &&
          data.extra.name.replace('Cluster: ', ''),
        ellipsis: true,
      });
      columns.push({
        label: 'Common taxon',
        name: 'common_taxon',
        render: (data) =>
          'extra' in data &&
          data.extra &&
          'commonTaxon' in data.extra && (
            <Link
              to={getEntryPath(
                Namespace.taxonomy,
                data.extra.commonTaxon.taxonId
              )}
            >
              {data.extra.commonTaxon.scientificName}
            </Link>
          ),
        ellipsis: true,
      });
    }
    columns.push({
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
      render: (hit) => (
        <BlastSummaryHsps
          hsps={hit.hit_hsps}
          queryLength={queryLen}
          hitLength={hit.hit_len}
          hitAccession={hit.hit_acc}
          setHspDetailPanel={setHspDetailPanel}
          extra={'extra' in hit ? hit.extra : undefined}
          selectedScoring={selectedScoring}
          setSelectedScoring={setSelectedScoring}
          maxScorings={maxScorings}
        />
      ),
    });

    return columns;
  }, [
    queryLen,
    queryColumnHeaderRef,
    setHspDetailPanel,
    selectedScoring,
    maxScorings,
    namespace,
  ]);

  if (loading && !hitsRef.current.length) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <DataTable
      className={loading ? 'loading-data-table' : undefined}
      getIdKey={({ hit_acc }) => hit_acc}
      density="compact"
      columns={columns}
      data={hitsRef.current.slice(0, nItemsToRender)}
      onSelectionChange={setSelectedItemFromEvent}
      fixedLayout
    />
  );
};

export default BlastResultTable;
