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

const aaToUbiquitinated = {
  K: 'Ubiquitinated lysine',
  S: 'Ubiquitinated serine',
  T: 'Ubiquitinated threonine',
  C: 'Ubiquitinated cysteine',
};

const aaToAcetylated = {
  S: 'Acetylserine',
  A: 'Acetylalanine',
  G: 'Acetylglycine',
  T: 'Acetylthreonine',
  V: 'Acetylvaline',
  C: 'Acetylcysteine',
  E: 'Acetylglutamin acid',
  D: 'Acetylaspartic acid',
  N: 'Acetylasparagine',
  Q: 'Acetylglutamine',
  L: 'Acetyllucine',
  I: 'Acetlyisolucine',
  W: 'Acetyltryptophan',
  F: 'Acetylphenylalanine',
  K: 'Acetyllysine',
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

export const ubiquitinate = (aa: string) => {
  const AA = aa.toUpperCase();
  if (AA in aaToUbiquitinated) {
    return aaToUbiquitinated[AA as keyof typeof aaToUbiquitinated];
  }
  logging.error(`${AA} not a valid amino acid for Ubiquitinylation`);
  return '';
};

export const acetylate = (aa: string) => {
  const AA = aa.toUpperCase();
  if (AA in aaToAcetylated) {
    return aaToAcetylated[AA as keyof typeof aaToAcetylated];
  }
  logging.error(`${AA} not a valid amino acid for Acetylation`);
  return '';
};
