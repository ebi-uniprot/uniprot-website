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
import { type EvidenceProperty } from '../../types/protNLMAPIModel';

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
const pthrUrl = 'https://www.pantherdb.org/panther/family.do?clsAccession=';

// TODO: update with the actual help document once it exists.
const modelScoreDocsUrl =
  'https://docs.google.com/document/d/e/2PACX-1vQ7bf9WyDZgtNdOVfRZYCi8hUV8oLrBVub8csDJDMcUrVbEufdgrn2cxpRVmntx-20hvZtPRaorh8Rh/pub';

const matchTypeLabel = new Map([
  ['hydrated', 'Partial match'],
  ['substring', 'Partial match'],
  ['exact', 'Exact match'],
  ['exact_sanitized', 'Partial match'],
]);

const locToUrl = new Map([
  ['InterPro', interProUrl],
  ['GO', goUrl],
  ['EC', ecUrl],
  ['Pfam', pfamUrl],
  ['PANTHER', pthrUrl],
]);

const SomethingWentWrong = () => (
  <>
    <b>Something went wrong:</b> AI evidence malformed
  </>
);

const ModelScoreHeader = ({ modelScore }: { modelScore: string }) => (
  <>
    {`ProtNLM2 model score: `}
    <strong>{Number(modelScore).toFixed(2)}</strong>{' '}
    <a
      href={modelScoreDocsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="ProtNLM2 model score documentation"
    >
      <sup>
        <code>i</code>
      </sup>
    </a>
    <br />
    <small>0–1 scale. Higher = stronger prediction confidence.</small>
    <br />
    <br />
  </>
);

type Props = {
  properties: EvidenceProperty[];
  accession: string;
};
const ProtNLM2EvidenceLink = ({ properties, accession }: Props) => {
  if (properties.some((p) => p.value === null || p.value.trim() === '')) {
    logging.error(
      `ProtNLM2 evidence with no value: ${JSON.stringify(properties)}`
    );
    return <SomethingWentWrong />;
  }
  const propertiesMap = new Map(properties.map((p) => [p.key, p.value]));
  const modelScore = propertiesMap.get('model_score');
  if (!modelScore) {
    logging.error(
      `ProtNLM2 evidence missing model_score: ${JSON.stringify(properties)}`
    );
    return <SomethingWentWrong />;
  }
  const stringMatchText = propertiesMap.get('string_match_text');
  const stringMatchLoc = propertiesMap.get('string_match_location');
  const stringMatchType = propertiesMap.get('string_match_type');

  if (stringMatchText && stringMatchLoc && stringMatchType) {
    const externalUrl = locToUrl.get(stringMatchLoc);

    return (
      <>
        <ModelScoreHeader modelScore={modelScore} />
        {`${matchTypeLabel.get(stringMatchType) ?? stringMatchType} with ${stringMatchLoc}: `}
        {externalUrl &&
        (stringMatchType === 'hydrated' || stringMatchType === 'substring') ? (
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
        <ModelScoreHeader modelScore={modelScore} />
        {'Sequence similarity with '}
        <Link to={getEntryPath(Namespace.uniprotkb, phmmerAccession)}>
          {phmmerAccession}
        </Link>{' '}
        with phmmer score: <strong>{Number(phmmerScore).toFixed(2)}</strong>
        <br />
        <small>Unbounded scale. Higher = stronger sequence similarity.</small>
        <br />
        <br />
        <Link
          to={{
            pathname: LocationToPath[Location.Align],
            search: stringifyQuery({
              ids: [accession, phmmerAccession].join(','),
            }),
          }}
          target="_blank"
          rel="noreferrer"
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
        <ModelScoreHeader modelScore={modelScore} />
        {'Structure similarity with '}
        <Link to={getEntryPath(Namespace.uniprotkb, tmalignAccession)}>
          {tmalignAccession}
        </Link>
        <br />
        <ul className="protnlm2-tmalign-scores">
          <li>
            {`TM-score for ${accession} (current entry): `}
            <strong>{Number(tmalignScore1).toFixed(2)}</strong>
          </li>
          <li>
            {`TM-score for ${tmalignAccession}: `}
            {Number(tmalignScore2).toFixed(2)}
          </li>
        </ul>
        <small>
          0–1 scale. Higher = stronger structural similarity. &gt;0.5 suggests
          same fold.
        </small>
        <br />
        <br />
        <ExternalLink url={foldSeekAlign}>
          Align {accession} and {tmalignAccession} with FoldMason
        </ExternalLink>
      </>
    );
  }

  logging.error(
    `ProtNLM2 evidence fell through all conditions: ${JSON.stringify(properties)}`
  );
  return <SomethingWentWrong />;
};

export default ProtNLM2EvidenceLink;
