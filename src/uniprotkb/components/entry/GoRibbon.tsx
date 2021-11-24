import { FC, useCallback, useEffect, useState } from 'react';
import { ExternalLink } from 'franklin-sites';
import { Helmet } from 'react-helmet';

import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import externalUrls from '../../../shared/config/externalUrls';

import { GOTermID, GroupedGoTerms } from '../../adapters/functionConverter';

import handleGOData, {
  AGRRibbonData,
  AGRRibbonGroup,
  AGRRibbonSubject,
} from '../../adapters/slimming/GORibbonHandler';
import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';

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
  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const [data, setData] = useState<AGRRibbonData | null>();
  const [activeGoTerms, setActiveGoTerms] = useState<Set<GOTermID> | null>(
    null
  );
  const groups = data?.subjects?.[0].groups;

  useEffect(() => {
    async function getSlimmedData(goTerms: GroupedGoTerms) {
      const returnData = await handleGOData(
        goTerms,
        primaryAccession,
        geneNamesData,
        organismData
      );
      setData(returnData);
    }
    if (goTerms) {
      getSlimmedData(goTerms);
    }
  }, [geneNamesData, goTerms, primaryAccession, organismData]);

  const ribbonRef = useCallback(
    (node) => {
      if (!node) {
        return;
      }
      node.addEventListener('cellClick', ({ detail }: CellClick) => {
        const isSelected = detail.selected?.[0];
        const clickedID = detail.group.id;

        setActiveGoTerms(
          !isSelected || clickedID === 'all'
            ? null
            : new Set(
                (
                  groups?.[clickedID] || groups?.[`${clickedID}-other`]
                )?.ALL?.terms
              )
        );

        // TODO: "all" not here yet - I think this will be when this other TODO is done:
        // "Iterate over aspects again and populate ALL"
      });
    },
    [groups]
  );

  const ungroupedGoTerms = Array.from(goTerms?.values() || []).flat();

  if (!ungroupedGoTerms.length) {
    return null;
  }

  const filteredGoTerms =
    // If nothing is selected just show all
    activeGoTerms === null
      ? ungroupedGoTerms
      : ungroupedGoTerms.filter(
          ({ id }) => id && activeGoTerms?.has(id as GOTermID)
        );

  return (
    <div className="GoRibbon">
      <h3>GO Annotations</h3>
      <Helmet>
        <script
          type="module"
          src="https://unpkg.com/@geneontology/wc-ribbon-strips/dist/wc-ribbon-strips/wc-ribbon-strips.esm.js"
        />
      </Helmet>
      {data && (
        <wc-ribbon-strips
          ref={ribbonRef}
          data={JSON.stringify(data)}
          update-on-subject-change="false"
          subject-position="0"
          show-other-group
          add-cell-all
        />
      )}
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
