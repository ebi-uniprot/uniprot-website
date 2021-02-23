import { FC, Suspense, lazy } from 'react';

import SubcellularLocationView from './SubcellularLocationView';

import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';
import { SubcellularLocationComment } from '../../types/commentTypes';

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
  } & Pick<OrganismData, 'taxonId' | 'lineage'>
> = ({ comments, taxonId, lineage }) => {
  if (!comments?.length) {
    return null;
  }

  const textContent = <SubcellularLocationView comments={comments} />;

  // If we can render a visualisation, wrap the text content as a child
  if (lineage && taxonId && !isVirus(lineage)) {
    return (
      <Suspense fallback={textContent}>
        <SubCellViz comments={comments} taxonId={taxonId}>
          {textContent}
        </SubCellViz>
      </Suspense>
    );
  }

  // Otherwise, just return the text content
  return textContent;
};

export default SubcellularLocationWithVizView;
