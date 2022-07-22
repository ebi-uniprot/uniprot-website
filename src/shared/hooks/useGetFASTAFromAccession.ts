import { useMemo } from 'react';
import { groupBy } from 'lodash-es';

import useDataApi from './useDataApi';

import { getAccessionsURL } from '../config/apiUrls';

import entryToFASTAWithHeaders from '../utils/entryToFASTAWithHeaders';
import accessionToNamespace from '../utils/accessionToNamespace';
import { getIdKeyFor } from '../utils/getIdKeyForNamespace';

import { AccessionWithModifications } from '../utils/modifications';
import { Namespace } from '../types/namespaces';
import { SearchResults } from '../types/results';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';

const groupByNamespace = ({ accession }: AccessionWithModifications) =>
  accessionToNamespace(accession);

const useGetFASTAFromAccesion = (
  accessionsWithModification?: AccessionWithModifications[] | null
) => {
  const [uniProtKBURL, uniRefURL, uniParcURL] = useMemo(() => {
    const groups = groupBy(accessionsWithModification, groupByNamespace);

    const uniProtKBURL = groups[Namespace.uniprotkb]?.length
      ? getAccessionsURL(
          Array.from(
            new Set(
              groups[Namespace.uniprotkb].map(({ accession }) => accession)
            )
          ).sort(),
          {
            facets: null,
            namespace: Namespace.uniprotkb,
            columns: [
              'accession',
              'reviewed',
              'id',
              'gene_names',
              'organism_id',
              'organism_name',
              'sequence',
              'sequence_version',
              'protein_existence',
            ],
          }
        )
      : null;
    const uniRefURL = groups[Namespace.uniref]?.length
      ? getAccessionsURL(
          Array.from(
            new Set(groups[Namespace.uniref].map(({ accession }) => accession))
          ).sort(),
          {
            facets: null,
            namespace: Namespace.uniref,
            // columns: [
            //   'id',
            //   'name',
            //   'count',
            //   'organism',
            //   'common_taxon',
            //   'common_taxonid',
            //   'sequence',
            // ],
            // NOTE: can't optimise fields because no way to get representative
          }
        )
      : null;
    const uniParcURL = groups[Namespace.uniparc]?.length
      ? getAccessionsURL(
          Array.from(
            new Set(groups[Namespace.uniparc].map(({ accession }) => accession))
          ).sort(),
          {
            facets: null,
            namespace: Namespace.uniparc,
            columns: ['upi', 'active', 'sequence'],
          }
        )
      : null;

    return [uniProtKBURL, uniRefURL, uniParcURL];
  }, [accessionsWithModification]);

  const data = {
    [Namespace.uniprotkb]:
      useDataApi<SearchResults<UniProtkbAPIModel>>(uniProtKBURL),
    [Namespace.uniref]:
      useDataApi<SearchResults<UniRefLiteAPIModel>>(uniRefURL),
    [Namespace.uniparc]: useDataApi<SearchResults<UniParcAPIModel>>(uniParcURL),
  };

  const loading =
    data[Namespace.uniprotkb].loading ||
    data[Namespace.uniref].loading ||
    data[Namespace.uniparc].loading;

  let fasta = '';

  if (!loading) {
    for (const accessionWithModification of accessionsWithModification || []) {
      const namespace = groupByNamespace(accessionWithModification);
      const entry = (
        data[namespace].data?.results as
          | undefined
          | Array<UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel>
      )?.find(
        (entry) =>
          getIdKeyFor(namespace)(entry) === accessionWithModification.accession
      );
      if (entry) {
        fasta += `\n\n${entryToFASTAWithHeaders(
          entry,
          accessionWithModification.modifications
        )}`;
      }
    }
  }

  return { loading, fasta: fasta.trim() };
};

export default useGetFASTAFromAccesion;
