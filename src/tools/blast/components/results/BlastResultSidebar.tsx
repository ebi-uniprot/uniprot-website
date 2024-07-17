import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import BlastResultLocalFacets from './BlastResultLocalFacets';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';

import { FacetsEnum as FacetsEnumUniProtKB } from '../../../../uniprotkb/config/UniProtKBFacetConfiguration';
import { defaultFacets as defaultFacetsUniParc } from '../../../../uniparc/config/UniParcFacetConfiguration';

import { SearchResults } from '../../../../shared/types/results';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import { BlastHit } from '../../types/blastResults';

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
    const [{ selectedFacets, query }] = getParamsFromURL(search);
    const dataApiObject = useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(
      // For UniRef, the only avalailable facet is the identity value, which
      // doesn't make sense in BLAST's context where all have the same value
      namespace === Namespace.uniref
        ? null
        : apiUrls.search.accessions(accessions, {
            namespace,
            size: 0,
            facets:
              namespace === Namespace.uniprotkb
                ? defaultFacetsUniProtKB
                : defaultFacetsUniParc,
            query,
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
