import { sequenceProcessor } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import extractAccession from './extractAccession';

import { getFeaturesURL } from '../../../uniprotkb/config/apiUrls';

import { FeatureData } from '../../../uniprotkb/components/protein-data-views/FeaturesView';
import { ParsedSequence } from '../../components/SequenceSearchLoader';

type FeatureEndpointData = {
  accession: string;
  entryName: string;
  features: FeatureData[];
  sequence: string;
  sequenceChecksum: string;
  taxid: number;
};

export type ParsedSequenceAndFeatures = ParsedSequence & {
  accession: string;
  features?: FeatureData[];
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

  const endpoint = getFeaturesURL(
    processedArray.map((processed) => processed.accession)
  );
  const { data, loading, error } = useDataApi<FeatureEndpointData[]>(endpoint);

  const dataPerAccession = new Map(
    data?.map((object) => [object.accession, object]) ?? []
  );

  processedArray = processedArray
    // ensures the sequences are identical between submitted and UniProt's DB
    .filter(
      (processed) =>
        processed.sequence ===
        dataPerAccession.get(processed.accession)?.sequence
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
