import { type AgrParalogs } from '../../../../../types/agrParalogs';

// Source: https://www.alliancegenome.org/api/gene/HGNC:620/paralogs?filter.stringency=all&limit=10000
// Retrieved: 2026-06-03
const mock: AgrParalogs = {
  results: [
    {
      category: 'gene_to_gene_paralogy',
      searchable: false,
      geneToGeneParalogy: {
        subjectGene: {
          type: 'Gene',
          dateCreated: '2004-02-06T17:50:09Z',
          primaryExternalId: 'HGNC:620',
          dataProviderCrossReference: {
            referencedCurie: 'RGD:736021',
            displayName: 'RGD:736021',
            resourceDescriptorPage: {
              resourceDescriptor: {
                prefix: 'RGD',
                name: 'RGD',
                defaultUrlTemplate:
                  'https://rgd.mcw.edu/rgdweb/elasticResults.html?term=RGD:[%s]',
              },
              name: 'gene',
              urlTemplate:
                'https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=RGD:[%s]',
            },
          },
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
            species: {
              fullName: 'Homo sapiens',
              abbreviation: 'Hsa',
              displayName: 'HUMAN',
              phylogeneticOrder: 10,
            },
          },
          geneSymbol: {
            formatText: 'APP',
            displayText: 'APP',
          },
          geneFullName: {
            formatText: 'amyloid beta precursor protein',
            displayText: 'amyloid beta precursor protein',
          },
        },
        objectGene: {
          type: 'Gene',
          dateCreated: '2004-01-12T22:23:50Z',
          primaryExternalId: 'HGNC:598',
          dataProviderCrossReference: {
            referencedCurie: 'RGD:731852',
            displayName: 'RGD:731852',
            resourceDescriptorPage: {
              resourceDescriptor: {
                prefix: 'RGD',
                name: 'RGD',
                defaultUrlTemplate:
                  'https://rgd.mcw.edu/rgdweb/elasticResults.html?term=RGD:[%s]',
              },
              name: 'gene',
              urlTemplate:
                'https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=RGD:[%s]',
            },
          },
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
            species: {
              fullName: 'Homo sapiens',
              abbreviation: 'Hsa',
              displayName: 'HUMAN',
              phylogeneticOrder: 10,
            },
          },
          geneSymbol: {
            formatText: 'APLP2',
            displayText: 'APLP2',
          },
          geneFullName: {
            formatText: 'amyloid beta precursor like protein 2',
            displayText: 'amyloid beta precursor like protein 2',
          },
        },
        predictionMethodsMatched: [
          {
            name: 'SonicParanoid',
          },
          {
            name: 'Ensembl Compara',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'PANTHER',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'OMA',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'HGNC',
          },
          {
            name: 'SGD',
          },
        ],
        rank: 1,
        length: 810,
        similarity: 66,
        identity: 50,
      },
    },
    {
      category: 'gene_to_gene_paralogy',
      searchable: false,
      geneToGeneParalogy: {
        subjectGene: {
          type: 'Gene',
          dateCreated: '2004-02-06T17:50:09Z',
          primaryExternalId: 'HGNC:620',
          dataProviderCrossReference: {
            referencedCurie: 'RGD:736021',
            displayName: 'RGD:736021',
            resourceDescriptorPage: {
              resourceDescriptor: {
                prefix: 'RGD',
                name: 'RGD',
                defaultUrlTemplate:
                  'https://rgd.mcw.edu/rgdweb/elasticResults.html?term=RGD:[%s]',
              },
              name: 'gene',
              urlTemplate:
                'https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=RGD:[%s]',
            },
          },
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
            species: {
              fullName: 'Homo sapiens',
              abbreviation: 'Hsa',
              displayName: 'HUMAN',
              phylogeneticOrder: 10,
            },
          },
          geneSymbol: {
            formatText: 'APP',
            displayText: 'APP',
          },
          geneFullName: {
            formatText: 'amyloid beta precursor protein',
            displayText: 'amyloid beta precursor protein',
          },
        },
        objectGene: {
          type: 'Gene',
          dateCreated: '2004-02-06T17:50:27Z',
          primaryExternalId: 'HGNC:597',
          dataProviderCrossReference: {
            referencedCurie: 'RGD:736696',
            displayName: 'RGD:736696',
            resourceDescriptorPage: {
              resourceDescriptor: {
                prefix: 'RGD',
                name: 'RGD',
                defaultUrlTemplate:
                  'https://rgd.mcw.edu/rgdweb/elasticResults.html?term=RGD:[%s]',
              },
              name: 'gene',
              urlTemplate:
                'https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=RGD:[%s]',
            },
          },
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
            species: {
              fullName: 'Homo sapiens',
              abbreviation: 'Hsa',
              displayName: 'HUMAN',
              phylogeneticOrder: 10,
            },
          },
          geneSymbol: {
            formatText: 'APLP1',
            displayText: 'APLP1',
          },
          geneFullName: {
            formatText: 'amyloid beta precursor like protein 1',
            displayText: 'amyloid beta precursor like protein 1',
          },
        },
        predictionMethodsMatched: [
          {
            name: 'SonicParanoid',
          },
          {
            name: 'Ensembl Compara',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'PANTHER',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'HGNC',
          },
          {
            name: 'SGD',
          },
        ],
        rank: 2,
        length: 776,
        similarity: 51,
        identity: 36,
      },
    },
  ],
  total: 2,
  returnedRecords: 2,
  requestDuration: '0s',
  requestDate: '2026/06/03 13:44:58',
};

export default mock;
