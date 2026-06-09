import { ExternalLink } from 'franklin-sites';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import * as logging from '../../../shared/utils/logging';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';
import { type UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../types/columnTypes';
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

// The accession a sequence/structure-similarity evidence points to, enriched
// (once loaded) with a Swiss-Prot/TrEMBL icon and the source organism.
const SimilarEntryLink = ({
  accession,
  entryType,
  geneName,
  organism,
}: {
  accession: string;
  entryType?: string;
  geneName?: string;
  organism?: string;
}) => (
  <>
    {entryType && <EntryTypeIcon entryType={entryType} />}
    <Link to={getEntryPath(Namespace.uniprotkb, accession)}>{accession}</Link>
    {geneName && ` (${geneName})`}
    {organism && ` · ${organism}`}
  </>
);

const ModelScoreHeader = ({ modelScore }: { modelScore: string }) => (
  <>
    {/* `data-article-id` renders the standard contextual-help "i" and opens the
        ProtNLM help article (/help/ProtNLM) in the in-page help panel. */}
    <span data-article-id="ProtNLM#protnlm-model-score">
      ProtNLM2 model score
    </span>
    {`: `}
    <strong>{Number(modelScore).toFixed(2)}</strong>
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
  const propertiesMap = new Map(properties.map((p) => [p.key, p.value]));
  // Sequence/structure-similarity evidence links a UniProtKB accession; fetch its
  // entry type, gene name + organism to show a Swiss-Prot/TrEMBL icon and some
  // context. String-match evidence has no linked accession, so this stays null.
  const similarAccession =
    propertiesMap.get('phmmer_accession') ||
    propertiesMap.get('tmalign_accession') ||
    undefined;
  const similarEntry = useDataApi<
    Pick<UniProtkbAPIModel, 'entryType' | 'organism' | 'genes'>
  >(
    similarAccession
      ? apiUrls.entry.entry(similarAccession, Namespace.uniprotkb, [
          UniProtKBColumn.geneNames,
          UniProtKBColumn.organismName,
        ])
      : undefined
  );
  const similarEntryType = similarEntry.data?.entryType;
  const similarOrganism = similarEntry.data?.organism?.scientificName;
  const similarGeneName = similarEntry.data?.genes?.[0]?.geneName?.value;

  const modelScore = propertiesMap.get('model_score');
  const stringMatchText = propertiesMap.get('string_match_text');
  const stringMatchLoc = propertiesMap.get('string_match_location');
  const stringMatchType = propertiesMap.get('string_match_type');
  const phmmerAccession = propertiesMap.get('phmmer_accession');
  const phmmerScore = propertiesMap.get('phmmer_score');
  const tmalignAccession = propertiesMap.get('tmalign_accession');
  const tmalignScore1 = propertiesMap.get('tmalign_score_chain_1');
  const tmalignScore2 = propertiesMap.get('tmalign_score_chain_2');

  // Detect malformed / unrecognised evidence (pure). Logged in the effect below
  // rather than during render, so a re-render (e.g. when the linked entry
  // resolves) doesn't duplicate the log.
  let malformedLog: string | undefined;
  if (properties.some((p) => p.value === null || p.value.trim() === '')) {
    malformedLog = `ProtNLM2 evidence with no value: ${JSON.stringify(properties)}`;
  } else if (!modelScore) {
    malformedLog = `ProtNLM2 evidence missing model_score: ${JSON.stringify(properties)}`;
  } else if (
    !(stringMatchText && stringMatchLoc && stringMatchType) &&
    !(phmmerAccession && phmmerScore) &&
    !(tmalignAccession && tmalignScore1 && tmalignScore2)
  ) {
    malformedLog = `ProtNLM2 evidence fell through all conditions: ${JSON.stringify(properties)}`;
  }

  useEffect(() => {
    if (malformedLog) {
      logging.error(malformedLog);
    }
  }, [malformedLog]);

  if (malformedLog || !modelScore) {
    return <SomethingWentWrong />;
  }

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

  if (phmmerAccession && phmmerScore) {
    return (
      <>
        <ModelScoreHeader modelScore={modelScore} />
        {'Sequence similarity with '}
        <SimilarEntryLink
          accession={phmmerAccession}
          entryType={similarEntryType}
          geneName={similarGeneName}
          organism={similarOrganism}
        />
        <br />
        phmmer score: <strong>{Number(phmmerScore).toFixed(2)}</strong>
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

  if (tmalignAccession && tmalignScore1 && tmalignScore2) {
    const foldSeekAlign = stringifyUrl(foldSeekUrl, {
      accessions: [accession, tmalignAccession].join(','),
      sources: 'AlphaFoldDB',
    });
    return (
      <>
        <ModelScoreHeader modelScore={modelScore} />
        {'Structure similarity with '}
        <SimilarEntryLink
          accession={tmalignAccession}
          entryType={similarEntryType}
          geneName={similarGeneName}
          organism={similarOrganism}
        />
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

  // Unreachable: `malformedLog` already covers evidence that matches no branch.
  return <SomethingWentWrong />;
};

export default ProtNLM2EvidenceLink;
