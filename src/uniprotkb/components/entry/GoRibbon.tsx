import '@geneontology/web-components/go-annotation-ribbon-strips';

import cn from 'classnames';
import { Loader } from 'franklin-sites';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import TableFromData, {
  type TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import externalUrls from '../../../shared/config/externalUrls';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';
import { type TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  type GoTerm,
  type GOTermID,
  type GroupedGoTerms,
} from '../../adapters/functionConverter';
import { type GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';
import {
  type AGRRibbonGroup,
  type AGRRibbonSubject,
  getCategories,
  getSubjects,
  useGOData,
} from '../../adapters/slimming/GORibbonHandler';
import { type UniProtKBSimplifiedTaxonomy } from '../../adapters/uniProtkbConverter';
import { hasProtNLM2Evidence } from '../../utils/protnlm';
import GOTermEvidenceTag from '../protein-data-views/GOTermEvidenceTag';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';
import styles from './styles/go-ribbon.module.scss';

const useColumns = () => {
  const databaseInfoMaps = useDatabaseInfoMaps();

  const columns: TableFromDataColumn<GoTerm>[] = [
    {
      id: 'aspect',
      label: 'Aspect',
      render: (data) => data.aspect,
    },
    {
      id: 'term',
      label: 'Term',
      render: (data) => (
        <span
          className={cn({
            'ai-annotation-row': hasProtNLM2Evidence(data.evidences),
          })}
        >
          <ExternalLink
            url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', {
              id: data.id,
            })}
          >
            {data.termDescription || data.id}
          </ExternalLink>
          <GOTermEvidenceTag evidence={data.properties?.GoEvidenceType} />
          <UniProtKBEvidenceTag evidences={data.evidences} goTermEvidence />
        </span>
      ),
    },
  ];

  return columns;
};

const getRowId = (data: GoTerm) => data.id;

type CellClick = {
  detail: {
    group: AGRRibbonGroup;
    subjects: AGRRibbonSubject[];
  };
};

type GroupClick = {
  detail: {
    group: AGRRibbonGroup;
    subjects: AGRRibbonSubject[];
  };
};

type GoRibbonProps = {
  primaryAccession: string;
  goTerms?: GroupedGoTerms;
  geneNamesData?: GeneNamesData;
  organismData?: TaxonomyDatum | UniProtKBSimplifiedTaxonomy;
};

const GoRibbon = ({
  primaryAccession,
  goTerms,
  geneNamesData,
  organismData,
}: GoRibbonProps) => {
  const isSmallScreen = useSmallScreen();
  const columns = useColumns();

  const nodeRef = useRef<HTMLElement | null>(null);

  // NOTE: loading is also available, do we want to do anything with it?
  const { loading, slimmedData, selectedSlimSet, onSlimSetSelect, slimSets } =
    useGOData(goTerms, organismData?.taxonId);

  const [activeGoTerms, setActiveGoTerms] = useState<Set<GOTermID> | null>(
    null
  );
  const data = useMemo(
    () =>
      selectedSlimSet &&
      goTerms &&
      slimmedData && {
        categories: getCategories(selectedSlimSet),
        subjects: getSubjects(
          goTerms,
          slimmedData,
          primaryAccession,
          geneNamesData,
          organismData
        ),
      },
    [
      geneNamesData,
      goTerms,
      organismData,
      primaryAccession,
      selectedSlimSet,
      slimmedData,
    ]
  );

  useEffect(() => {
    if (!nodeRef.current || !data) {
      return;
    }

    const node = nodeRef.current;
    const clickHandler = async ({ detail }: CellClick | GroupClick) => {
      const isSelected = detail.group ? true : false;
      if (isSelected) {
        const clickedID = detail.group.id;
        const groupID: GOTermID | 'all' | 'all-other' =
          detail.group.type === 'Other' ? `${clickedID}-other` : clickedID;
        setActiveGoTerms(
          clickedID === 'all'
            ? null
            : new Set(data?.subjects?.[0].groups?.[groupID]?.ALL?.terms)
        );
      } else {
        setActiveGoTerms(null);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    node.addEventListener('cellClick', clickHandler);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    node.data = data;

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      node.removeEventListener('cellClick', clickHandler);
    };
  }, [isSmallScreen, data]);

  const ungroupedGoTerms = Array.from(goTerms?.values() || []).flat();

  if (!ungroupedGoTerms.length) {
    return null;
  }

  const filteredGoTerms =
    // If nothing is selected just show all
    activeGoTerms === null
      ? ungroupedGoTerms
      : ungroupedGoTerms.filter(({ id }) => id && activeGoTerms?.has(id));

  let ribbon: ReactNode = null;
  if (loading) {
    ribbon = (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  } else if (data) {
    ribbon = (
      <>
        <div className={styles.container}>
          <go-annotation-ribbon-strips
            ref={nodeRef}
            color-by="classes"
            subject-position="none"
            show-other-group
            show-all-annotations-group
            // Not-dynamic just highlight all on initial load
            selected="all"
            group-clickable="false"
          />
        </div>
        <small>Cell color indicative of number of GO terms</small>
      </>
    );
  }

  return (
    <div className="GoRibbon">
      <div className={styles.preamble}>
        Gene Ontology (GO) annotations organized by slimming set.
      </div>
      {!isSmallScreen && slimSets && (
        <label className={styles['set-selector']}>
          <div>Slimming set:</div>
          <select
            onChange={(e) => onSlimSetSelect(e.target.value)}
            value={selectedSlimSet?.id}
          >
            {slimSets.map((slimSet) => (
              <option value={slimSet.id} key={slimSet.id}>
                {slimSet.shortLabel}
              </option>
            ))}
          </select>
        </label>
      )}
      {!isSmallScreen && ribbon}
      {!!filteredGoTerms.length && (
        <TableFromData
          columns={columns}
          data={filteredGoTerms}
          getRowId={getRowId}
        />
      )}
      <div className={styles['quickgo-link']}>
        <ExternalLink url={externalUrls.QuickGOAnnotations(primaryAccession)}>
          Access the complete set of GO annotations on QuickGO
        </ExternalLink>
      </div>
    </div>
  );
};

export default GoRibbon;
