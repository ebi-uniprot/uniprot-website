module.exports = {
  transformData: () => ({
    sequence: 'ABCD',
    variants: [
      {
        protvistaFeatureId: 'featureA',
        variant: 'A',
        alternativeSequence: 'A',
        mutatedType: 'A',
        wildType: 'L',
        start: 10,
        being: 10,
        end: 10,
        sourceType: 'large_scale_study',
        accession: 'NC_000021.9:g.26170608A>C',
        somaticStatus: 0,
        xrefs: [
          {
            name: 'TOPMed',
            id: 'rs1446208112',
            url: ' https://www.ncbi.nlm.nih.gov/snp/rs1446208112#frequency_tab',
            alternativeUrl:
              'http://gnomad.broadinstitute.org/awesome?query=rs1446208112',
          },
          {
            name: 'gnomAD',
            id: 'rs1446208112',
            url: ' http://gnomad.broadinstitute.org/awesome?query=rs1446208112',
          },
        ],
        xrefNames: ['TOPMed', 'gnomAD'],
        cytogeneticBand: '21q21.3',
        genomicLocation: 'NC_000021.9:g.26170608A>C',
        locations: [
          {
            loc: 'p.Leu5Val',
            seqId: 'ENST00000346798',
            source: 'Ensembl',
          },
          {
            loc: 'c.13T>G',
            seqId: 'ENST00000346798',
            source: 'Ensembl',
          },
        ],
        codon: 'TTG/GTG',
        consequenceType: 'missense',
        predictions: [
          {
            predictionValType: 'benign',
            predictorType: 'multi coding',
            score: 0.001,
            predAlgorithmNameType: 'PolyPhen',
            sources: ['Ensembl'],
          },
          {
            predictionValType: 'tolerated',
            predictorType: 'multi coding',
            score: 0.26,
            predAlgorithmNameType: 'SIFT',
            sources: ['Ensembl'],
          },
        ],
        hasPredictions: true,
      },
      {
        protvistaFeatureId: 'featureB',
        wildType: 'B',
        start: 8,
        being: 8,
        descriptions: [{ value: 'a description', sources: ['uniprot'] }],
        end: 10,
        sourceType: 'large_scale_study',
        accession: 'NC_000021.9:g.26170608A>C',
        somaticStatus: 1,
        xrefs: [],
        xrefNames: [],
      },
    ],
  }),
};
