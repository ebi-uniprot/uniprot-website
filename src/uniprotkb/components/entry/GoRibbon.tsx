import { Loader } from 'franklin-sites';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import ExternalLink from '../../../shared/components/ExternalLink';
import LazyComponent from '../../../shared/components/LazyComponent';
import TableFromData, {
  TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import externalUrls from '../../../shared/config/externalUrls';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useSafeState from '../../../shared/hooks/useSafeState';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  GoTerm,
  GOTermID,
  GroupedGoTerms,
} from '../../adapters/functionConverter';
import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';
import {
  AGRRibbonGroup,
  AGRRibbonSubject,
  getCategories,
  getSubjects,
  useGOData,
} from '../../adapters/slimming/GORibbonHandler';
import { UniProtKBSimplifiedTaxonomy } from '../../adapters/uniProtkbConverter';
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
        <>
          <ExternalLink
            url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', {
              id: data.id,
            })}
          >
            {data.termDescription || data.id}
          </ExternalLink>
          <GOTermEvidenceTag evidence={data.properties?.GoEvidenceType} />
          <UniProtKBEvidenceTag evidences={data.evidences} goTermEvidence />
        </>
      ),
    },
  ];

  return columns;
};

const getRowId = (data: GoTerm) => data.id;

type CellClick = {
  detail: {
    selected?: [boolean];
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

  const nodeRef = useRef<HTMLElement>();

  const [selectedSet, setSelectedSet] = useState(() => {
    let defaultSS = 'goslim_generic';
    if (organismData?.scientificName && organismData?.lineage) {
      const taxonomyInfo = [
        ...organismData.lineage,
        organismData.scientificName,
      ];

      // SlimSets based on Taxonomy
      const slimSetByTaxon = {
        // eslint-disable-next-line camelcase
        goslim_plant: [
          'Viridiplantae',
          'Bangiophyceae',
          'Florideophyceae',
          'Stylonematophyceae',
          'Rhodellophyceae',
          'Compsopogonophyceae',
        ],
        // prokaryotes: ['Bacteria', 'Archaea'],
      };

      // Check if the taxon matches a slimset
      Object.entries(slimSetByTaxon).forEach(([key, value]) => {
        const presentTaxon = taxonomyInfo?.filter(
          (t) => value.includes(String(t)) // Lineage is Array of strings here
        );
        if (presentTaxon?.length) {
          defaultSS = key;
        }
      });
    }
    return defaultSS;
  });

  // NOTE: loading is also available, do we want to do anything with it?
  const { loading, slimmedData, selectedSlimSet, slimSets } = useGOData(
    goTerms,
    organismData?.taxonId,
    selectedSet
  );

  const [elementLoaded, setElementLoaded] = useSafeState(false);

  useEffect(() => {
    if ('customElements' in window) {
      customElements.whenDefined('wc-ribbon-strips').then(() => {
        setElementLoaded(true);
      });
    }
  }, [setElementLoaded]);

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
    if (!elementLoaded || !nodeRef.current || !data) {
      return;
    }

    const node = nodeRef.current;
    const clickHandler = async ({ detail }: CellClick | GroupClick) => {
      // TODO: the groupClick event detail does not provide the attribute "selected". Possibly create a PR against ribbon-strips to provide this.
      const isSelected = 'selected' in detail ? detail.selected?.[0] : true;
      const clickedID = detail.group.id;
      const groupID: GOTermID | 'all' | 'all-other' =
        detail.group.type === 'Other' ? `${clickedID}-other` : clickedID;
      setActiveGoTerms(
        !isSelected || clickedID === 'all'
          ? null
          : new Set(data?.subjects?.[0].groups?.[groupID]?.ALL?.terms)
      );
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
  }, [elementLoaded, data]);

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
          <wc-ribbon-strips
            ref={nodeRef}
            update-on-subject-change="false"
            // color by nb_classes: 0, nb_annotations: 1
            color-by="0"
            // bold for 'all ...' cells
            category-all-style="1"
            subject-position="0"
            show-other-group
            add-cell-all
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
      <div className={styles.preamble} data-article-id="gene-ontology">
        Gene Ontology (GO) annotations organized by slimming set.
      </div>
      <div className={styles['quickgo-link']}>
        <ExternalLink url={externalUrls.QuickGOAnnotations(primaryAccession)}>
          Access the complete set of GO annotations on QuickGO{' '}
        </ExternalLink>
      </div>

      {!isSmallScreen && (
        <LazyComponent fallback={null}>
          <Helmet>
            <script
              type="module"
              src="https://unpkg.com/@geneontology/wc-ribbon-strips@0.0.37/dist/wc-ribbon-strips/wc-ribbon-strips.esm.js"
            />
          </Helmet>
        </LazyComponent>
      )}
      {elementLoaded && slimSets && (
        <label className={styles['set-selector']}>
          <div>Slimming set:</div>
          <select
            onChange={(e) => setSelectedSet(e.target.value)}
            value={selectedSet}
          >
            {slimSets.map((slimSet) => (
              <option value={slimSet} key={slimSet}>
                {slimSet.replace('goslim_', '').replace('_ribbon', '')}
              </option>
            ))}
          </select>
        </label>
      )}
      {elementLoaded && ribbon}
      {!!filteredGoTerms.length && (
        <TableFromData
          columns={columns}
          data={filteredGoTerms}
          getRowId={getRowId}
        />
      )}
    </div>
  );
};

export default GoRibbon;
