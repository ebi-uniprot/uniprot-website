import { ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import * as logging from '../../../shared/utils/logging';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';
import {
  type EvidenceProperty,
  type ProtNLM2Id,
} from '../../types/protNLMAPIModel';

//
// possisble fields for ProtNLM2 predictions
// string match:
//   'string_match_text',
//   'string_match_location',
//   'string_match_type',
//
// phmmer
//   'phmmer_accession',
//   'phmmer_score',
//
// tmalign
//   'tmalign_accession',
//   'tmalign_score_chain_1',
//   'tmalign_score_chain_2',
//   link to foldmason: for tmalign structure: https://search.foldseek.com/foldmason?accessions=A0A182IS97,A0A0C9R1G8&sources=AlphaFoldDB
//

const foldSeekUrl = 'https://search.foldseek.com/foldmason';
const interProUrl = 'https://www.ebi.ac.uk/interpro/entry/InterPro/';

type Props = {
  id: typeof ProtNLM2Id;
  properties: EvidenceProperty[];
  accession: string;
};
const ProtNLM2EvidenceLink = ({ id, properties, accession }: Props) => {
  if (properties.some((p) => p.value === null || p.value.trim() === '')) {
    logging.error(
      `ProtNLM2 evidence with no value: ${JSON.stringify(properties)}`
    );
    return 'oops';
  }
  const propertiesMap = new Map(properties.map((p) => [p.key, p.value]));

  const stringMatchText = propertiesMap.get('string_match_text');
  const stringMatchLoc = propertiesMap.get('string_match_location');
  const stringMatchType = propertiesMap.get('string_match_type');

  if (stringMatchText && stringMatchLoc && stringMatchType) {
    // create lookup table for printing correct things
    const matchTypeLabel: Record<string, string> = {
      hydrated: 'Hyrdated substring match',
      substring: 'Substring match',
      exact: 'Exact match',
    };
    const typeValue = stringMatchType ?? '';
    return (
      <>
        {`${matchTypeLabel[typeValue] ?? typeValue} with ${stringMatchLoc}: ${stringMatchText}`}
      </>
    );
  }

  const phmmerAccession = propertiesMap.get('phmmer_accession');
  const phmmerScore = propertiesMap.get('phmmer_score');

  if (phmmerAccession && phmmerScore) {
    return (
      <>
        {'Sequence similarity with: '}
        <Link to={getEntryPath(Namespace.uniprotkb, phmmerAccession)}>
          {phmmerAccession}
        </Link>
        {` (phmmer score: ${phmmerScore}) — `}
        <Link
          to={{
            pathname: LocationToPath[Location.Align],
            search: stringifyQuery({
              ids: [accession, phmmerAccession].join(','),
            }),
          }}
        >
          Align sequence
        </Link>
      </>
    );
  }

  const tmalignAccession = propertiesMap.get('tmalign_accession');
  const tmalignScore1 = propertiesMap.get('tmalign_score_chain_1');
  const tmalignScore2 = propertiesMap.get('tmalign_score_chain_2');

  if (tmalignAccession && tmalignScore1 && tmalignScore2) {
    const foldSeekAlign = stringifyUrl(foldSeekUrl, {
      accessions: [accession, tmalignAccession].join(','),
      sources: 'AlphaFoldDB',
    });
    return (
      <>
        {'Structure similarity with: '}
        <Link to={getEntryPath(Namespace.uniprotkb, tmalignAccession)}>
          {tmalignAccession}
        </Link>
        {` (tmalign score for ${accession}:
        ${tmalignScore1} | tmalign score for
        ${tmalignAccession}: ${tmalignScore2}) — `}
        <ExternalLink url={foldSeekAlign}>Align structure</ExternalLink>
      </>
    );
  }
};

export default ProtNLM2EvidenceLink;
