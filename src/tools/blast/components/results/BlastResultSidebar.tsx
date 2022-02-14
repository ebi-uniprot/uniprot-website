import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import BlastResultLocalFacets from './BlastResultLocalFacets';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

import { FacetsEnum as FacetsEnumUniProtKB } from '../../../../uniprotkb/config/UniProtKBFacetConfiguration';
import { defaultFacets as defaultFacetsUniParc } from '../../../../uniparc/config/UniParcFacetConfiguration';

import { Namespace } from '../../../../shared/types/namespaces';
import { BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';

// Same as default, but with OtherOrganism in the middle too
const defaultFacetsUniProtKB = [
  FacetsEnumUniProtKB.Reviewed,
  FacetsEnumUniProtKB.ModelOrganism,
  FacetsEnumUniProtKB.OtherOrganism,
  FacetsEnumUniProtKB.ProteinsWith,
  FacetsEnumUniProtKB.Existence,
  FacetsEnumUniProtKB.AnnotationScore,
  FacetsEnumUniProtKB.Length,
];

type BlastResultSidebarProps = {
  accessions?: string[];
  allHits: BlastHit[];
  namespace: Namespace;
};

const BlastResultSidebar = memo<BlastResultSidebarProps>(
  ({ accessions, allHits, namespace }) => {
    const { search } = useLocation();
    const [{ selectedFacets }] = getParamsFromURL(search);
    const dataApiObject = useDataApiWithStale<Response['data']>(
      // For UniRef, the only avalailable facet is the identity value, which
      // doesn't make sense in BLAST's context where all have the same value
      namespace === Namespace.uniref
        ? null
        : getAccessionsURL(accessions, {
            namespace,
            size: 0,
            facets:
              namespace === Namespace.uniprotkb
                ? defaultFacetsUniProtKB
                : defaultFacetsUniParc,
            selectedFacets,
          })
    );

    const { loading, isStale } = dataApiObject;
    if (loading && !isStale) {
      return <Loader />;
    }

    return (
      <>
        <BlastResultLocalFacets allHits={allHits} namespace={namespace} />
        {dataApiObject.url && <ResultsFacets dataApiObject={dataApiObject} />}
      </>
    );
  }
);

export default BlastResultSidebar;
