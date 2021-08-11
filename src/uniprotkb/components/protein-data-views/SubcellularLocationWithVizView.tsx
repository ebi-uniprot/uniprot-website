import { FC, Suspense, lazy, useState } from 'react';

import { TabsOld } from 'franklin-sites';
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
  const [activeTab, setActiveTab] = useState(0);
  if (!comments?.length) {
    return null;
  }

  const uniprotTextContent = <SubcellularLocationView comments={comments} />;

  // If we can render a visualisation, wrap the text content as a child
  // const uniprotNode =
  //   lineage && taxonId && !isVirus(lineage as string[]) ? (
  //  ) : (
  //     uniprotTextContent
  //   );

  console.log(goXrefs);
  const goTextContent = <SubcellularLocationGOView goXrefs={goXrefs} />;

  if (
    !lineage ||
    !taxonId ||
    !(uniprotTextContent || goTextContent) ||
    isVirus(lineage as string[])
  ) {
    return null;
  }
  console.log(activeTab);
  return (
    <>
      <Suspense fallback={null}>
        <TabsOld
          onClick={setActiveTab}
          tabData={[
            {
              title: 'UniProt Annotation',
              content: (
                <SubCellViz
                  comments={comments}
                  taxonId={taxonId}
                  activeTab={activeTab}
                  goXrefs={goXrefs}
                  id="uni"
                >
                  {uniprotTextContent}
                </SubCellViz>
              ),
              id: 'uni',
            },
            {
              title: 'GO Annotation',
              content: (
                <SubCellViz
                  comments={comments}
                  taxonId={taxonId}
                  activeTab={activeTab}
                  goXrefs={goXrefs}
                  id="go"
                >
                  {uniprotTextContent}
                </SubCellViz>
              ),
              id: 'go',
            },
          ]}
        />
      </Suspense>
    </>
  );
};

export default SubcellularLocationWithVizView;
