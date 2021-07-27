import { FC, Suspense, lazy } from 'react';

import { Tab, Tabs } from 'franklin-sites';
import SubcellularLocationView from './SubcellularLocationView';

import { SubcellularLocationComment } from '../../types/commentTypes';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import SubcellularLocationGOView from './SubcellularLocationGOView';
import { GoXref } from '../../adapters/subcellularLocationConverter';

// Import it lazily in order to isolate the libraries used only for this
const SubCellViz = lazy(
  () => import(/* webpackChunkName: "subcellviz" */ './SubCellViz')
);

enum Superkingdom {
  Viruses = 'Viruses',
}

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

const SubcellularLocationWithVizView: FC<
  {
    comments?: SubcellularLocationComment[];
    goXrefs: GoXref[];
  } & Partial<Pick<TaxonomyDatum, 'taxonId' | 'lineage'>>
> = ({ comments, taxonId, lineage, goXrefs }) => {
  if (!comments?.length) {
    return null;
  }
  const uniprotTextContent = <SubcellularLocationView comments={comments} />;

  // If we can render a visualisation, wrap the text content as a child
  const uniprotNode =
    lineage && taxonId && !isVirus(lineage as string[]) ? (
      <Suspense fallback={uniprotTextContent}>
        <SubCellViz comments={comments} taxonId={taxonId}>
          {uniprotTextContent}
        </SubCellViz>
      </Suspense>
    ) : (
      uniprotTextContent
    );

  const goNode = <SubcellularLocationGOView goXrefs={goXrefs} />;

  return (
    (uniprotNode || goNode) && (
      <Tabs>
        {goNode && <Tab title="GO Cellular Component">{goNode}</Tab>}
        {uniprotNode && <Tab title="UniProt Annotation">{uniprotNode}</Tab>}
      </Tabs>
    )
  );
};

export default SubcellularLocationWithVizView;
