import { FC, Suspense, lazy } from 'react';
import { Tabs, Tab } from 'franklin-sites';

import SubcellularLocationView from './SubcellularLocationView';
import SubcellularLocationGOView from './SubcellularLocationGOView';

import { getEvidenceCodeData } from '../../config/evidenceCodes';

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

export type SubCellLocation = {
  id: string;
  reviewed: boolean;
};

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

export const getSubcellularLocationId = (id: string) =>
  id.match(/SL-(\d+)/)?.[1];

export const getGoId = (id: string) => id.match(/GO:(\d+)/)?.[1];

const SubcellularLocationWithVizView: FC<
  {
    primaryAccession?: string;
    comments?: SubcellularLocationComment[];
    goXrefs?: GoXref[];
  } & Partial<Pick<TaxonomyDatum, 'taxonId' | 'lineage'>>
> = ({ primaryAccession, comments, taxonId, lineage, goXrefs }) => {
  if (!comments?.length && !goXrefs?.length) {
    return null;
  }

  const uniprotTextContent = <SubcellularLocationView comments={comments} />;
  const goTextContent = (
    <SubcellularLocationGOView
      primaryAccession={primaryAccession}
      goXrefs={goXrefs}
    />
  );

  const uniProtLocationIds = (comments || [])
    .flatMap(({ subcellularLocations }) =>
      subcellularLocations?.map(
        ({ location }) =>
          !!location.id && {
            id: getSubcellularLocationId(location.id),
            reviewed: location.evidences?.some((evidence) => {
              const evidenceCodeData = getEvidenceCodeData(
                evidence.evidenceCode
              );
              return Boolean(evidenceCodeData?.manual);
            }),
          }
      )
    )
    .filter(Boolean) as SubCellLocation[];

  const goLocationIds = (goXrefs || [])
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

  console.log(uniProtLocationIds);
  // console.log(goXrefs);
  return (
    <Suspense fallback={null}>
      <Tabs>
        <Tab cache title="UniProt Annotation">
          <SubCellViz uniProtLocations={uniProtLocationIds} taxonId={taxonId}>
            {uniprotTextContent}
          </SubCellViz>
        </Tab>
        <Tab cache title="GO Annotation">
          <SubCellViz goLocationIds={goLocationIds} taxonId={taxonId}>
            {goTextContent}
          </SubCellViz>
        </Tab>
      </Tabs>
    </Suspense>
  );
};

export default SubcellularLocationWithVizView;
