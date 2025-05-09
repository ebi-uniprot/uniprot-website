import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { useMemo } from 'react';

import { ProcessedFeature } from '../../../shared/components/views/FeaturesView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { convertData as processUniParcFeaturesData } from '../../../uniparc/components/entry/UniParcFeaturesView';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { processFeaturesData as processUniProtKBFeaturesData } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { removeFeaturesWithUnknownModifier } from '../../utils/sequences';
import extractAccession from './extractAccession';

export type ParsedSequenceAndFeatures = SequenceObject & {
  accession: string;
  namespace: Namespace;
  features?: ProcessedFeature[];
};

export type SequenceInfo = {
  loading: boolean;
  data: Map<ParsedSequenceAndFeatures['accession'], ParsedSequenceAndFeatures>;
};

const processSequences = (rawSequences = '') => {
  const processedSequences = [];
  for (const processedSequence of sequenceProcessor(rawSequences)) {
    const extracted = extractAccession(processedSequence.name);
    // ensures we managed to extract an accession from header, otherwise discard
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

  const [uniprotkbAccessions, uniparcAccessions, representativeToUniref] =
    useMemo(() => {
      const uniprotkbAccessions = new Set<string>();
      const uniparcAccessions = new Set<string>();
      const representativeToUniref = new Map<string, string>();
      for (const { namespace, accession } of processedArray) {
        if (namespace === Namespace.uniprotkb) {
          uniprotkbAccessions.add(accession);
        } else if (namespace === Namespace.uniparc) {
          uniparcAccessions.add(accession);
        } else if (namespace === Namespace.uniref) {
          const representativeAccession = accession.split('_')?.[1];
          if (representativeAccession) {
            if (representativeAccession.startsWith('UPI')) {
              uniparcAccessions.add(representativeAccession);
            } else {
              uniprotkbAccessions.add(representativeAccession);
            }
            representativeToUniref.set(representativeAccession, accession);
          }
        }
      }
      return [uniprotkbAccessions, uniparcAccessions, representativeToUniref];
    }, [processedArray]);

  const uniprotkbEndpoint = apiUrls.search.accessions(
    Array.from(uniprotkbAccessions),
    {
      namespace: Namespace.uniprotkb,
      facets: null,
    }
  );
  const uniparcEndpoint = apiUrls.search.accessions(
    Array.from(uniparcAccessions),
    {
      namespace: Namespace.uniparc,
      facets: null,
    }
  );

  const uniprotkbResults =
    useDataApi<SearchResults<UniProtkbAPIModel>>(uniprotkbEndpoint);
  const uniparcResults =
    useDataApi<SearchResults<UniParcAPIModel>>(uniparcEndpoint);

  const outputData = useMemo(() => {
    const idToSequenceAndFeatures = new Map<
      string,
      {
        sequence: string;
        features?: ProcessedFeature[];
      }
    >();
    for (const { primaryAccession, sequence, features } of uniprotkbResults
      ?.data?.results || []) {
      if (!sequence) {
        continue;
      }
      const sequencedAndFeatures = {
        sequence: sequence.value,
        features: processUniProtKBFeaturesData(
          removeFeaturesWithUnknownModifier(features),
          primaryAccession,
          sequence.value
        ),
      };
      idToSequenceAndFeatures.set(primaryAccession, sequencedAndFeatures);
      const uniref = representativeToUniref.get(primaryAccession);
      if (uniref) {
        idToSequenceAndFeatures.set(uniref, sequencedAndFeatures);
      }
    }
    for (const { uniParcId, sequence, sequenceFeatures = [] } of uniparcResults
      ?.data?.results || []) {
      const sequencedAndFeatures = {
        sequence: sequence.value,
        features: processUniParcFeaturesData(sequenceFeatures),
      };
      idToSequenceAndFeatures.set(uniParcId, sequencedAndFeatures);
      const uniref = representativeToUniref.get(uniParcId);
      if (uniref) {
        idToSequenceAndFeatures.set(uniref, sequencedAndFeatures);
      }
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
    representativeToUniref,
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
