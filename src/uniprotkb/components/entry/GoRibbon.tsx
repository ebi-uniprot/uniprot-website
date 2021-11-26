import { FC, useEffect, useMemo, useState, useRef, ReactNode } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';
import { Helmet } from 'react-helmet';

import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';
import GOTermEvidenceTag from '../protein-data-views/GOTermEvidenceTag';

import useCustomElement from '../../../shared/hooks/useCustomElement';
import useSafeState from '../../../shared/hooks/useSafeState';

import externalUrls from '../../../shared/config/externalUrls';

import { GOTermID, GroupedGoTerms } from '../../adapters/functionConverter';

import {
  AGRRibbonGroup,
  AGRRibbonSubject,
  getCategories,
  getSubjects,
  useGOData,
} from '../../adapters/slimming/GORibbonHandler';
import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

import styles from './styles/go-ribbon.module.scss';

type CellClick = {
  detail: {
    selected: [boolean];
    group: AGRRibbonGroup;
    subjects: AGRRibbonSubject[];
  };
};

const GoRibbon: FC<{
  primaryAccession: string;
  goTerms?: GroupedGoTerms;
  geneNamesData?: GeneNamesData;
  organismData?: TaxonomyDatum;
}> = ({ primaryAccession, goTerms, geneNamesData, organismData }) => {
  const nodeRef = useRef<HTMLElement>();

  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const [selectedSet, setSelectedSet] = useState('goslim_agr');

  // NOTE: loading is also available, do we want to do anything with it?
  const { loading, slimmedData, selectedSlimSet, slimSets } = useGOData(
    goTerms,
    selectedSet
  );

  const [elementLoaded, setElementLoaded] = useSafeState(false);

  useEffect(() => {
    customElements.whenDefined('wc-ribbon-strips').then(() => {
      setElementLoaded(true);
    });
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
    const cellClickHandler = ({ detail }: CellClick) => {
      const isSelected = detail.selected?.[0];
      const clickedID = detail.group.id;
      const groupID: GOTermID =
        detail.group.type === 'Other' ? `${clickedID}-other` : clickedID;
      setActiveGoTerms(
        !isSelected || clickedID === 'all'
          ? null
          : new Set(data?.subjects?.[0].groups?.[groupID]?.ALL?.terms)
      );
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    node.addEventListener('cellClick', cellClickHandler);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    node.data = data;

    // eslint-disable-next-line consistent-return
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      node.removeEventListener('cellClick', cellClickHandler);
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
        />
        <small>Cell color indicative of number of GO terms</small>
      </div>
    );
  }

  return (
    <div className="GoRibbon">
      <h3>GO Annotations</h3>
      <Helmet>
        <script
          type="module"
          src="https://unpkg.com/@geneontology/wc-ribbon-strips@0.0.37/dist/wc-ribbon-strips/wc-ribbon-strips.esm.js"
        />
      </Helmet>
      {slimSets && (
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
      {ribbon}
      {!!filteredGoTerms.length && (
        <protvista-datatable>
          <table>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>Term</th>
              </tr>
            </thead>
            <tbody>
              {filteredGoTerms.map(
                (goTerm) =>
                  goTerm.id && (
                    <tr key={goTerm.id}>
                      <td>{goTerm.aspect}</td>
                      <td>
                        <ExternalLink url={externalUrls.QuickGO(goTerm.id)}>
                          {goTerm.termDescription || goTerm.id}
                        </ExternalLink>
                        <UniProtKBEvidenceTag evidences={goTerm.evidences} />
                        <GOTermEvidenceTag
                          evidence={goTerm.properties?.GoEvidenceType}
                        />
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </protvista-datatable>
      )}
    </div>
  );
};

export default GoRibbon;
