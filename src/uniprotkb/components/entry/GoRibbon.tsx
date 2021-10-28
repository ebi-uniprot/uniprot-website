import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';

// NOTE: this dependency is quite big (because of "amigo2-instance-data"), so
// NOTE: you can lazy load this module to avoid blocking the rest of the page
// NOTE: while instantiating this
import Ribbon, { RibbonDataProvider } from '@geneontology/ribbon';

import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import externalUrls from '../../../shared/config/externalUrls';

import { GroupedGoTerms } from '../../adapters/functionConverter';

import '@geneontology/ribbon/es/main.scss';
import './styles/go-ribbon.scss';

// The label position of each entity
enum POSITION {
  NONE = 0,
  LEFT = 1,
  RIGHT = 2,
  BOTTOM = 3,
}

// The input count value for the color
enum COLOR_BY {
  CLASS_COUNT = 0,
  ANNOTATION_COUNT = 1,
}

type RibbonData = {
  entities: unknown[];
  config: unknown;
  dataError: unknown;
  dataReceived: unknown;
};

const RibbonContainer: FC<RibbonData> = ({
  entities,
  config,
  dataError,
  dataReceived,
}) => (
  <div className="GoRibbon__container">
    {dataReceived && (
      <Ribbon
        entities={entities}
        config={config}
        showing
        entityLabel={POSITION.RIGHT}
        colorBy={COLOR_BY.CLASS_COUNT}
        binaryColor={false}
        oddEvenColor
      />
    )}
    {!dataReceived && dataError && (
      <div className="GoRibbon__container__message">
        Cannot load Go Ribbon visualisation due to server error
      </div>
    )}
    {!dataReceived && !dataError && (
      <div className="GoRibbon__container__message">Loading...</div>
    )}
  </div>
);

const GoRibbon: FC<{ primaryAccession: string; goTerms?: GroupedGoTerms }> = ({
  primaryAccession,
  goTerms,
}) => {
  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const ungroupedGoTerms = Array.from(goTerms?.values() || []).flat();
  if (!ungroupedGoTerms.length) {
    return null;
  }

  return (
    <div className="GoRibbon">
      <h3>GO Terms</h3>
      <RibbonDataProvider subject={`UniProtKB:${primaryAccession}`}>
        {(data: RibbonData) => (
          <>
            {(!!data.entities?.length || !data.dataReceived) && (
              <h3>GO Annotations</h3>
            )}
            <RibbonContainer {...data} />
          </>
        )}
      </RibbonDataProvider>
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
