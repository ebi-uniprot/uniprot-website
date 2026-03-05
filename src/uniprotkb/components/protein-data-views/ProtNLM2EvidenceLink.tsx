import * as logging from '../../../shared/utils/logging';
import {
  type EvidenceProperty,
  type ProtNLM2Id,
} from '../../types/protNLMAPIModel';

const stringKeys = new Set([
  'string_match_text',
  'string_match_location',
  'string_match_type',
]);
const phmmerKeys = new Set(['phmmer_accession', 'phmmer_score']);
const tmalignKeys = new Set([
  'tmalign_accession',
  'tmalign_score_chain_1',
  'tmalign_score_chain_2',
]);

type Props = { id: typeof ProtNLM2Id; properties: EvidenceProperty[] };
const ProtNLM2EvidenceLink = ({ id, properties }: Props) => {
  if (properties.some((p) => p.value === null || p.value.trim() === '')) {
    logging.error(
      `ProtNLM2 evidence with no value: ${JSON.stringify(properties)}`
    );
    return 'oops';
  }
  const propertiesMap = new Map(properties.map((p) => [p.key, p.value]));

  if (
    propertiesMap.has('string_match_text') &&
    propertiesMap.has('string_match_location') &&
    propertiesMap.has('string_match_type')
  ) {
    // create lookup table for printing correct things
    const matchTypeLabel: Record<string, string> = {
      hydrated: 'Hyrdated substring match',
      substring: 'Substring match',
      exact: 'Exact match',
    };
    const typeValue = propertiesMap.get('string_match_type') ?? '';
    return (
      (matchTypeLabel[typeValue] ?? typeValue) +
      ' with ' +
      propertiesMap.get('string_match_location') +
      ': ' +
      propertiesMap.get('string_match_text')
    );
  }

  if (
    propertiesMap.has('phmmer_accession') &&
    propertiesMap.has('phmmer_score')
  ) {
    return (
      'Sequence similarity with: ' +
      propertiesMap.get('phmmer_accession') +
      ' (phmmer score: ' +
      propertiesMap.get('phmmer_score') +
      ')'
    );
  }
  if (
    propertiesMap.has('tmalign_accession') &&
    propertiesMap.has('tmalign_score_chain_1') &&
    propertiesMap.has('tmalign_score_chain_2')
  ) {
    return (
      'Structure similarity with: ' +
      propertiesMap.get('tmalign_accession') +
      ' (tmalign score: ' +
      (propertiesMap.get('tmalign_score_chain_1') ??
        propertiesMap.get('tmalign_score_chain_2')) +
      ')'
    );
  }
};

export default ProtNLM2EvidenceLink;
