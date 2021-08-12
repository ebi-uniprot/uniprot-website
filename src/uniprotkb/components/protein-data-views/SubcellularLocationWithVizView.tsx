import { FC, Suspense, lazy } from 'react';

import { TabsOld } from 'franklin-sites';
import SubcellularLocationView from './SubcellularLocationView';
import SubcellularLocationGOView from './SubcellularLocationGOView';

import { SubcellularLocationComment } from '../../types/commentTypes';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { GoXref } from '../../adapters/subcellularLocationConverter';

// Import it lazily in order to isolate the libraries used only for this
const SubCellViz = lazy(
  () => import(/* webpackChunkName: "subcellviz" */ './SubCellViz')
);

enum Superkingdom {
  Viruses = 'Viruses',
}

export enum VizTab {
  UniProt = 'uniprot',
  GO = 'go',
}

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

const getSubcellularLocationId = (id: string) => id.match(/SL-(\d+)/)?.[1];

const getGoId = (id: string) =>
  id.match(/GO:(\d+)/)?.[1]?.replaceAll('^0+', '');

const SubcellularLocationWithVizView: FC<
  {
    comments?: SubcellularLocationComment[];
    goXrefs: GoXref[];
  } & Partial<Pick<TaxonomyDatum, 'taxonId' | 'lineage'>>
> = ({ comments, taxonId, lineage, goXrefs }) => {
  if (!comments?.length && !goXrefs?.length) {
    return null;
  }

  const uniprotTextContent = <SubcellularLocationView comments={comments} />;
  const goTextContent = <SubcellularLocationGOView goXrefs={goXrefs} />;

  const uniProtLocationIds = (comments || [])
    .flatMap(({ subcellularLocations }) =>
      subcellularLocations?.map(
        ({ location }) => location.id && getSubcellularLocationId(location.id)
      )
    )
    .filter(Boolean)
    .join(',');

  const goLocationIds = goXrefs
    .map(({ id }) => getGoId(id))
    .filter(Boolean)
    .join(',');

  if (
    !lineage ||
    !taxonId ||
    isVirus(lineage as string[]) ||
    !(uniprotTextContent && goTextContent) ||
    (!uniProtLocationIds?.length && !goLocationIds?.length)
  ) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <TabsOld
        tabData={[
          {
            title: 'UniProt Annotation',
            content: (
              <SubCellViz
                uniProtLocationIds={uniProtLocationIds}
                taxonId={taxonId}
              >
                {uniprotTextContent}
              </SubCellViz>
            ),
            id: VizTab.UniProt,
          },
          {
            title: 'GO Annotation',
            content: (
              <SubCellViz goLocationIds={goLocationIds} taxonId={taxonId}>
                {goTextContent}
              </SubCellViz>
            ),
            id: VizTab.GO,
          },
        ]}
      />
    </Suspense>
  );
};

export default SubcellularLocationWithVizView;
