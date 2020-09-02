import { sequenceProcessor } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import extractAccession from './extractAccession';

import { getAccessionsURL } from '../../../uniprotkb/config/apiUrls';

import { FeatureData } from '../../../uniprotkb/components/protein-data-views/FeaturesView';
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
  let processedArray: ParsedSequenceAndFeatures[] = (sequenceProcessor(
    rawSequences || ''
  ) as ParsedSequence[])
    .map((processed) => ({
      ...processed,
      accession: extractAccession(processed.name),
    }))
    // ensures we managed to extract an accession from header, otherwise discard
    .filter(hasAccession);

  const endpoint = getAccessionsURL(
    processedArray.map((processed) => processed.accession)
  );
  const { data, loading, error } = useDataApi<UniProtkbAccessionsAPI>(endpoint);

  const dataPerAccession = new Map(
    data?.results.map((object) => [object.primaryAccession, object]) ?? []
  );

  processedArray = processedArray
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

  // eslint-disable-next-line consistent-return
  return {
    data: new Map(
      processedArray.map((processed) => [processed.accession, processed])
    ),
    loading: loading || !rawSequences || (endpoint && !data && !error),
  } as SequenceInfo;
};

export default useSequenceInfo;
