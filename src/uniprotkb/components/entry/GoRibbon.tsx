import { FC, useEffect, useState } from 'react';
import { ExternalLink } from 'franklin-sites';
import { Helmet } from 'react-helmet';

import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import externalUrls from '../../../shared/config/externalUrls';

import { GroupedGoTerms } from '../../adapters/functionConverter';

import handleGOData, {
  AGRRibbonData,
} from '../../adapters/slimming/GORibbonHandler';
import { GeneNamesData } from '../../adapters/namesAndTaxonomyConverter';

const GoRibbon: FC<{
  primaryAccession: string;
  goTerms?: GroupedGoTerms;
  geneNamesData?: GeneNamesData;
}> = ({ primaryAccession, goTerms, geneNamesData }) => {
  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  // const ribbonRef = useRef();
  const [data, setData] = useState<AGRRibbonData | null>();

  useEffect(() => {
    async function getSlimmedData(goTerms: GroupedGoTerms) {
      const returnData = await handleGOData(
        goTerms,
        primaryAccession,
        geneNamesData
      );
      setData(returnData);
    }
    if (goTerms) {
      getSlimmedData(goTerms);
    }
  }, [geneNamesData, goTerms, primaryAccession]);

  const ungroupedGoTerms = Array.from(goTerms?.values() || []).flat();
  if (!ungroupedGoTerms.length) {
    return null;
  }

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
          data={JSON.stringify(data)}
          update-on-subject-change="false"
          show-other-group
          add-cell-all
        />
      )}
      <protvista-datatable>
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Term</th>
            </tr>
          </thead>
          <tbody>
            {ungroupedGoTerms.map(
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
    </div>
  );
};

export default GoRibbon;
