import { type AgrOrthologs } from '../../../../../types/agrOrthologs';

// Source: https://www.alliancegenome.org/api/gene/HGNC:620/orthologs?filter.stringency=all&limit=10000
// Retrieved: 2026-06-04
const mock: AgrOrthologs = {
  results: [
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'MGI:88059',
        },
      ],
      geneAnnotationsMap: {
        'MGI:88059': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'MGI:88059',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'MGI:88059',
          taxon: {
            curie: 'NCBITaxon:10090',
            name: 'Mus musculus',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'App',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'HGNC',
          },
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'SonicParanoid',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'ZFIN:ZDB-GENE-000616-13',
        },
      ],
      geneAnnotationsMap: {
        'ZFIN:ZDB-GENE-000616-13': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'ZFIN:ZDB-GENE-000616-13',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'ZFIN:ZDB-GENE-000616-13',
          taxon: {
            curie: 'NCBITaxon:7955',
            name: 'Danio rerio',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'appa',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'SonicParanoid',
          },
          {
            name: 'ZFIN',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'all',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'FB:FBgn0031560',
        },
      ],
      geneAnnotationsMap: {
        'FB:FBgn0031560': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'FB:FBgn0031560',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'FB:FBgn0031560',
          taxon: {
            curie: 'NCBITaxon:7227',
            name: 'Drosophila melanogaster',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'CG16713',
          },
        },
        isBestScore: {
          name: 'No',
        },
        isBestScoreReverse: {
          name: 'No',
        },
        confidence: {
          name: 'low',
        },
        strictFilter: false,
        moderateFilter: false,
        predictionMethodsMatched: [
          {
            name: 'PhylomeDB',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'SonicParanoid',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'OMA',
          },
          {
            name: 'Ensembl Compara',
          },
          {
            name: 'OrthoInspector',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'Xenbase:XB-GENE-17345003',
        },
      ],
      geneAnnotationsMap: {
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        'Xenbase:XB-GENE-17345003': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'Xenbase:XB-GENE-17345003',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'Xenbase:XB-GENE-17345003',
          taxon: {
            curie: 'NCBITaxon:8355',
            name: 'Xenopus laevis',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'app.S',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'Xenbase',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'Xenbase:XB-GENE-479158',
        },
      ],
      geneAnnotationsMap: {
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        'Xenbase:XB-GENE-479158': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'Xenbase:XB-GENE-479158',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'Xenbase:XB-GENE-479158',
          taxon: {
            curie: 'NCBITaxon:8355',
            name: 'Xenopus laevis',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'app.L',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'Xenbase',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'WB:WBGene00000149',
        },
      ],
      geneAnnotationsMap: {
        'WB:WBGene00000149': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'WB:WBGene00000149',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'WB:WBGene00000149',
          taxon: {
            curie: 'NCBITaxon:6239',
            name: 'Caenorhabditis elegans',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'apl-1',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: false,
        predictionMethodsMatched: [
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'SonicParanoid',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'FB:FBgn0000108',
        },
      ],
      geneAnnotationsMap: {
        'FB:FBgn0000108': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'FB:FBgn0000108',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'FB:FBgn0000108',
          taxon: {
            curie: 'NCBITaxon:7227',
            name: 'Drosophila melanogaster',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'Appl',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'No',
        },
        confidence: {
          name: 'moderate',
        },
        strictFilter: true,
        moderateFilter: false,
        predictionMethodsMatched: [
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'SonicParanoid',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'PhylomeDB',
          },
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'ZFIN:ZDB-GENE-020220-1',
        },
      ],
      geneAnnotationsMap: {
        'ZFIN:ZDB-GENE-020220-1': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: true,
          geneIdentifier: 'ZFIN:ZDB-GENE-020220-1',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'ZFIN:ZDB-GENE-020220-1',
          taxon: {
            curie: 'NCBITaxon:7955',
            name: 'Danio rerio',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'appb',
          },
        },
        isBestScore: {
          name: 'No',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'moderate',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'ZFIN',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'SonicParanoid',
          },
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'Ensembl Compara',
          },
          {
            name: 'OrthoInspector',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'Xenbase:XB-GENE-479154',
        },
      ],
      geneAnnotationsMap: {
        'Xenbase:XB-GENE-479154': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'Xenbase:XB-GENE-479154',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'Xenbase:XB-GENE-479154',
          taxon: {
            curie: 'NCBITaxon:8364',
            name: 'Xenopus tropicalis',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'app',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: false,
        predictionMethodsMatched: [
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'SonicParanoid',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
          {
            name: 'HGNC',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'all',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'RGD:69257',
        },
      ],
      geneAnnotationsMap: {
        'RGD:69257': {
          hasDiseaseAnnotations: false,
          hasExpressionAnnotations: false,
          geneIdentifier: 'RGD:69257',
        },
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'RGD:69257',
          taxon: {
            curie: 'NCBITaxon:10116',
            name: 'Rattus norvegicus',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'Aplp1',
          },
        },
        isBestScore: {
          name: 'No',
        },
        isBestScoreReverse: {
          name: 'No',
        },
        confidence: {
          name: 'low',
        },
        strictFilter: false,
        moderateFilter: false,
        predictionMethodsMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'SonicParanoid',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'Hieranoid',
          },
          {
            name: 'HGNC',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PhylomeDB',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
        ],
      },
    },
    {
      category: 'gene_to_gene_orthology',
      searchable: false,
      stringencyFilter: 'stringent',
      geneAnnotations: [
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'RGD:2139',
        },
      ],
      geneAnnotationsMap: {
        'HGNC:620': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: false,
          geneIdentifier: 'HGNC:620',
        },
        'RGD:2139': {
          hasDiseaseAnnotations: true,
          hasExpressionAnnotations: true,
          geneIdentifier: 'RGD:2139',
        },
      },
      geneToGeneOrthologyGenerated: {
        subjectGene: {
          type: 'Gene',
          primaryExternalId: 'HGNC:620',
          taxon: {
            curie: 'NCBITaxon:9606',
            name: 'Homo sapiens',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'APP',
          },
        },
        objectGene: {
          type: 'Gene',
          primaryExternalId: 'RGD:2139',
          taxon: {
            curie: 'NCBITaxon:10116',
            name: 'Rattus norvegicus',
            descendantCount: 0,
          },
          geneSymbol: {
            displayText: 'App',
          },
        },
        isBestScore: {
          name: 'Yes',
        },
        isBestScoreReverse: {
          name: 'Yes',
        },
        confidence: {
          name: 'high',
        },
        strictFilter: true,
        moderateFilter: true,
        predictionMethodsMatched: [
          {
            name: 'Hieranoid',
          },
          {
            name: 'InParanoid',
          },
          {
            name: 'OMA',
          },
          {
            name: 'OrthoFinder',
          },
          {
            name: 'OrthoInspector',
          },
          {
            name: 'PANTHER',
          },
          {
            name: 'PhylomeDB',
          },
          {
            name: 'HGNC',
          },
          {
            name: 'SonicParanoid',
          },
        ],
        predictionMethodsNotMatched: [
          {
            name: 'Ensembl Compara',
          },
        ],
        predictionMethodsNotCalled: [
          {
            name: 'Xenbase',
          },
          {
            name: 'ZFIN',
          },
        ],
      },
    },
  ],
  total: 11,
  returnedRecords: 11,
  requestDate: '2026/06/04 17:18:41',
};

export default mock;
