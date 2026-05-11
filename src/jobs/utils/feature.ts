import { type getFeatureTooltip } from 'protvista-uniprot';
import urljoin from 'url-join';

import { type ProcessedFeature } from '../../shared/components/views/FeaturesView';
import { getEvidenceLink } from '../../uniprotkb/config/evidenceUrls';

type TooltipFeature = Parameters<typeof getFeatureTooltip>[0];

export const prepareFeatureForTooltip = (
  feature: ProcessedFeature
): TooltipFeature => {
  const tooltipFeature: TooltipFeature = {
    type: feature.type,
    begin: feature.start,
    end: feature.end,
  };

  if (feature.description) {
    if (feature.type === 'Binding site') {
      if (feature.ligand) {
        tooltipFeature.ligand = { name: feature.ligand.name };
      }
      if (feature.ligandPart?.name) {
        tooltipFeature.ligandPart = { name: feature.ligandPart.name };
      }
      tooltipFeature.description = feature.ligandDescription;
    } else {
      tooltipFeature.description = feature.description as string | undefined;
    }
  }

  if (feature.accession) {
    tooltipFeature.ftId = feature.accession;
  }

  if (!feature.evidences) {
    return tooltipFeature;
  }

  tooltipFeature.evidences = feature.evidences.map((e) => {
    if (!e.id || !e.source) {
      return { code: e.evidenceCode };
    }
    const { url, isInternal } = getEvidenceLink(e.source, e.id);
    const source: Record<string, string> = { id: e.id, name: e.source };
    if (url) {
      source.url = isInternal ? urljoin('https://www.uniprot.org/', url) : url;
    }
    if (e.source === 'PubMed') {
      const { url: alternativeUrl } = getEvidenceLink('EuropePMC', e.id);
      if (alternativeUrl) {
        source.alternativeUrl = alternativeUrl;
      }
    }
    return { code: e.evidenceCode, source };
  });

  return tooltipFeature;
};
