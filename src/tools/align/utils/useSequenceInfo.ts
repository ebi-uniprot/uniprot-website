import { useMemo } from 'react';
import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';

import useDataApi from '../../../shared/hooks/useDataApi';

import extractAccession from './extractAccession';

import { getAccessionsURL } from '../../../shared/config/apiUrls';

import { FeatureDatum } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { SearchResults } from '../../../shared/types/results';
import { Namespace } from '../../../shared/types/namespaces';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';

export type ParsedSequenceAndFeatures = SequenceObject & {
  accession: string;
  namespace: Namespace;
  features?: FeatureDatum[];
};

export type SequenceInfo = {
  loading: boolean;
  data: Map<ParsedSequenceAndFeatures['accession'], ParsedSequenceAndFeatures>;
};

const processSequences = (rawSequences = '') => {
  const processedSequences = [];
  for (const processedSequence of sequenceProcessor(rawSequences)) {
    const extracted = extractAccession(processedSequence.name);
    if (extracted?.accession) {
      processedSequences.push({
        ...processedSequence,
        ...extracted,
      });
    }
  }
  return processedSequences;
};

const getEndpoint = (
  processedArray: ParsedSequenceAndFeatures[],
  namespace: Namespace
) =>
  getAccessionsURL(
    processedArray
      .filter((p) => p.namespace === namespace)
      .map((p) => p.accession),
    { namespace, facets: null }
  );

const useSequenceInfo = (rawSequences?: string): SequenceInfo => {
  const processedArray: ParsedSequenceAndFeatures[] = useMemo(
    () => processSequences(rawSequences),
    [rawSequences]
  );

  const uniprotkbEndpoint = getEndpoint(processedArray, Namespace.uniprotkb);
  const unirefEndpoint = getEndpoint(processedArray, Namespace.uniref);
  const uniparcEndpoint = getEndpoint(processedArray, Namespace.uniparc);

  const uniprotkbResults =
    useDataApi<SearchResults<UniProtkbAPIModel>>(uniprotkbEndpoint);
  const unirefResults =
    useDataApi<SearchResults<UniRefAPIModel>>(unirefEndpoint);
  const uniparcResults =
    useDataApi<SearchResults<UniParcAPIModel>>(uniparcEndpoint);

  const outputData = useMemo(() => {
    const idToSequenceAndFeatures = new Map<
      string,
      {
        sequence: string;
        features?:
          | UniProtkbAPIModel['features']
          | UniParcAPIModel['sequenceFeatures'];
      }
    >();
    for (const result of uniprotkbResults?.data?.results || []) {
      idToSequenceAndFeatures.set(result.primaryAccession, {
        sequence: result.sequence.value,
        features: result.features,
      });
    }
    for (const result of unirefResults?.data?.results || []) {
      idToSequenceAndFeatures.set(result.id, {
        sequence: result.representativeMember.sequence.value,
      });
    }
    for (const result of uniparcResults?.data?.results || []) {
      idToSequenceAndFeatures.set(result.uniParcId, {
        sequence: result.sequence.value,
        // features: result.sequenceFeatures,
      });
    }
    const pa = processedArray
      // ensures the sequences are identical between submitted and UniProt's DB
      .filter(
        (processed) =>
          processed.sequence ===
          idToSequenceAndFeatures.get(processed.accession)?.sequence
      )
      // enrich with the feature data
      .map((processed) => ({
        ...processed,
        features: idToSequenceAndFeatures.get(processed.accession)?.features,
      }));
    return new Map(pa.map((processed) => [processed.accession, processed]));
  }, [
    processedArray,
    uniprotkbResults?.data?.results,
    unirefResults?.data?.results,
    uniparcResults?.data?.results,
  ]);

  const output = useMemo(
    () => ({
      data: outputData,
      loading:
        !rawSequences ||
        uniprotkbResults.loading ||
        unirefResults.loading ||
        uniparcResults.loading ||
        (uniprotkbEndpoint &&
          !uniprotkbResults.data &&
          !uniprotkbResults.error) ||
        (unirefEndpoint && !unirefResults.data && !unirefResults.error) ||
        (uniparcEndpoint && !uniparcResults.data && !uniparcResults.error),
    }),
    [
      outputData,
      rawSequences,
      uniprotkbResults.loading,
      uniprotkbResults.data,
      uniprotkbResults.error,
      unirefResults.loading,
      unirefResults.data,
      unirefResults.error,
      uniparcResults.loading,
      uniparcResults.data,
      uniparcResults.error,
      uniprotkbEndpoint,
      unirefEndpoint,
      uniparcEndpoint,
    ]
  );

  return output as SequenceInfo;
};

export default useSequenceInfo;
