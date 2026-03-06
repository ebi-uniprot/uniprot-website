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
//

const foldSeekUrl = 'https://search.foldseek.com/foldmason';
const interProUrl = 'https://www.ebi.ac.uk/interpro/entry/InterPro/';
const goUrl = 'https://www.ebi.ac.uk/QuickGO/term/';
const ecUrl = 'https://enzyme.expasy.org/EC/';
const pfamUrl = 'https://www.ebi.ac.uk/interpro/entry/pfam/';

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
  console.log(properties);
  const modelScore = propertiesMap.get('model_score');
  const stringMatchText = propertiesMap.get('string_match_text');
  const stringMatchLoc = propertiesMap.get('string_match_location');
  const stringMatchType = propertiesMap.get('string_match_type');

  if (stringMatchText && stringMatchLoc && stringMatchType) {
    const matchTypeLabel: Record<string, string> = {
      hydrated: 'Hydrated partial match',
      substring: 'Partial match',
      exact: 'Exact match',
      exact_sanitized: 'Partial match',
    };
    const typeValue = stringMatchType ?? '';

    const locToUrl: Record<string, string> = {
      InterPro: interProUrl,
      GO: goUrl,
      EC: ecUrl,
      Pfam: pfamUrl,
    };
    const externalUrl = locToUrl[stringMatchLoc];

    return (
      <>
        {`ProtNLM2 model score: `}
        <strong>{Number(modelScore).toFixed(2)}</strong>
        <br />
        <br />
        {`${matchTypeLabel[typeValue] ?? typeValue} with ${stringMatchLoc}: `}
        {externalUrl && typeValue === 'hydrated' ? (
          <ExternalLink url={`${externalUrl}${stringMatchText}`}>
            {stringMatchText}
          </ExternalLink>
        ) : (
          stringMatchText
        )}
      </>
    );
  }

  const phmmerAccession = propertiesMap.get('phmmer_accession');
  const phmmerScore = propertiesMap.get('phmmer_score');

  if (phmmerAccession && phmmerScore) {
    return (
      <>
        {`ProtNLM2 model score: `}
        <strong>{Number(modelScore).toFixed(2)}</strong>
        <br />
        <br />
        {'Sequence similarity with: '}
        <Link to={getEntryPath(Namespace.uniprotkb, phmmerAccession)}>
          {phmmerAccession}
        </Link>
        <ul>
          <li>
            phmmer score: <strong>{Number(phmmerScore).toFixed(2)}</strong>
          </li>
          <small>Higher values indicate stronger sequence similarity</small>
        </ul>
        <br />
        <Link
          to={{
            pathname: LocationToPath[Location.Align],
            search: stringifyQuery({
              ids: [accession, phmmerAccession].join(','),
            }),
          }}
          target="_blank"
          rel="noopener"
        >
          Align {accession} and {phmmerAccession} with Clustal Omega
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
        {`ProtNLM2 model score: `}
        <strong>{Number(modelScore).toFixed(2)}</strong>
        <br />
        <br />
        {'Structure similarity with: '}
        <Link to={getEntryPath(Namespace.uniprotkb, tmalignAccession)}>
          {tmalignAccession}
        </Link>
        <br />
        <ul>
          <li>
            {`TM-score for ${accession} (current entry): `}
            <strong>{Number(tmalignScore1).toFixed(2)}</strong>
          </li>
          <li>
            {`TM-score for ${tmalignAccession}: `}
            <strong>{Number(tmalignScore2).toFixed(2)}</strong>
          </li>
          <small>
            Scale: 0 (no match) to 1 (perfect match). &gt;0.5 = same fold
          </small>
        </ul>
        <ExternalLink url={foldSeekAlign}>
          Align {accession} and {tmalignAccession} with FoldMason
        </ExternalLink>
      </>
    );
  }
};

export default ProtNLM2EvidenceLink;
