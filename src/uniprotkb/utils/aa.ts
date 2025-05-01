import * as logging from '../../shared/utils/logging';

const aaToPhosphorylated = {
  R: 'Phosphoarginine',
  C: 'Phosphocysteine',
  H: 'Phosphohistidine',
  S: 'Phosphoserine',
  T: 'Phosphothreonine',
  Y: 'Phosphotyrosine',
};

const aaToSumoylated = {
  K: 'Sumoylated lysine',
};

export const phosphorylate = (aa: string) => {
  const AA = aa.toUpperCase();
  if (AA in aaToPhosphorylated) {
    return aaToPhosphorylated[AA as keyof typeof aaToPhosphorylated];
  }
  logging.error(`${AA} not a valid amino acid for phosphorylation`);
  return '';
};

export const sumoylate = (aa: string) => {
  const AA = aa.toUpperCase();
  if (AA in aaToSumoylated) {
    return aaToSumoylated[AA as keyof typeof aaToSumoylated];
  }
  logging.error(`${AA} not a valid amino acid for SUMOylation`);
  return '';
};
