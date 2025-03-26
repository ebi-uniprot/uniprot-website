// https://github.com/ebi-webcomponents/react-msa-viewer/tree/master/src/colorschemes
// see http://www.jalview.org/help/html/colourSchemes/ for JalView references
// https://www.jalview.org/version118/documentation.html#colour
// also see https://github.com/wilzbach/msa-colorschemes
// and http://www.bioinformatics.nl/~berndb/aacolour.html for lesk, MAE and cinema
export enum MsaColorScheme {
  ALIPHATIC = 'aliphatic',
  AROMATIC = 'aromatic',
  BURIED = 'buried', // in MSA-colorschemes; Same as buried-index
  BURIED_INDEX = 'buried_index', // in JalView
  CHARGED = 'charged',
  CINEMA = 'cinema', // in MSA-colorschemes
  CLUSTAL2 = 'clustal2', // in MSA-colorschemes
  CLUSTAL = 'clustal', // in JalView
  HELIX_PROPENSITY = 'helix_propensity', // in JalView
  HYDRO = 'hydro', // in MSA-colorschemes; in JalView -> hydrophobicity
  LESK = 'lesk', // in MSA-colorschemes
  MAE = 'mae', // in MSA-colorschemes
  NEGATIVE = 'negative',
  // NUCLEOTIDE = 'nucleotide', // in MSA-colorschemes; in JalView; Nucleotide-specific
  POLAR = 'polar',
  POSITIVE = 'positive',
  // PURINE = 'purine', // in MSA-colorschemes; same as Purine-Pyrimidine
  // PURINE_PYRIMIDINE = 'purine_pyrimidine', // in JalView; Nucleotide-specific
  SERINE_THREONINE = 'serine_threonine',
  STRAND_PROPENSITY = 'strand_propensity', // in MSA-colorschemes; in JalView
  TAYLOR = 'taylor', // in MSA-colorschemes; in JalView
  TURN_PROPENSITY = 'turn_propensity', // in MSA-colorschemes; in JalView
  ZAPPO = 'zappo', // in MSA-colorschemes; in JalView
  CONSERVATION = 'conservation',
}
// try to order from default then most to less "popular", and group by "types"
export const msaColorSchemeToString = {
  // default
  [MsaColorScheme.CLUSTAL]: 'Clustal',
  //
  [MsaColorScheme.CONSERVATION]: 'Similarity',
  // physical/chemical properties
  [MsaColorScheme.HYDRO]: 'Hydrophobicity',
  [MsaColorScheme.NEGATIVE]: 'Negative',
  [MsaColorScheme.POSITIVE]: 'Positive',
  [MsaColorScheme.CHARGED]: 'Charged',
  [MsaColorScheme.POLAR]: 'Polar',
  [MsaColorScheme.ALIPHATIC]: 'Aliphatic',
  [MsaColorScheme.AROMATIC]: 'Aromatic',
  // "structure"?
  [MsaColorScheme.BURIED_INDEX]: 'Buried Index',
  [MsaColorScheme.BURIED]: 'Buried Index',
  [MsaColorScheme.HELIX_PROPENSITY]: 'Helix Propensity',
  [MsaColorScheme.STRAND_PROPENSITY]: 'Strand Propensity',
  [MsaColorScheme.TURN_PROPENSITY]: 'Turn Propensity',
  //
  [MsaColorScheme.SERINE_THREONINE]: 'Serine Threonine',
  // random names for colour schemes
  [MsaColorScheme.CLUSTAL2]: 'Clustal 2',
  [MsaColorScheme.CINEMA]: 'Cinema',
  [MsaColorScheme.LESK]: 'Lesk',
  [MsaColorScheme.MAE]: 'MAE',
  [MsaColorScheme.TAYLOR]: 'Taylor',
  [MsaColorScheme.ZAPPO]: 'Zappo',
};

export const colorSchemeTree = [
  {
    label: msaColorSchemeToString[MsaColorScheme.CONSERVATION],
    id: MsaColorScheme.CONSERVATION,
  },
  {
    label: msaColorSchemeToString[MsaColorScheme.CLUSTAL],
    id: MsaColorScheme.CLUSTAL,
  },
  {
    label: 'Physical properties',
    id: 'physical properties',
    items: [
      {
        label: msaColorSchemeToString[MsaColorScheme.HYDRO],
        id: MsaColorScheme.HYDRO,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.NEGATIVE],
        id: MsaColorScheme.NEGATIVE,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.POSITIVE],
        id: MsaColorScheme.POSITIVE,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.CHARGED],
        id: MsaColorScheme.CHARGED,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.POLAR],
        id: MsaColorScheme.POLAR,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.ALIPHATIC],
        id: MsaColorScheme.ALIPHATIC,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.AROMATIC],
        id: MsaColorScheme.AROMATIC,
      },
    ],
  },
  {
    label: 'Structural properties',
    id: 'structural properties',
    items: [
      {
        label: msaColorSchemeToString[MsaColorScheme.BURIED_INDEX],
        id: MsaColorScheme.BURIED_INDEX,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.HELIX_PROPENSITY],
        id: MsaColorScheme.HELIX_PROPENSITY,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.STRAND_PROPENSITY],
        id: MsaColorScheme.STRAND_PROPENSITY,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.TURN_PROPENSITY],
        id: MsaColorScheme.TURN_PROPENSITY,
      },
    ],
  },
  {
    label: msaColorSchemeToString[MsaColorScheme.SERINE_THREONINE],
    id: MsaColorScheme.SERINE_THREONINE,
  },
  {
    label: 'Other',
    id: 'other',
    items: [
      {
        label: msaColorSchemeToString[MsaColorScheme.CLUSTAL2],
        id: MsaColorScheme.CLUSTAL2,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.CINEMA],
        id: MsaColorScheme.CINEMA,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.LESK],
        id: MsaColorScheme.LESK,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.MAE],
        id: MsaColorScheme.MAE,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.TAYLOR],
        id: MsaColorScheme.TAYLOR,
      },
      {
        label: msaColorSchemeToString[MsaColorScheme.ZAPPO],
        id: MsaColorScheme.ZAPPO,
      },
    ],
  },
];
