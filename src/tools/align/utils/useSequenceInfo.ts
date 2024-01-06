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

const useSequenceInfo = (rawSequences?: string): SequenceInfo => {
  const processedArray: ParsedSequenceAndFeatures[] = useMemo(
    () => processSequences(rawSequences),
    [rawSequences]
  );

  const [
    uniprotkbAccessions,
    uniparcAccessions,
    representativeUniprotkbToUniref,
  ] = useMemo(() => {
    const uniprotkbAccessions = new Set<string>();
    const uniparcAccessions = new Set<string>();
    const representativeUniprotkbToUniref = new Map<string, string>();
    for (const { namespace, accession } of processedArray) {
      if (namespace === Namespace.uniprotkb) {
        uniprotkbAccessions.add(accession);
      } else if (namespace === Namespace.uniparc) {
        uniparcAccessions.add(accession);
      } else if (namespace === Namespace.uniref) {
        const representativeUniprotkbAccession = accession.split('_')?.[1];
        if (representativeUniprotkbAccession) {
          uniprotkbAccessions.add(representativeUniprotkbAccession);
          representativeUniprotkbToUniref.set(
            representativeUniprotkbAccession,
            accession
          );
        }
      }
    }
    return [
      uniprotkbAccessions,
      uniparcAccessions,
      representativeUniprotkbToUniref,
    ];
  }, [processedArray]);

  const uniprotkbEndpoint = getAccessionsURL(Array.from(uniprotkbAccessions), {
    namespace: Namespace.uniprotkb,
    facets: null,
  });
  const uniparcEndpoint = getAccessionsURL(Array.from(uniparcAccessions), {
    namespace: Namespace.uniparc,
    facets: null,
  });

  const uniprotkbResults =
    useDataApi<SearchResults<UniProtkbAPIModel>>(uniprotkbEndpoint);
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
    for (const { primaryAccession, sequence, features } of uniprotkbResults
      ?.data?.results || []) {
      const sequencedAndFeatures = {
        sequence: sequence.value,
        features,
      };
      idToSequenceAndFeatures.set(primaryAccession, sequencedAndFeatures);
      const uniref = representativeUniprotkbToUniref.get(primaryAccession);
      if (uniref) {
        idToSequenceAndFeatures.set(uniref, sequencedAndFeatures);
      }
    }
    for (const { uniParcId, sequence } of uniparcResults?.data?.results || []) {
      idToSequenceAndFeatures.set(uniParcId, {
        sequence: sequence.value,
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
    representativeUniprotkbToUniref,
    uniprotkbResults?.data?.results,
    uniparcResults?.data?.results,
  ]);

  const output = useMemo(
    () => ({
      data: outputData,
      loading:
        !rawSequences ||
        uniprotkbResults.loading ||
        uniparcResults.loading ||
        (uniprotkbEndpoint &&
          !uniprotkbResults.data &&
          !uniprotkbResults.error) ||
        (uniparcEndpoint && !uniparcResults.data && !uniparcResults.error),
    }),
    [
      outputData,
      rawSequences,
      uniprotkbResults.loading,
      uniprotkbResults.data,
      uniprotkbResults.error,
      uniparcResults.loading,
      uniparcResults.data,
      uniparcResults.error,
      uniprotkbEndpoint,
      uniparcEndpoint,
    ]
  );

  return output as SequenceInfo;
};

export default useSequenceInfo;
