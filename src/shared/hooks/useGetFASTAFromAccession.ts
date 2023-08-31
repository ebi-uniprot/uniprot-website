import { useMemo } from 'react';
import { groupBy } from 'lodash-es';

import useDataApi from './useDataApi';

import { getAccessionsURL } from '../config/apiUrls';

import entryToFASTAWithHeaders from '../utils/entryToFASTAWithHeaders';
import accessionToNamespace from '../utils/accessionToNamespace';
import { getIdKeyForNamespace } from '../utils/getIdKeyForNamespace';

import { IdMaybeWithRange } from '../../tools/utils/urls';
import { Namespace } from '../types/namespaces';
import { SearchResults } from '../types/results';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';

const groupByNamespace = ({ id }: IdMaybeWithRange) => accessionToNamespace(id);

const useGetFASTAFromAccesion = (
  idsMaybeWithRange?: IdMaybeWithRange[] | null
) => {
  const [uniProtKBURL, uniRefURL, uniParcURL] = useMemo(() => {
    const groups = groupBy(idsMaybeWithRange, groupByNamespace);

    const uniProtKBURL = groups[Namespace.uniprotkb]?.length
      ? getAccessionsURL(
          Array.from(
            new Set(groups[Namespace.uniprotkb].map(({ id }) => id))
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
              'protein_name',
            ],
          }
        )
      : null;
    const uniRefURL = groups[Namespace.uniref]?.length
      ? getAccessionsURL(
          Array.from(
            new Set(groups[Namespace.uniref].map(({ id }) => id))
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
            new Set(groups[Namespace.uniparc].map(({ id }) => id))
          ).sort(),
          {
            facets: null,
            namespace: Namespace.uniparc,
            columns: ['upi', 'active', 'sequence'],
          }
        )
      : null;

    return [uniProtKBURL, uniRefURL, uniParcURL];
  }, [idsMaybeWithRange]);

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
    for (const idMaybeWithRange of idsMaybeWithRange || []) {
      const namespace = groupByNamespace(idMaybeWithRange);
      const entry = (
        data[namespace].data?.results as
          | undefined
          | Array<UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel>
      )?.find(
        (entry) =>
          getIdKeyForNamespace(namespace)(entry) === idMaybeWithRange.id
      );
      if (entry) {
        fasta += `\n\n${entryToFASTAWithHeaders(entry, {
          subsets:
            idMaybeWithRange.start && idMaybeWithRange.end
              ? [{ start: idMaybeWithRange.start, end: idMaybeWithRange.end }]
              : [],
        })}`;
      }
    }
  }

  return { loading, fasta: fasta.trim() };
};

export default useGetFASTAFromAccesion;
