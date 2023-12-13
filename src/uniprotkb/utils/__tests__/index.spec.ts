import { getTextProcessingParts } from '../regexes';

const testCases: [string, string[]][] = [
  [
    'Proteolytically processed under normal cellular conditions. Cleavage either by alpha-secretase, beta-secretase or theta-secretase leads to generation and extracellular release of soluble APP peptides, S-APP-alpha and S-APP-beta, and the retention of corresponding membrane-anchored C-terminal fragments, C80, C83 and C99. Subsequent processing of C80 and C83 by gamma-secretase yields P3 peptides. This is the major secretory pathway and is non-amyloidogenic. Alternatively, presenilin/nicastrin-mediated gamma-secretase processing of C99 releases the amyloid-beta proteins, amyloid-beta protein 40 and amyloid-beta protein 42, major components of amyloid plaques, and the cytotoxic C-terminal fragments, gamma-CTF(50), gamma-CTF(57) and gamma-CTF(59). PSEN1 cleavage is more efficient with C83 than with C99 as substrate (in vitro) (PubMed:30630874). Amyloid-beta protein 40 and Amyloid-beta protein 42 are cleaved by ACE (PubMed:11604391, PubMed:16154999). Many other minor amyloid-beta peptides, amyloid-beta 1-X peptides, are found in cerebral spinal fluid (CSF) including the amyloid-beta X-15 peptides, produced from the cleavage by alpha-secretase and all terminating at Gln-686',
    [
      'Proteolytically processed under normal cellular conditions. Cleavage either by alpha-secretase, beta-secretase or theta-secretase leads to generation and extracellular release of soluble APP peptides, S-APP-alpha and S-APP-beta, and the retention of corresponding membrane-anchored C-terminal fragments, C80, C83 and C99. Subsequent processing of C80 and C83 by gamma-secretase yields P3 peptides. This is the major secretory pathway and is non-amyloidogenic. Alternatively, presenilin/nicastrin-mediated gamma-secretase processing of C99 releases the amyloid-beta proteins, amyloid-beta protein 40 and amyloid-beta protein 42, major components of amyloid plaques, and the cytotoxic C-terminal fragments, gamma-CTF',
      '(50)',
      ', gamma-CTF',
      '(57)',
      ' and gamma-CTF',
      '(59)',
      '. PSEN1 cleavage is more efficient with C83 than with C99 as substrate (in vitro) (',
      'PubMed:30630874',
      '). Amyloid-beta protein 40 and Amyloid-beta protein 42 are cleaved by ACE (',
      'PubMed:11604391',
      ', ',
      'PubMed:16154999',
      '). Many other minor amyloid-beta peptides, amyloid-beta 1-X peptides, are found in cerebral spinal fluid (CSF) including the amyloid-beta X-15 peptides, produced from the cleavage by alpha-secretase and all terminating at Gln-686',
    ],
  ],
  [
    'in isoform APP695, isoform L-APP696, isoform L-APP677 and isoform APP714',
    [
      'in ',
      'isoform APP695',
      ', ',
      'isoform L-APP696',
      ', ',
      'isoform L-APP677',
      ' and ',
      'isoform APP714',
      '',
    ],
  ],
  [
    'in CAA-APP; Italian type; dbSNP:rs63750921',
    ['in CAA-APP; Italian type; ', 'dbSNP:rs63750921', ''],
  ],
];

describe('getNeedsTextProcessingParts', () => {
  test.each(testCases)('should return the parts for text', (text, parts) => {
    expect(getTextProcessingParts(text)).toEqual(parts);
  });
});
