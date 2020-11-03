import { cloneDeep } from 'lodash-es';
import { processUrlTemplate } from '../../uniprotkb/components/protein-data-views/XRefView';
import evidenceUrls from '../../uniprotkb/config/evidenceUrls';

export const prepareFeatureForTooltip = (feature) => {
  const cloned = cloneDeep(feature);

  if (feature.featureId) {
    cloned.ftId = feature.featureId;
  }

  if (!feature.evidences) {
    return cloned;
  }

  cloned.evidences = cloned.evidences.map((e) => {
    const prepared = { ...e, code: e.evidenceCode };
    if (e.id && e.source) {
      const source = {
        id: e.id,
        name: e.source,
      };
      const url = evidenceUrls[e.source];
      if (url) {
        source.url = processUrlTemplate(url, {
          value: e.id,
        });
      }
      if (e.source === 'PubMed') {
        source.alternativeUrl = processUrlTemplate(evidenceUrls.EuropePMC, {
          value: e.id,
        });
      }
    }
    return prepared;
  });
  return cloned;
};
