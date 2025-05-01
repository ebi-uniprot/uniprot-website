import { groupBy } from 'lodash-es';
import { useMemo } from 'react';

import { IdMaybeWithRange } from '../../jobs/utils/urls';
import {
  UniParcAPIModel,
  UniParcLiteAPIModel,
} from '../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import apiUrls from '../config/apiUrls/apiUrls';
import { Namespace } from '../types/namespaces';
import { SearchResults } from '../types/results';
import { FileFormat } from '../types/resultsDownload';
import accessionToNamespace from '../utils/accessionToNamespace';
import entryToFASTAWithHeaders from '../utils/entryToFASTAWithHeaders';
import { getIdKeyForNamespace } from '../utils/getIdKey';
import useDataApi from './useDataApi';
import useUniProtDataVersion from './useUniProtDataVersion';

const groupByNamespace = ({ id }: IdMaybeWithRange) => accessionToNamespace(id);

const useGetFASTAFromAccesion = (
  idsMaybeWithRange?: IdMaybeWithRange[] | null
) => {
  const release = useUniProtDataVersion();

  const [uniProtKBURL, uniRefURL, uniParcURL] = useMemo(() => {
    const groups = groupBy(idsMaybeWithRange, groupByNamespace);

    const uniProtKBURL = groups[Namespace.uniprotkb]?.length
      ? apiUrls.search.accessions(
          Array.from(
            new Set(
              groups[Namespace.uniprotkb].map(
                ({ id, start, end }) =>
                  `${id}${start && end ? `[${start}-${end}]` : ''}`
              )
            )
          ),
          {
            format: FileFormat.fasta,
          }
        )
      : null;
    const uniRefURL = groups[Namespace.uniref]?.length
      ? apiUrls.search.accessions(
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
      ? apiUrls.search.accessions(
          Array.from(
            new Set(groups[Namespace.uniparc].map(({ id }) => id))
          ).sort(),
          {
            facets: null,
            namespace: Namespace.uniparc,
            columns: ['upi', 'sequence', 'last_seen'],
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
    let isUniprotKbDataAdded = false;
    for (const idMaybeWithRange of idsMaybeWithRange || []) {
      const namespace = groupByNamespace(idMaybeWithRange);

      // UniProtKB accessions URL fetches FASTA directly
      if (namespace === Namespace.uniprotkb && !isUniprotKbDataAdded) {
        fasta += `\n\n${data[namespace].data}`;
        isUniprotKbDataAdded = true;
      }

      const entry = (
        data[namespace].data?.results as
          | undefined
          | Array<UniProtkbAPIModel | UniRefLiteAPIModel | UniParcLiteAPIModel>
      )?.find(
        (entry) =>
          getIdKeyForNamespace(namespace)(entry) === idMaybeWithRange.id
      );
      if (entry) {
        fasta += `\n\n${entryToFASTAWithHeaders(
          entry,
          {
            subsets:
              idMaybeWithRange.start && idMaybeWithRange.end
                ? [{ start: idMaybeWithRange.start, end: idMaybeWithRange.end }]
                : [],
          },
          release?.releaseDate
        )}`;
      }
    }
  }

  return { loading, fasta: fasta.trim() };
};

export default useGetFASTAFromAccesion;
