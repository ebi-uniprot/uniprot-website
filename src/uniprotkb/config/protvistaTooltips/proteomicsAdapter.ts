import featureTooltip, { type TooltipFeature } from './featureTooltip';

/**
 * Port of protvista-uniprot v4's `proteomics-adapter`.
 *
 * The ordering here is load-bearing and easy to get wrong. v5's built-in
 * `uniprot-proteomics-json` overwrites each feature's `type` with
 * `unique`/`non_unique` for rendering and filtering, which destroys the raw
 * API type (`PROTEOMICS_PTM`) the tooltip branches on — downstream you can only
 * ever see `unique`. v4 avoided that by building the tooltip *before* the
 * overwrite, while the raw type, the peptide and the response's `taxid` were
 * all still in scope. This does the same, so the PTMs / Peptidoform / PeptideAtlas
 * sections come back.
 */

type ProteomicsFeature = TooltipFeature & {
  begin?: string;
  unique?: boolean;
  ptms?: {
    name: string;
    position: number;
    sources: string[];
    dbReferences: { id: string; properties: Record<string, string> }[];
  }[];
};

type ProteomicsData = {
  features?: ProteomicsFeature[];
  taxid?: number;
};

const proteomicsAdapter = (rawResponse: unknown) => {
  const data = rawResponse as ProteomicsData | undefined;
  const features = data?.features;
  if (!features?.length) {
    return [];
  }

  return features.map((rawFeature) => {
    // `begin` → `start` first, so the tooltip header and the PTM protein
    // positions read the unified field name.
    const feature: ProteomicsFeature = {
      ...rawFeature,
      start: rawFeature.begin || undefined,
    };
    feature.residuesToHighlight = feature.ptms?.map((ptm) => ({
      name: ptm.name,
      position: ptm.position,
      sources: ptm.sources,
      dbReferences: ptm.dbReferences,
    }));

    // Built while `feature.type` is still the raw API type
    const tooltipContent = featureTooltip(feature, String(data?.taxid));

    return Object.assign(feature, {
      category: 'PROTEOMICS',
      type: feature.unique ? 'unique' : 'non_unique',
      tooltipContent,
    });
  });
};

export default proteomicsAdapter;
