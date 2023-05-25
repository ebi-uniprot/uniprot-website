import { ReactElement, ReactNode } from 'react';
import urljoin from 'url-join';
import { ProcessedFeature } from '../../shared/components/views/FeaturesView';
import {
  Ligand,
  LigandPart,
} from '../../uniprotkb/components/protein-data-views/LigandDescriptionView';
import { getEvidenceLink } from '../../uniprotkb/config/evidenceUrls';
import FeatureType from '../../uniprotkb/types/featureType';

type Source = {
  id: string;
  name: string;
  url?: string;
  alternativeUrl?: string;
};

type Evidence = {
  code: string;
  source?: Source;
};

type TooltipFeature = {
  type: FeatureType;
  start: number;
  end: number;
  ftId?: string;
  evidences?: Evidence[];
  description?: ReactNode;
  ligand?: Ligand;
  ligandPart?: LigandPart;
};

export const prepareFeatureForTooltip = (
  feature: ProcessedFeature
): TooltipFeature => {
  const tooltipFeature: TooltipFeature = {
    type: feature.type,
    start: feature.start,
    end: feature.end,
  };

  if (feature.description) {
    if (feature.type === 'Binding site') {
      const descriptionNode = feature.description as ReactElement;
      const descriptionProps = descriptionNode?.props;
      tooltipFeature.ligand = descriptionProps.ligand;
      tooltipFeature.ligandPart = descriptionProps.ligandPart;
      tooltipFeature.description = descriptionProps.description;
    } else {
      tooltipFeature.description = feature.description;
    }
  }

  if (feature.featureId) {
    tooltipFeature.ftId = feature.featureId;
  }

  if (!feature.evidences) {
    return tooltipFeature;
  }

  tooltipFeature.evidences = feature.evidences.map((e) => {
    const tooltipEvidence: Evidence = { code: e.evidenceCode };
    if (e.id && e.source) {
      const source: Source = {
        id: e.id,
        name: e.source,
      };
      const { url, isInternal } = getEvidenceLink(e.source, e.id);
      if (url) {
        source.url = isInternal
          ? urljoin('https://www.uniprot.org/', url)
          : url;
      }
      if (e.source === 'PubMed') {
        const { url: alternativeUrl } = getEvidenceLink('EuropePMC', e.id);
        if (alternativeUrl) {
          source.alternativeUrl = alternativeUrl;
        }
      }
      tooltipEvidence.source = source;
    }
    return tooltipEvidence;
  });

  return tooltipFeature;
};
