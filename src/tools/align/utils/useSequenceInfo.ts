import { useMemo } from 'react';
import { sequenceProcessor } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import extractAccession from './extractAccession';

import { getAccessionsURL } from '../../../shared/config/apiUrls';

import { FeatureData } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { ParsedSequence } from '../../components/SequenceSearchLoader';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type ParsedSequenceAndFeatures = ParsedSequence & {
  accession: string;
  features?: FeatureData;
};

export type SequenceInfo = {
  loading: boolean;
  data: Map<ParsedSequenceAndFeatures['accession'], ParsedSequenceAndFeatures>;
};

const hasAccession = (
  value: ParsedSequence | ParsedSequenceAndFeatures
): value is ParsedSequenceAndFeatures =>
  (value as ParsedSequenceAndFeatures).accession !== undefined;

const useSequenceInfo = (rawSequences?: string): SequenceInfo => {
  const processedArray: ParsedSequenceAndFeatures[] = useMemo(
    () =>
      (sequenceProcessor(rawSequences || '') as ParsedSequence[])
        .map((processed) => ({
          ...processed,
          accession: extractAccession(processed.name),
        }))
        // ensures we managed to extract an accession from header, otherwise discard
        .filter(hasAccession),
    [rawSequences]
  );

  const endpoint = getAccessionsURL(
    processedArray.map((processed) => processed.accession)
  );
  const { data, loading, error } = useDataApi<UniProtkbAccessionsAPI>(endpoint);

  const outputData = useMemo(() => {
    const dataPerAccession = new Map(
      data?.results.map((object) => [object.primaryAccession, object]) ?? []
    );

    const pa = processedArray
      // ensures the sequences are identical between submitted and UniProt's DB
      .filter(
        (processed) =>
          processed.sequence ===
          dataPerAccession.get(processed.accession)?.sequence.value
      )
      // enrich with the feature data
      .map((processed) => ({
        ...processed,
        features: dataPerAccession.get(processed.accession)?.features,
      }));
    return new Map(pa.map((processed) => [processed.accession, processed]));
  }, [data, processedArray]);

  const output = useMemo(
    () => ({
      data: outputData,
      loading: loading || !rawSequences || (endpoint && !data && !error),
    }),
    [outputData, loading, rawSequences, endpoint, data, error]
  );

  // eslint-disable-next-line consistent-return
  return output as SequenceInfo;
};

export default useSequenceInfo;
