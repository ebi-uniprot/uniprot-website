import * as logging from '../../../shared/utils/logging';
import ptmTooltip, { type PTM } from './ptmTooltip';

/**
 * Port of protvista-uniprot v4's `ptm-exchange-adapter`.
 *
 * v5's built-in `uniprot-proteomics-ptm-json` adapter emits only
 * `{ source, type, start, end, shape, color }` — it discards the `ptms` and
 * `aa` values, so the rich PTM tooltip cannot be rebuilt downstream from the
 * `change` event. Registering this adapter under the built-in's name restores
 * them by attaching `tooltipContent` while that data is still in scope; the
 * library's tooltip resolver leaves any non-empty `tooltipContent` alone.
 */

type ProteomicsPtmFeature = {
  begin: string;
  peptide: string;
  ptms: PTM[];
};

type ProteomicsPtm = {
  features?: ProteomicsPtmFeature[];
};

const ConfidenceScoreColors = {
  Gold: '#c39b00',
  Silver: '#8194a1',
  Bronze: '#a65708',
};

const convertPtmExchangePtms = (
  ptms: PTM[],
  aa: string,
  absolutePosition: number
) => {
  const groupPtmsByModification: Record<string, PTM[]> = {};
  for (const ptm of ptms) {
    if (groupPtmsByModification[ptm.name]) {
      groupPtmsByModification[ptm.name].push(ptm);
    } else {
      groupPtmsByModification[ptm.name] = [ptm];
    }
  }

  return Object.values(groupPtmsByModification).map((groupedPtms) => {
    const confidenceScores = new Set(
      groupedPtms.flatMap(({ dbReferences }) =>
        dbReferences?.map(({ properties }) => properties['Confidence score'])
      )
    );
    let confidenceScore: string | null = null;
    if (confidenceScores.size) {
      if (confidenceScores.size > 1) {
        logging.error(
          `PTMeXchange PTM has a mixture of confidence scores: ${Array.from(
            confidenceScores
          )}`
        );
      } else {
        [confidenceScore] = confidenceScores;
      }
    }

    return {
      source: 'PTMeXchange',
      type: 'MOD_RES_LS',
      start: absolutePosition,
      end: absolutePosition,
      shape: 'triangle',
      tooltipContent: ptmTooltip(
        `MOD_RES_LS ${absolutePosition}-${absolutePosition}`,
        groupedPtms,
        aa,
        confidenceScore ?? ''
      ),
      color:
        (confidenceScore !== null &&
          confidenceScore in ConfidenceScoreColors &&
          ConfidenceScoreColors[
            confidenceScore as keyof typeof ConfidenceScoreColors
          ]) ||
        'black',
    };
  });
};

const proteomicsPtmAdapter = (rawResponse: unknown) => {
  const data = rawResponse as ProteomicsPtm | undefined;
  const features = data?.features;
  if (!features) {
    return [];
  }

  const absolutePositionToPtms: Record<number, { ptms: PTM[]; aa: string }> =
    {};

  for (const feature of features) {
    for (const ptm of feature.ptms) {
      const absolutePosition = +feature.begin + ptm.position - 1;
      if (!Number.isFinite(absolutePosition)) {
        logging.error(
          `Encountered infinite number: +feature.begin + ptm.position - 1 = ${+feature.begin} + ${
            ptm.position
          } - 1`
        );
        continue;
      }
      const aa = feature.peptide[ptm.position - 1];
      if (absolutePosition in absolutePositionToPtms) {
        if (absolutePositionToPtms[absolutePosition].aa !== aa) {
          logging.error(
            `One PTM has different amino acid values: [${absolutePositionToPtms[absolutePosition].aa}, ${aa}]`
          );
        } else {
          absolutePositionToPtms[absolutePosition].ptms.push(ptm);
        }
      } else {
        absolutePositionToPtms[absolutePosition] = { ptms: [ptm], aa };
      }
    }
  }

  return Object.entries(absolutePositionToPtms)
    .map(([absolutePosition, { ptms, aa }]) =>
      convertPtmExchangePtms(ptms, aa, +absolutePosition)
    )
    .flat();
};

export default proteomicsPtmAdapter;
