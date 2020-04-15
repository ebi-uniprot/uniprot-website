import { scaleLinear } from 'd3-scale';
import { groupBy } from 'lodash';
import { TransformedProtvistaVariant } from '../VariationView';

type VariationVariants = { variants: TransformedProtvistaVariant[] }[];

const scaleColors = {
  UPDiseaseColor: '#990000',
  UPNonDiseaseColor: '#99cc00',
  deleteriousColor: '#002594',
  benignColor: '#8FE3FF',
  othersColor: '#009e73',
};

const consequences = {
  likelyDisease: /disease|pathogenic\b|risk factor/i,
  likelyBenign: /benign/i,
  uncertain: /uncertain|conflicting|unclassified/i,
};

const getFilteredVariants = (
  variants: VariationVariants,
  callbackFilter: (variant: TransformedProtvistaVariant) => void
) =>
  variants.map((variant) => {
    const matchingVariants = variant.variants.filter((variantPos) =>
      callbackFilter(variantPos)
    );
    return {
      ...variant,
      variants: [...matchingVariants],
    };
  });

const filterConfig = [
  {
    name: 'disease',
    type: {
      name: 'consequence',
      text: 'Filter Consequence',
    },
    options: {
      labels: ['Likely disease'],
      colors: [scaleColors.UPDiseaseColor],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          variantPos.clinicalSignificances &&
          consequences.likelyDisease.test(variantPos.clinicalSignificances)
      ),
  },
  {
    name: 'predicted',
    type: {
      name: 'consequence',
      text: 'Filter Consequence',
    },
    options: {
      labels: ['Predicted deleterious', 'Predicted benign'],
      colors: [scaleColors.deleteriousColor, scaleColors.benignColor],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          typeof variantPos.polyphenScore !== 'undefined' ||
          typeof variantPos.siftScore !== 'undefined'
      ),
  },
  {
    name: 'nonDisease',
    type: {
      name: 'consequence',
      text: 'Filter Consequence',
    },
    options: {
      labels: ['Likely benign'],
      colors: [scaleColors.UPNonDiseaseColor],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          variantPos.clinicalSignificances &&
          consequences.likelyBenign.test(variantPos.clinicalSignificances)
      ),
  },
  {
    name: 'uncertain',
    type: {
      name: 'consequence',
      text: 'Filter Consequence',
    },
    options: {
      labels: ['Uncertain'],
      colors: [scaleColors.othersColor],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          (typeof variantPos.clinicalSignificances === 'undefined' &&
            typeof variantPos.polyphenScore === 'undefined' &&
            typeof variantPos.siftScore === 'undefined') ||
          (variantPos.clinicalSignificances &&
            consequences.uncertain.test(variantPos.clinicalSignificances))
      ),
  },
  {
    name: 'UniProt',
    type: {
      name: 'provenance',
      text: 'Filter Provenance',
    },
    options: {
      labels: ['UniProt reviewed'],
      colors: ['#9f9f9f'],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          variantPos.xrefNames &&
          (variantPos.xrefNames.includes('uniprot') ||
            variantPos.xrefNames.includes('UniProt'))
      ),
  },
  {
    name: 'ClinVar',
    type: {
      name: 'provenance',
      text: 'Filter Provenance',
    },
    options: {
      labels: ['ClinVar reviewed'],
      colors: ['#9f9f9f'],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          variantPos.xrefNames &&
          (variantPos.xrefNames.includes('ClinVar') ||
            variantPos.xrefNames.includes('clinvar'))
      ),
  },
  {
    name: 'LSS',
    type: {
      name: 'provenance',
      text: 'Filter Provenance',
    },
    options: {
      labels: ['Large scale studies'],
      colors: ['#9f9f9f'],
    },
    filterData: (variants: VariationVariants) =>
      getFilteredVariants(
        variants,
        (variantPos: TransformedProtvistaVariant) =>
          variantPos.sourceType === 'large_scale_study' ||
          variantPos.sourceType === 'mixed'
      ),
  },
];

const predictionScale = scaleLinear<string>()
  .domain([0, 1])
  .range([scaleColors.deleteriousColor, scaleColors.benignColor]);

const getPredictionColor = (siftScore?: number, polyphenScore?: number) => {
  return predictionScale(
    (siftScore || 0 + (1 - (polyphenScore || 1))) /
      (polyphenScore && siftScore ? 2 : 1)
  );
};

export const colorConfig = (variant: TransformedProtvistaVariant) => {
  const variantWrapper = [{ variants: [variant] }];
  const filterGroups = groupBy(filterConfig, (config) => config.name);
  if (
    filterGroups.disease &&
    filterGroups.disease[0].filterData(variantWrapper)[0].variants.length > 0
  ) {
    return scaleColors.UPDiseaseColor;
  }
  if (
    filterGroups.nonDisease &&
    filterGroups.nonDisease[0].filterData(variantWrapper)[0].variants.length > 0
  ) {
    return scaleColors.UPNonDiseaseColor;
  }
  if (
    filterGroups.uncertain &&
    filterGroups.uncertain[0].filterData(variantWrapper)[0].variants.length > 0
  ) {
    return scaleColors.othersColor;
  }
  if (
    filterGroups.predicted &&
    filterGroups.predicted[0].filterData(variantWrapper)[0].variants.length > 0
  ) {
    return getPredictionColor(variant.siftScore, variant.polyphenScore);
  }
  return scaleColors.othersColor;
};

export default filterConfig;
