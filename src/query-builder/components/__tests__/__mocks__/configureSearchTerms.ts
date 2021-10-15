import { keyBy } from 'lodash-es';

import { flatten } from '../../../utils/parseAndMatchQuery';

import { SearchTermType } from '../../../types/searchTypes';

// TODO: remove type casting from configureSearchTerms https://www.ebi.ac.uk/panda/jira/browse/TRM-26787

// Source: https://www.ebi.ac.uk/uniprot/beta/api/configure/uniprotkb/search-fields
// Retrieved 2021-10-14
const configureSearchTerms = [
  {
    id: 'accession_field',
    label: 'UniProtKB AC',
    itemType: 'single',
    term: 'accession',
    dataType: 'string',
    fieldType: 'general',
    example: 'P12345',
    regex:
      '(?i)([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z]([0-9][A-Z][A-Z0-9]{2}){1,2}[0-9])(-[0-9]+)?',
  },
  {
    id: 'id_field',
    label: 'Entry Name [ID]',
    itemType: 'single',
    term: 'id',
    dataType: 'string',
    fieldType: 'general',
    example: 'P53_HUMAN',
  },
  {
    id: 'protein_name_field',
    label: 'Protein Name [DE]',
    itemType: 'single',
    term: 'protein_name',
    dataType: 'string',
    fieldType: 'general',
    example: 'mas5',
  },
  {
    id: 'gene_field',
    label: 'Gene Name [GN]',
    itemType: 'single',
    term: 'gene',
    dataType: 'string',
    fieldType: 'general',
    example: 'ydj1',
  },
  {
    id: 'organism_name_field',
    label: 'Organism [OS]',
    itemType: 'single',
    term: 'organism_name',
    dataType: 'string',
    fieldType: 'general',
    example: 'saccharomyces',
    autoComplete: '/suggester?dict=organism&query=?',
    autoCompleteQueryTerm: 'organism_id',
  },
  {
    id: 'taxonomy_name',
    label: 'Taxonomy [OC]',
    itemType: 'single',
    term: 'taxonomy_name',
    dataType: 'string',
    fieldType: 'general',
    example: 'human',
    autoComplete: '/suggester?dict=taxonomy&query=?',
    autoCompleteQueryTerm: 'taxonomy_id',
  },
  {
    id: 'virus_host_name',
    label: 'Virus host',
    itemType: 'single',
    term: 'virus_host_name',
    dataType: 'string',
    fieldType: 'general',
    example: 'human',
    autoComplete: '/suggester?dict=host&query=?',
    autoCompleteQueryTerm: 'virus_host_id',
  },
  {
    id: 'existence',
    label: 'Protein Existence [PE]',
    itemType: 'single',
    term: 'existence',
    dataType: 'enum',
    fieldType: 'general',
    example: '1',
    values: [
      {
        name: 'Evidence at protein level',
        value: '1',
      },
      {
        name: 'Evidence at transcript level',
        value: '2',
      },
      {
        name: 'Inferred from homology',
        value: '3',
      },
      {
        name: 'Predicted',
        value: '4',
      },
      {
        name: 'Uncertain',
        value: '5',
      },
    ],
  },
  {
    id: 'function',
    label: 'Function',
    itemType: 'group',
    items: [
      {
        id: 'ec',
        label: 'Enzyme classification [EC]',
        itemType: 'single',
        term: 'ec',
        dataType: 'string',
        fieldType: 'general',
        example: '1.1.2.3',
        autoComplete: '/suggester?dict=ec&query=?',
        autoCompleteQueryTerm: 'ec',
      },
      {
        id: 'cofactors',
        label: 'Cofactors',
        itemType: 'group',
        items: [
          {
            id: 'chebi_term',
            label: 'ChEBI term',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_cofactor_chebi',
                itemType: 'single',
                term: 'cc_cofactor_chebi',
                dataType: 'string',
                fieldType: 'general',
                example: '29105',
                autoComplete: '/suggester?dict=chebi&query=?',
                autoCompleteQueryTerm: 'cc_cofactor_chebi',
              },
              {
                id: 'ccev_cofactor_chebi',
                itemType: 'single',
                term: 'ccev_cofactor_chebi',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'note',
            label: 'Note',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_cofactor_note',
                itemType: 'single',
                term: 'cc_cofactor_note',
                dataType: 'string',
                fieldType: 'general',
                example: 'subunit',
              },
              {
                id: 'ccev_cofactor_note',
                itemType: 'single',
                term: 'ccev_cofactor_note',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'ECO_0000269',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'biophysicochemical_properties',
        label: 'Biophysicochemical properties',
        itemType: 'group',
        items: [
          {
            id: 'biophysicochemical_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp',
                itemType: 'single',
                term: 'cc_bpcp',
                dataType: 'string',
                fieldType: 'general',
                example: '"some value"',
              },
              {
                id: 'ccev_bpcp',
                itemType: 'single',
                term: 'ccev_bpcp',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'automatic',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'biophysicochemical_absorption',
            label: 'Absorption',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp_absorption',
                itemType: 'single',
                term: 'cc_bpcp_absorption',
                dataType: 'string',
                fieldType: 'general',
                example: 'prosthetic',
              },
              {
                id: 'ccev_bpcp_absorption',
                itemType: 'single',
                term: 'ccev_bpcp_absorption',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'ECO_0000213',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'biophysicochemical_kinetics',
            label: 'Kinetics',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp_kinetics',
                itemType: 'single',
                term: 'cc_bpcp_kinetics',
                dataType: 'string',
                fieldType: 'general',
                example: 'aspartate',
              },
              {
                id: 'ccev_bpcp_kinetics',
                itemType: 'single',
                term: 'ccev_bpcp_kinetics',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'experimental',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'biophysicochemical_ph_dependence',
            label: 'pH dependence',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp_ph_dependence',
                itemType: 'single',
                term: 'cc_bpcp_ph_dependence',
                dataType: 'string',
                fieldType: 'general',
                example: 'optimum',
              },
              {
                id: 'ccev_bpcp_ph_dependence',
                itemType: 'single',
                term: 'ccev_bpcp_ph_dependence',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'ECO_0000305',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'biophysicochemical_redox_potential',
            label: 'Redox potential',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp_redox_potential',
                itemType: 'single',
                term: 'cc_bpcp_redox_potential',
                dataType: 'string',
                fieldType: 'general',
                example: 'siroheme',
              },
              {
                id: 'ccev_bpcp_redox_potential',
                itemType: 'single',
                term: 'ccev_bpcp_redox_potential',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'biophysicochemical_temperature_dependence',
            label: 'Temperature dependence',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_bpcp_temp_dependence',
                itemType: 'single',
                term: 'cc_bpcp_temp_dependence',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ccev_bpcp_temp_dependence',
                itemType: 'single',
                term: 'ccev_bpcp_temp_dependence',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'catalytic_activity',
        label: 'Catalytic Activity',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_catalytic_activity_field',
            itemType: 'single',
            term: 'cc_catalytic_activity',
            dataType: 'string',
            fieldType: 'general',
            example: 'tyrosine',
            autoComplete: '/suggester?dict=catalytic_activity&query=?',
            autoCompleteQueryTerm: 'cc_catalytic_activity',
          },
          {
            id: 'ccev_catalytic_activity',
            itemType: 'single',
            term: 'ccev_catalytic_activity',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'activity_regulation',
        label: 'Activity regulation',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_activity_regulation',
            itemType: 'single',
            term: 'cc_activity_regulation',
            dataType: 'string',
            fieldType: 'general',
            example: 'inhibited',
          },
          {
            id: 'ccev_activity_regulation',
            itemType: 'single',
            term: 'ccev_activity_regulation',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'function_cc',
        label: 'Function [CC]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_function',
            itemType: 'single',
            term: 'cc_function',
            dataType: 'string',
            fieldType: 'general',
            example: 'enzyme',
          },
          {
            id: 'ccev_function',
            itemType: 'single',
            term: 'ccev_function',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'experimental',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'caution',
        label: 'Caution',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_caution',
            itemType: 'single',
            term: 'cc_caution',
            dataType: 'string',
            fieldType: 'general',
            example: 'kinase',
          },
          {
            id: 'ccev_caution',
            itemType: 'single',
            term: 'ccev_caution',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sites',
        label: 'Sites',
        itemType: 'group',
        items: [
          {
            id: 'sites_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_sites',
                itemType: 'single',
                term: 'ft_sites',
                dataType: 'string',
                fieldType: 'general',
                example: 'translocation',
              },
              {
                id: 'ftlen_sites',
                itemType: 'single',
                term: 'ftlen_sites',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_sites',
                itemType: 'single',
                term: 'ftev_sites',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'sites_active_site',
            label: 'Active site',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_act_site',
                itemType: 'single',
                term: 'ft_act_site',
                dataType: 'string',
                fieldType: 'general',
                example: 'phosphocysteine',
              },
              {
                id: 'ftlen_act_site',
                itemType: 'single',
                term: 'ftlen_act_site',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_act_site',
                itemType: 'single',
                term: 'ftev_act_site',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'sites_metal_binding',
            label: 'Metal binding',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_metal',
                itemType: 'single',
                term: 'ft_metal',
                dataType: 'string',
                fieldType: 'general',
                example: 'phosphocysteine',
              },
              {
                id: 'ftlen_metal',
                itemType: 'single',
                term: 'ftlen_metal',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_metal',
                itemType: 'single',
                term: 'ftev_metal',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'sites_binding_site',
            label: 'Binding site',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_binding',
                itemType: 'single',
                term: 'ft_binding',
                dataType: 'string',
                fieldType: 'general',
                example: 'phosphocysteine',
              },
              {
                id: 'ftlen_binding',
                itemType: 'single',
                term: 'ftlen_binding',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_binding',
                itemType: 'single',
                term: 'ftev_binding',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'sites_other',
            label: 'Other',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_site',
                itemType: 'single',
                term: 'ft_site',
                dataType: 'string',
                fieldType: 'general',
                example: 'phosphocysteine',
              },
              {
                id: 'ftlen_site',
                itemType: 'single',
                term: 'ftlen_site',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_site',
                itemType: 'single',
                term: 'ftev_site',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'calcium_binding',
        label: 'Calcium binding',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_ca_bind',
            itemType: 'single',
            term: 'ft_ca_bind',
            dataType: 'string',
            fieldType: 'general',
            example: 'site',
          },
          {
            id: 'ftlen_ca_bind',
            itemType: 'single',
            term: 'ftlen_ca_bind',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_ca_bind',
            itemType: 'single',
            term: 'ftev_ca_bind',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dna_binding',
        label: 'DNA binding',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_dna_bind',
            itemType: 'single',
            term: 'ft_dna_bind',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_dna_bind',
            itemType: 'single',
            term: 'ftlen_dna_bind',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_dna_bind',
            itemType: 'single',
            term: 'ftev_dna_bind',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'nucleotide_binding',
        label: 'Nucleotide binding',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_np_bind',
            itemType: 'single',
            term: 'ft_np_bind',
            dataType: 'string',
            fieldType: 'general',
            example: 'NADP',
          },
          {
            id: 'ftlen_np_bind',
            itemType: 'single',
            term: 'ftlen_np_bind',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_np_bind',
            itemType: 'single',
            term: 'ftev_np_bind',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pathway',
        label: 'Pathway',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_pathway',
            itemType: 'single',
            term: 'cc_pathway',
            dataType: 'string',
            fieldType: 'general',
            example: 'metabolism',
          },
          {
            id: 'ccev_pathway',
            itemType: 'single',
            term: 'ccev_pathway',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'miscellaneous_cc',
        label: 'Miscellaneous [CC]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_miscellaneous',
            itemType: 'single',
            term: 'cc_miscellaneous',
            dataType: 'string',
            fieldType: 'general',
            example: 'abscisic',
          },
          {
            id: 'ccev_miscellaneous',
            itemType: 'single',
            term: 'ccev_miscellaneous',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'subcellular',
    label: 'Subcellular location',
    itemType: 'group',
    items: [
      {
        id: 'cc_subcellular',
        label: 'Subcellular location [CC]',
        itemType: 'group',
        items: [
          {
            id: 'subcellular_location_term',
            label: 'Subcellular location term',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_scl_term_field',
                itemType: 'single',
                term: 'cc_scl_term',
                dataType: 'string',
                fieldType: 'general',
                example: 'membrane',
                autoComplete: '/suggester?dict=subcell&query=?',
                autoCompleteQueryTerm: 'cc_scl_term',
              },
              {
                id: 'ccev_scl_term',
                itemType: 'single',
                term: 'ccev_scl_term',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'subcellular_location_note',
            label: 'Subcellular location note',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_scl_note',
                itemType: 'single',
                term: 'cc_scl_note',
                dataType: 'string',
                fieldType: 'general',
                example: 'membrane',
              },
              {
                id: 'ccev_scl_note',
                itemType: 'single',
                term: 'ccev_scl_note',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'transmembrane',
        label: 'Transmembrane',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_transmem',
            itemType: 'single',
            term: 'ft_transmem',
            dataType: 'string',
            fieldType: 'general',
            example: 'forming',
          },
          {
            id: 'ftlen_transmem',
            itemType: 'single',
            term: 'ftlen_transmem',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_transmem',
            itemType: 'single',
            term: 'ftev_transmem',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'topological_domain',
        label: 'Topological domain',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_topo_dom',
            itemType: 'single',
            term: 'ft_topo_dom',
            dataType: 'string',
            fieldType: 'general',
            example: 'forming',
          },
          {
            id: 'ftlen_topo_dom',
            itemType: 'single',
            term: 'ftlen_topo_dom',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_topo_dom',
            itemType: 'single',
            term: 'ftev_topo_dom',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'intramembrane',
        label: 'Intramembrane',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_intramem',
            itemType: 'single',
            term: 'ft_intramem',
            dataType: 'string',
            fieldType: 'general',
            example: 'forming',
          },
          {
            id: 'ftlen_intramem',
            itemType: 'single',
            term: 'ftlen_intramem',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_intramem',
            itemType: 'single',
            term: 'ftev_intramem',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pathology_biotech',
    label: 'Pathology & Biotech',
    itemType: 'group',
    items: [
      {
        id: 'disease',
        label: 'Disease',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_disease',
            itemType: 'single',
            term: 'cc_disease',
            dataType: 'string',
            fieldType: 'general',
            example: 'nephrotic',
          },
          {
            id: 'ccev_disease',
            itemType: 'single',
            term: 'ccev_disease',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'alergenic_properties',
        label: 'Alergenic properties',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_allergen',
            itemType: 'single',
            term: 'cc_allergen',
            dataType: 'string',
            fieldType: 'general',
            example: 'allergic',
          },
          {
            id: 'ccev_allergen',
            itemType: 'single',
            term: 'ccev_allergen',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'toxic_dose',
        label: 'Toxic dose',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_toxic_dose',
            itemType: 'single',
            term: 'cc_toxic_dose',
            dataType: 'string',
            fieldType: 'general',
            example: 'intracistenal',
          },
          {
            id: 'ccev_toxic_dose',
            itemType: 'single',
            term: 'ccev_toxic_dose',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'biotechnological_use',
        label: 'Biotechnological use',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_biotechnology',
            itemType: 'single',
            term: 'cc_biotechnology',
            dataType: 'string',
            fieldType: 'general',
            example: 'vaccine',
          },
          {
            id: 'ccev_biotechnology',
            itemType: 'single',
            term: 'ccev_biotechnology',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pharmaceutical_use',
        label: 'Pharmaceutical use',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_pharmaceutical',
            itemType: 'single',
            term: 'cc_pharmaceutical',
            dataType: 'string',
            fieldType: 'general',
            example: 'peptide',
          },
          {
            id: 'ccev_pharmaceutical',
            itemType: 'single',
            term: 'ccev_pharmaceutical',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'disruption_phenotype',
        label: 'Disruption phenotype',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_disruption_phenotype',
            itemType: 'single',
            term: 'cc_disruption_phenotype',
            dataType: 'string',
            fieldType: 'general',
            example: 'infected',
          },
          {
            id: 'ccev_disruption_phenotype',
            itemType: 'single',
            term: 'ccev_disruption_phenotype',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mutagenesis',
        label: 'Mutagenesis',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_mutagen',
            itemType: 'single',
            term: 'ft_mutagen',
            dataType: 'string',
            fieldType: 'general',
            example: 'phosphatase',
          },
          {
            id: 'ftlen_mutagen',
            itemType: 'single',
            term: 'ftlen_mutagen',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_mutagen',
            itemType: 'single',
            term: 'ftev_mutagen',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ptm_processing',
    label: 'PTM/Processing',
    itemType: 'group',
    items: [
      {
        id: 'post_translational_modification_cc',
        label: 'Post-translational modification [CC]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_ptm',
            itemType: 'single',
            term: 'cc_ptm',
            dataType: 'string',
            fieldType: 'general',
            example: 'mitosis',
          },
          {
            id: 'ccev_ptm',
            itemType: 'single',
            term: 'ccev_ptm',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'modified_residue_ft',
        label: 'Modified residue [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_mod_res',
            itemType: 'single',
            term: 'ft_mod_res',
            dataType: 'string',
            fieldType: 'general',
            example: 'phosphoserine',
          },
          {
            id: 'ftlen_mod_res',
            itemType: 'single',
            term: 'ftlen_mod_res',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_mod_res',
            itemType: 'single',
            term: 'ftev_mod_res',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'lipidation_ft',
        label: 'Lipidation [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_lipid',
            itemType: 'single',
            term: 'ft_lipid',
            dataType: 'string',
            fieldType: 'general',
            example: 'cysteine',
          },
          {
            id: 'ftlen_lipid',
            itemType: 'single',
            term: 'ftlen_lipid',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_lipid',
            itemType: 'single',
            term: 'ftev_lipid',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'glycosylation_ft',
        label: 'Glycosylation [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_carbohyd',
            itemType: 'single',
            term: 'ft_carbohyd',
            dataType: 'string',
            fieldType: 'general',
            example: 'cysteine',
          },
          {
            id: 'ftlen_carbohyd',
            itemType: 'single',
            term: 'ftlen_carbohyd',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_carbohyd',
            itemType: 'single',
            term: 'ftev_carbohyd',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'disulfide_bond_ft',
        label: 'Disulfide bond [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_disulfid',
            itemType: 'single',
            term: 'ft_disulfid',
            dataType: 'string',
            fieldType: 'general',
            example: 'reversible',
          },
          {
            id: 'ftlen_disulfid',
            itemType: 'single',
            term: 'ftlen_disulfid',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_disulfid',
            itemType: 'single',
            term: 'ftev_disulfid',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cross_link_ft',
        label: 'Cross-link [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_crosslnk',
            itemType: 'single',
            term: 'ft_crosslnk',
            dataType: 'string',
            fieldType: 'general',
            example: 'lysine',
          },
          {
            id: 'ftlen_crosslnk',
            itemType: 'single',
            term: 'ftlen_crosslnk',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_crosslnk',
            itemType: 'single',
            term: 'ftev_crosslnk',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'molecule_processing',
        label: 'Molecule Processing [FT]',
        itemType: 'group',
        items: [
          {
            id: 'any_molecule_processing',
            label: 'Any molecule processing',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_molecule_processing',
                itemType: 'single',
                term: 'ft_molecule_processing',
                dataType: 'string',
                fieldType: 'general',
                example: 'disulfide',
              },
              {
                id: 'ftlen_molecule_processing',
                itemType: 'single',
                term: 'ftlen_molecule_processing',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_molecule_processing',
                itemType: 'single',
                term: 'ftev_molecule_processing',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'chain',
            label: 'Chain',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_chain',
                itemType: 'single',
                term: 'ft_chain',
                dataType: 'string',
                fieldType: 'general',
                example: 'kinase',
              },
              {
                id: 'ftlen_chain',
                itemType: 'single',
                term: 'ftlen_chain',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_chain',
                itemType: 'single',
                term: 'ftev_chain',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'initiator_methionine',
            label: 'Initiator methionine',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_init_met',
                itemType: 'single',
                term: 'ft_init_met',
                dataType: 'string',
                fieldType: 'general',
                example: 'Removed',
              },
              {
                id: 'ftlen_init_met',
                itemType: 'single',
                term: 'ftlen_init_met',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_init_met',
                itemType: 'single',
                term: 'ftev_init_met',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'peptide',
            label: 'Peptide',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_peptide',
                itemType: 'single',
                term: 'ft_peptide',
                dataType: 'string',
                fieldType: 'general',
                example: 'Removed',
              },
              {
                id: 'ftlen_peptide',
                itemType: 'single',
                term: 'ftlen_peptide',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_peptide',
                itemType: 'single',
                term: 'ftev_peptide',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'signal_peptide',
            label: 'Signal Peptide',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_signal',
                itemType: 'single',
                term: 'ft_signal',
                dataType: 'string',
                fieldType: 'general',
                example: 'cleaved',
              },
              {
                id: 'ftlen_signal',
                itemType: 'single',
                term: 'ftlen_signal',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_signal',
                itemType: 'single',
                term: 'ftev_signal',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'propeptide',
            label: 'Propeptide',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_propep',
                itemType: 'single',
                term: 'ft_propep',
                dataType: 'string',
                fieldType: 'general',
                example: 'Activation peptide',
              },
              {
                id: 'ftlen_propep',
                itemType: 'single',
                term: 'ftlen_propep',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_propep',
                itemType: 'single',
                term: 'ftev_propep',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'transit_peptide',
            label: 'Transit Peptide',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_transit',
                itemType: 'single',
                term: 'ft_transit',
                dataType: 'string',
                fieldType: 'general',
                example: 'Mitochondrion',
              },
              {
                id: 'ftlen_transit',
                itemType: 'single',
                term: 'ftlen_transit',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_transit',
                itemType: 'single',
                term: 'ftev_transit',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'expression',
    label: 'Expression',
    itemType: 'group',
    items: [
      {
        id: 'developmental_stage',
        label: 'Developmental stage',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_developmental_stage',
            itemType: 'single',
            term: 'cc_developmental_stage',
            dataType: 'string',
            fieldType: 'general',
            example: 'brain',
          },
          {
            id: 'ccev_developmental_stage',
            itemType: 'single',
            term: 'ccev_developmental_stage',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'induction',
        label: 'Induction',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_induction',
            itemType: 'single',
            term: 'cc_induction',
            dataType: 'string',
            fieldType: 'general',
            example: 'calcium',
          },
          {
            id: 'ccev_induction',
            itemType: 'single',
            term: 'ccev_induction',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'tissue_specificity',
        label: 'Tissue specificity',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_tissue_specificity',
            itemType: 'single',
            term: 'cc_tissue_specificity',
            dataType: 'string',
            fieldType: 'general',
            example: 'pancreas',
          },
          {
            id: 'ccev_tissue_specificity',
            itemType: 'single',
            term: 'ccev_tissue_specificity',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'interaction',
    label: 'Interaction',
    itemType: 'group',
    items: [
      {
        id: 'interactor',
        label: 'Binary Interaction',
        itemType: 'single',
        term: 'interactor',
        dataType: 'string',
        fieldType: 'general',
        example: 'EBI-1042898',
      },
      {
        id: 'subunit_structure',
        label: 'Subunit structure',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_subunit',
            itemType: 'single',
            term: 'cc_subunit',
            dataType: 'string',
            fieldType: 'general',
            example: 'homodimer',
          },
          {
            id: 'ccev_subunit',
            itemType: 'single',
            term: 'ccev_subunit',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'structure',
    label: 'Structure',
    itemType: 'group',
    items: [
      {
        id: 'structure_3d',
        label: '3D Structure',
        itemType: 'single',
        term: 'structure_3d',
        dataType: 'boolean',
        fieldType: 'general',
        example: 'true',
        regex: '^true|false$',
        values: [
          {
            name: 'Yes',
            value: 'true',
          },
          {
            name: 'No',
            value: 'false',
          },
        ],
      },
      {
        id: 'secondary_structure',
        label: 'Secondary structure',
        itemType: 'group',
        items: [
          {
            id: 'secondary_structure_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_secstruct',
                itemType: 'single',
                term: 'ft_secstruct',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ftlen_secstruct',
                itemType: 'single',
                term: 'ftlen_secstruct',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_secstruct',
                itemType: 'single',
                term: 'ftev_secstruct',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'secondary_structure_helix',
            label: 'Helix',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_helix',
                itemType: 'single',
                term: 'ft_helix',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ftlen_helix',
                itemType: 'single',
                term: 'ftlen_helix',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_helix',
                itemType: 'single',
                term: 'ftev_helix',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'secondary_structure_turn',
            label: 'Turn',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_turn',
                itemType: 'single',
                term: 'ft_turn',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ftlen_turn',
                itemType: 'single',
                term: 'ftlen_turn',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_turn',
                itemType: 'single',
                term: 'ftev_turn',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'secondary_structure_beta_strand',
            label: 'Beta strand',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_strand',
                itemType: 'single',
                term: 'ft_strand',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ftlen_strand',
                itemType: 'single',
                term: 'ftlen_strand',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_strand',
                itemType: 'single',
                term: 'ftev_strand',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sequence',
    label: 'Sequence',
    itemType: 'group',
    items: [
      {
        id: 'mass_range',
        label: 'Mass(Da)',
        itemType: 'single',
        term: 'mass',
        dataType: 'integer',
        fieldType: 'range',
        example: '[441126 TO 441126]',
      },
      {
        id: 'length_range',
        label: 'Sequence length',
        itemType: 'single',
        term: 'length',
        dataType: 'integer',
        fieldType: 'range',
        example: '[441 TO 450]',
      },
      {
        id: 'alt_product_isoform',
        label: 'Alternative products (isoforms)',
        itemType: 'group',
        items: [
          {
            id: 'sequence_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_ap',
                itemType: 'single',
                term: 'cc_ap',
                dataType: 'string',
                fieldType: 'general',
                example: 'tissues',
              },
              {
                id: 'ccev_ap',
                itemType: 'single',
                term: 'ccev_ap',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'alternative_promoter_usage',
            label: 'Alternative promoter usage',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_ap_apu',
                itemType: 'single',
                term: 'cc_ap_apu',
                dataType: 'string',
                fieldType: 'general',
                example: '*',
              },
              {
                id: 'ccev_ap_apu',
                itemType: 'single',
                term: 'ccev_ap_apu',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'alternative_splicing',
            label: 'Alternative splicing',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_ap_as',
                itemType: 'single',
                term: 'cc_ap_as',
                dataType: 'string',
                fieldType: 'general',
                example: 'experimental',
              },
              {
                id: 'ccev_ap_as',
                itemType: 'single',
                term: 'ccev_ap_as',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'experimental',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'alternative_initiation',
            label: 'Alternative initiation',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_ap_ai',
                itemType: 'single',
                term: 'cc_ap_ai',
                dataType: 'string',
                fieldType: 'general',
                example: 'acetylalanine',
              },
              {
                id: 'ccev_ap_ai',
                itemType: 'single',
                term: 'ccev_ap_ai',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'ribosomal_frameshifting',
            label: 'Ribosomal frameshifting',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_ap_rf',
                itemType: 'single',
                term: 'cc_ap_rf',
                dataType: 'string',
                fieldType: 'general',
                example: 'translation',
              },
              {
                id: 'ccev_ap_rf',
                itemType: 'single',
                term: 'ccev_ap_rf',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'seq_caution',
        label: 'Sequence caution',
        itemType: 'group',
        items: [
          {
            id: 'seq_caution_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_sequence_caution',
                itemType: 'single',
                term: 'cc_sequence_caution',
                dataType: 'string',
                fieldType: 'general',
                example: 'translated',
              },
              {
                id: 'ccev_sequence_caution',
                itemType: 'single',
                term: 'ccev_sequence_caution',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'cc_sc_framesh',
            label: 'Frameshift',
            itemType: 'single',
            term: 'cc_sc_framesh',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'cc_sc_einit',
            label: 'Erroneous initiation',
            itemType: 'single',
            term: 'cc_sc_einit',
            dataType: 'string',
            fieldType: 'general',
            example: 'extended',
          },
          {
            id: 'cc_sc_eterm',
            label: 'Erroneous termination',
            itemType: 'single',
            term: 'cc_sc_eterm',
            dataType: 'string',
            fieldType: 'general',
            example: 'translated',
          },
          {
            id: 'cc_sc_epred',
            label: 'Erroneous gene model prediction',
            itemType: 'single',
            term: 'cc_sc_epred',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'cc_sc_etran',
            label: 'Erroneous translation',
            itemType: 'single',
            term: 'cc_sc_etran',
            dataType: 'string',
            fieldType: 'general',
            example: 'choice',
          },
          {
            id: 'miscellaneous_discrepancy',
            label: 'Miscellaneous Discrepancy',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'cc_sc_misc',
                itemType: 'single',
                term: 'cc_sc_misc',
                dataType: 'string',
                fieldType: 'general',
                example: 'sequence',
              },
              {
                id: 'ccev_sc_misc',
                itemType: 'single',
                term: 'ccev_sc_misc',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'any',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mass_spectrometry',
        label: 'Mass Spectrometry',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_mass_spectrometry',
            itemType: 'single',
            term: 'cc_mass_spectrometry',
            dataType: 'string',
            fieldType: 'general',
            example: 'electrospray',
          },
          {
            id: 'ccev_mass_spectrometry',
            itemType: 'single',
            term: 'ccev_mass_spectrometry',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'polymorphism',
        label: 'Polymorphism',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_polymorphism',
            itemType: 'single',
            term: 'cc_polymorphism',
            dataType: 'string',
            fieldType: 'general',
            example: 'transcript',
          },
          {
            id: 'ccev_polymorphism',
            itemType: 'single',
            term: 'ccev_polymorphism',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'rna_editing',
        label: 'RNA Editing',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_rna_editing',
            itemType: 'single',
            term: 'cc_rna_editing',
            dataType: 'string',
            fieldType: 'general',
            example: 'target',
          },
          {
            id: 'ccev_rna_editing',
            itemType: 'single',
            term: 'ccev_rna_editing',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'natural_variations',
        label: 'Natural Variations',
        itemType: 'group',
        items: [
          {
            id: 'natural_variations_any',
            label: 'Any',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_variants',
                itemType: 'single',
                term: 'ft_variants',
                dataType: 'string',
                fieldType: 'general',
                example: 'colorectal',
              },
              {
                id: 'ftlen_variants',
                itemType: 'single',
                term: 'ftlen_variants',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_variants',
                itemType: 'single',
                term: 'ftev_variants',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'natural_variations_natural_variant',
            label: 'Natural variant',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_variant',
                itemType: 'single',
                term: 'ft_variant',
                dataType: 'string',
                fieldType: 'general',
                example: 'colorectal',
              },
              {
                id: 'ftlen_variant',
                itemType: 'single',
                term: 'ftlen_variant',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_variant',
                itemType: 'single',
                term: 'ftev_variant',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'natural_variations_alternative_sequence',
            label: 'Alternative sequence',
            itemType: 'sibling_group',
            siblings: [
              {
                id: 'ft_var_seq',
                itemType: 'single',
                term: 'ft_var_seq',
                dataType: 'string',
                fieldType: 'general',
                example: 'isoform',
              },
              {
                id: 'ftlen_var_seq',
                itemType: 'single',
                term: 'ftlen_var_seq',
                dataType: 'integer',
                fieldType: 'range',
                example: '[0 TO 100]',
              },
              {
                id: 'ftev_var_seq',
                itemType: 'single',
                term: 'ftev_var_seq',
                dataType: 'string',
                fieldType: 'evidence',
                example: 'manual',
                evidenceGroups: [
                  {
                    groupName: 'Any',
                    items: [
                      {
                        name: 'Any assertion method',
                        code: 'any',
                      },
                      {
                        name: 'Any manual assertion',
                        code: 'manual',
                      },
                      {
                        name: 'Any automatic assertion',
                        code: 'automatic',
                      },
                      {
                        name: 'Any experimental assertion',
                        code: 'experimental',
                      },
                    ],
                  },
                  {
                    groupName: 'Manual assertions',
                    items: [
                      {
                        name: 'Experimental',
                        code: 'ECO_0000269',
                      },
                      {
                        name: 'Non-traceable author statement',
                        code: 'ECO_0000303',
                      },
                      {
                        name: 'Curator inference',
                        code: 'ECO_0000305',
                      },
                      {
                        name: 'Sequence similarity',
                        code: 'ECO_0000250',
                      },
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000255',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000244',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000312',
                      },
                    ],
                  },
                  {
                    groupName: 'Automatic assertions',
                    items: [
                      {
                        name: 'Sequence model',
                        code: 'ECO_0000256',
                      },
                      {
                        name: 'Combinatorial',
                        code: 'ECO_0000213',
                      },
                      {
                        name: 'Imported information',
                        code: 'ECO_0000313',
                      },
                      {
                        name: 'Sequence motif match (InterPro)',
                        code: 'ECO_0000259',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'non_standard_residue',
        label: 'Non-standard residue',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_non_std',
            itemType: 'single',
            term: 'ft_non_std',
            dataType: 'string',
            fieldType: 'general',
            example: 'selenocysteine',
          },
          {
            id: 'ftlen_non_std',
            itemType: 'single',
            term: 'ftlen_non_std',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_non_std',
            itemType: 'single',
            term: 'ftev_non_std',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'non_terminal_residue',
        label: 'Non-terminal residue',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_non_ter',
            itemType: 'single',
            term: 'ft_non_ter',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_non_ter',
            itemType: 'single',
            term: 'ftlen_non_ter',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_non_ter',
            itemType: 'single',
            term: 'ftev_non_ter',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'non_adjacent_residue',
        label: 'Non-adjacent residue',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_non_cons',
            itemType: 'single',
            term: 'ft_non_cons',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_non_cons',
            itemType: 'single',
            term: 'ftlen_non_cons',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_non_cons',
            itemType: 'single',
            term: 'ftev_non_cons',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sequence_conflict',
        label: 'Sequence conflict',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_conflict',
            itemType: 'single',
            term: 'ft_conflict',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_conflict',
            itemType: 'single',
            term: 'ftlen_conflict',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_conflict',
            itemType: 'single',
            term: 'ftev_conflict',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sequence_uncertainty',
        label: 'Sequence uncertainty',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_unsure',
            itemType: 'single',
            term: 'ft_unsure',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_unsure',
            itemType: 'single',
            term: 'ftlen_unsure',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_unsure',
            itemType: 'single',
            term: 'ftev_unsure',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sequence_features_ft',
        label: 'Sequence features [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_positional',
            itemType: 'single',
            term: 'ft_positional',
            dataType: 'string',
            fieldType: 'general',
            example: 'colorectal',
          },
          {
            id: 'ftlen_positional',
            itemType: 'single',
            term: 'ftlen_positional',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_positional',
            itemType: 'single',
            term: 'ftev_positional',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'fragment',
        label: 'Fragment',
        itemType: 'single',
        term: 'fragment',
        dataType: 'boolean',
        fieldType: 'general',
        example: 'true',
        values: [
          {
            name: 'Yes',
            value: 'true',
          },
          {
            name: 'No',
            value: 'false',
          },
        ],
      },
      {
        id: 'organelle',
        label: 'Encoded in',
        itemType: 'single',
        term: 'organelle',
        dataType: 'enum',
        fieldType: 'general',
        example: 'mitochondrion',
        values: [
          {
            name: 'Mitochondrion',
            value: 'mitochondrion',
          },
          {
            name: 'Plastid',
            value: 'plastid',
          },
          {
            name: 'Chloroplast',
            value: 'chloroplast',
          },
          {
            name: 'Cyanelle',
            value: 'cyanelle',
          },
          {
            name: 'Apicoplast',
            value: 'apicoplast',
          },
          {
            name: 'Organellar chromatophore',
            value: 'organellar chromatophore',
          },
          {
            name: 'Non-photosynthetic plastid',
            value: 'non-photosynthetic plastid',
          },
          {
            name: 'Nucleomorph',
            value: 'nucleomorph',
          },
          {
            name: 'Hydrogenosome',
            value: 'hydrogenosome',
          },
        ],
      },
      {
        id: 'precursor',
        label: 'Precursor',
        itemType: 'single',
        term: 'precursor',
        dataType: 'boolean',
        fieldType: 'general',
        example: 'true',
        values: [
          {
            name: 'Yes',
            value: 'true',
          },
          {
            name: 'No',
            value: 'false',
          },
        ],
      },
      {
        id: 'sequence_from_rc',
        label: 'Sequence from ... [RC]',
        itemType: 'group',
        items: [
          {
            id: 'tissue',
            label: 'Tissue',
            itemType: 'single',
            term: 'tissue',
            dataType: 'string',
            fieldType: 'general',
            example: 'head',
          },
          {
            id: 'strain',
            label: 'Strain',
            itemType: 'single',
            term: 'strain',
            dataType: 'string',
            fieldType: 'general',
            example: 'berkeley',
          },
          {
            id: 'plasmid',
            label: 'Plasmid',
            itemType: 'single',
            term: 'plasmid',
            dataType: 'string',
            fieldType: 'general',
            example: 'pO113',
          },
          {
            id: 'transposon',
            label: 'Transposon',
            itemType: 'single',
            term: 'transposon',
            dataType: 'string',
            fieldType: 'general',
            example: 'tn3',
          },
        ],
      },
    ],
  },
  {
    id: 'family_domains',
    label: 'Family and Domains',
    itemType: 'group',
    items: [
      {
        id: 'domain_ft',
        label: 'Domain [FT]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_domain',
            itemType: 'single',
            term: 'ft_domain',
            dataType: 'string',
            fieldType: 'general',
            example: 'phosphatase',
          },
          {
            id: 'ftlen_domain',
            itemType: 'single',
            term: 'ftlen_domain',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_domain',
            itemType: 'single',
            term: 'ftev_domain',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'domain_comments_cc',
        label: 'Domain Comments [CC]',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_domain',
            itemType: 'single',
            term: 'cc_domain',
            dataType: 'string',
            fieldType: 'general',
            example: 'conformation',
          },
          {
            id: 'ccev_domain',
            itemType: 'single',
            term: 'ccev_domain',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'any',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'family',
        label: 'Protein family',
        itemType: 'single',
        term: 'family',
        dataType: 'string',
        fieldType: 'general',
        example: 'pa28',
      },
      {
        id: 'coiled_coil',
        label: 'Coiled-coil',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_coiled',
            itemType: 'single',
            term: 'ft_coiled',
            dataType: 'string',
            fieldType: 'general',
            example: '*',
          },
          {
            id: 'ftlen_coiled',
            itemType: 'single',
            term: 'ftlen_coiled',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_coiled',
            itemType: 'single',
            term: 'ftev_coiled',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'compositional_bias',
        label: 'Compositional bias',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_compbias',
            itemType: 'single',
            term: 'ft_compbias',
            dataType: 'string',
            fieldType: 'general',
            example: 'glu-rich',
          },
          {
            id: 'ftlen_compbias',
            itemType: 'single',
            term: 'ftlen_compbias',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_compbias',
            itemType: 'single',
            term: 'ftev_compbias',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'motif',
        label: 'Motif',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_motif',
            itemType: 'single',
            term: 'ft_motif',
            dataType: 'string',
            fieldType: 'general',
            example: 'motif',
          },
          {
            id: 'ftlen_motif',
            itemType: 'single',
            term: 'ftlen_motif',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_motif',
            itemType: 'single',
            term: 'ftev_motif',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'region',
        label: 'Region',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_region',
            itemType: 'single',
            term: 'ft_region',
            dataType: 'string',
            fieldType: 'general',
            example: 'motif',
          },
          {
            id: 'ftlen_region',
            itemType: 'single',
            term: 'ftlen_region',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_region',
            itemType: 'single',
            term: 'ftev_region',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'repeat',
        label: 'Repeat',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_repeat',
            itemType: 'single',
            term: 'ft_repeat',
            dataType: 'string',
            fieldType: 'general',
            example: 'motif',
          },
          {
            id: 'ftlen_repeat',
            itemType: 'single',
            term: 'ftlen_repeat',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_repeat',
            itemType: 'single',
            term: 'ftev_repeat',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sequence_similarity',
        label: 'Sequence similarity',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'cc_similarity',
            itemType: 'single',
            term: 'cc_similarity',
            dataType: 'string',
            fieldType: 'general',
            example: 'phosphatase',
          },
          {
            id: 'ccev_similarity',
            itemType: 'single',
            term: 'ccev_similarity',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'zinc_finger',
        label: 'Zinc finger',
        itemType: 'sibling_group',
        siblings: [
          {
            id: 'ft_zn_fing',
            itemType: 'single',
            term: 'ft_zn_fing',
            dataType: 'string',
            fieldType: 'general',
            example: 'UBP',
          },
          {
            id: 'ftlen_zn_fing',
            itemType: 'single',
            term: 'ftlen_zn_fing',
            dataType: 'integer',
            fieldType: 'range',
            example: '[0 TO 100]',
          },
          {
            id: 'ftev_zn_fing',
            itemType: 'single',
            term: 'ftev_zn_fing',
            dataType: 'string',
            fieldType: 'evidence',
            example: 'manual',
            evidenceGroups: [
              {
                groupName: 'Any',
                items: [
                  {
                    name: 'Any assertion method',
                    code: 'any',
                  },
                  {
                    name: 'Any manual assertion',
                    code: 'manual',
                  },
                  {
                    name: 'Any automatic assertion',
                    code: 'automatic',
                  },
                  {
                    name: 'Any experimental assertion',
                    code: 'experimental',
                  },
                ],
              },
              {
                groupName: 'Manual assertions',
                items: [
                  {
                    name: 'Experimental',
                    code: 'ECO_0000269',
                  },
                  {
                    name: 'Non-traceable author statement',
                    code: 'ECO_0000303',
                  },
                  {
                    name: 'Curator inference',
                    code: 'ECO_0000305',
                  },
                  {
                    name: 'Sequence similarity',
                    code: 'ECO_0000250',
                  },
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000255',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000244',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000312',
                  },
                ],
              },
              {
                groupName: 'Automatic assertions',
                items: [
                  {
                    name: 'Sequence model',
                    code: 'ECO_0000256',
                  },
                  {
                    name: 'Combinatorial',
                    code: 'ECO_0000213',
                  },
                  {
                    name: 'Imported information',
                    code: 'ECO_0000313',
                  },
                  {
                    name: 'Sequence motif match (InterPro)',
                    code: 'ECO_0000259',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cross_references',
    label: 'Cross-references',
    itemType: 'group',
    items: [
      {
        id: 'xref_group_any',
        label: 'Any',
        itemType: 'group',
        items: [
          {
            id: 'xref_any',
            label: 'Any cross-reference',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
          },
        ],
      },
      {
        id: 'xref_group_sequence_databases',
        label: 'Sequence databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_embl',
            label: 'EMBL',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'embl-',
          },
          {
            id: 'xref_ccds',
            label: 'CCDS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ccds-',
          },
          {
            id: 'xref_pir',
            label: 'PIR',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pir-',
          },
          {
            id: 'xref_refseq',
            label: 'RefSeq',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'refseq-',
          },
        ],
      },
      {
        id: 'xref_group_3d_structure_databases',
        label: '3D structure databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_pdb',
            label: 'PDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pdb-',
          },
          {
            id: 'xref_pdbsum',
            label: 'PDBsum',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pdbsum-',
          },
          {
            id: 'xref_pcddb',
            label: 'PCDDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pcddb-',
          },
          {
            id: 'xref_sasbdb',
            label: 'SASBDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'sasbdb-',
          },
          {
            id: 'xref_bmrb',
            label: 'BMRB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'bmrb-',
          },
          {
            id: 'xref_smr',
            label: 'SMR',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'smr-',
          },
        ],
      },
      {
        id: 'xref_group_protein-protein_interaction_databases',
        label: 'Protein-protein interaction databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_biogrid',
            label: 'BioGRID',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'biogrid-',
          },
          {
            id: 'xref_complexportal',
            label: 'ComplexPortal',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'complexportal-',
          },
          {
            id: 'xref_corum',
            label: 'CORUM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'corum-',
          },
          {
            id: 'xref_dip',
            label: 'DIP',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dip-',
          },
          {
            id: 'xref_elm',
            label: 'ELM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'elm-',
          },
          {
            id: 'xref_intact',
            label: 'IntAct',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'intact-',
          },
          {
            id: 'xref_mint',
            label: 'MINT',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'mint-',
          },
          {
            id: 'xref_string',
            label: 'STRING',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'string-',
          },
        ],
      },
      {
        id: 'xref_group_chemistry',
        label: 'Chemistry',
        itemType: 'group',
        items: [
          {
            id: 'xref_bindingdb',
            label: 'BindingDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'bindingdb-',
          },
          {
            id: 'xref_chembl',
            label: 'ChEMBL',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'chembl-',
          },
          {
            id: 'xref_drugbank',
            label: 'DrugBank',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'drugbank-',
          },
          {
            id: 'xref_guidetopharmacology',
            label: 'GuidetoPHARMACOLOGY',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'guidetopharmacology-',
          },
          {
            id: 'xref_swisslipids',
            label: 'SwissLipids',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'swisslipids-',
          },
          {
            id: 'xref_drugcentral',
            label: 'DrugCentral',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'drugcentral-',
          },
        ],
      },
      {
        id: 'xref_group_protein_family/group_databases',
        label: 'Protein family/group databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_allergome',
            label: 'Allergome',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'allergome-',
          },
          {
            id: 'xref_cazy',
            label: 'CAZy',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cazy-',
          },
          {
            id: 'xref_esther',
            label: 'ESTHER',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'esther-',
          },
          {
            id: 'xref_imgt_gene-db',
            label: 'IMGT_GENE-DB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'imgt_gene-db-',
          },
          {
            id: 'xref_merops',
            label: 'MEROPS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'merops-',
          },
          {
            id: 'xref_moondb',
            label: 'MoonDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'moondb-',
          },
          {
            id: 'xref_moonprot',
            label: 'MoonProt',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'moonprot-',
          },
          {
            id: 'xref_clae',
            label: 'CLAE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'clae-',
          },
          {
            id: 'xref_peroxibase',
            label: 'PeroxiBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'peroxibase-',
          },
          {
            id: 'xref_rebase',
            label: 'REBASE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'rebase-',
          },
          {
            id: 'xref_tcdb',
            label: 'TCDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'tcdb-',
          },
          {
            id: 'xref_unilectin',
            label: 'UniLectin',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'unilectin-',
          },
        ],
      },
      {
        id: 'xref_group_ptm_databases',
        label: 'PTM databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_carbonyldb',
            label: 'CarbonylDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'carbonyldb-',
          },
          {
            id: 'xref_depod',
            label: 'DEPOD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'depod-',
          },
          {
            id: 'xref_glyconnect',
            label: 'GlyConnect',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'glyconnect-',
          },
          {
            id: 'xref_glygen',
            label: 'GlyGen',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'glygen-',
          },
          {
            id: 'xref_iptmnet',
            label: 'iPTMnet',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'iptmnet-',
          },
          {
            id: 'xref_phosphositeplus',
            label: 'PhosphoSitePlus',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'phosphositeplus-',
          },
          {
            id: 'xref_swisspalm',
            label: 'SwissPalm',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'swisspalm-',
          },
          {
            id: 'xref_unicarbkb',
            label: 'UniCarbKB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'unicarbkb-',
          },
          {
            id: 'xref_metosite',
            label: 'MetOSite',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'metosite-',
          },
        ],
      },
      {
        id: 'xref_group_genetic_variation_databases',
        label: 'Genetic variation databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_biomuta',
            label: 'BioMuta',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'biomuta-',
          },
          {
            id: 'xref_dmdm',
            label: 'DMDM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dmdm-',
          },
          {
            id: 'xref_dbsnp',
            label: 'dbSNP',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dbsnp-',
          },
        ],
      },
      {
        id: 'xref_group_2d_gel_databases',
        label: '2D gel databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_compluyeast-2dpage',
            label: 'COMPLUYEAST-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'compluyeast-2dpage-',
          },
          {
            id: 'xref_dosac-cobs-2dpage',
            label: 'DOSAC-COBS-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dosac-cobs-2dpage-',
          },
          {
            id: 'xref_ogp',
            label: 'OGP',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ogp-',
          },
          {
            id: 'xref_reproduction-2dpage',
            label: 'REPRODUCTION-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'reproduction-2dpage-',
          },
          {
            id: 'xref_swiss-2dpage',
            label: 'SWISS-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'swiss-2dpage-',
          },
          {
            id: 'xref_ucd-2dpage',
            label: 'UCD-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ucd-2dpage-',
          },
          {
            id: 'xref_world-2dpage',
            label: 'World-2DPAGE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'world-2dpage-',
          },
        ],
      },
      {
        id: 'xref_group_proteomic_databases',
        label: 'Proteomic databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_cptac',
            label: 'CPTAC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cptac-',
          },
          {
            id: 'xref_epd',
            label: 'EPD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'epd-',
          },
          {
            id: 'xref_maxqb',
            label: 'MaxQB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'maxqb-',
          },
          {
            id: 'xref_paxdb',
            label: 'PaxDb',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'paxdb-',
          },
          {
            id: 'xref_peptideatlas',
            label: 'PeptideAtlas',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'peptideatlas-',
          },
          {
            id: 'xref_pride',
            label: 'PRIDE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pride-',
          },
          {
            id: 'xref_promex',
            label: 'ProMEX',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'promex-',
          },
          {
            id: 'xref_proteomicsdb',
            label: 'ProteomicsDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'proteomicsdb-',
          },
          {
            id: 'xref_topdownproteomics',
            label: 'TopDownProteomics',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'topdownproteomics-',
          },
          {
            id: 'xref_jpost',
            label: 'jPOST',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'jpost-',
          },
          {
            id: 'xref_massive',
            label: 'MassIVE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'massive-',
          },
        ],
      },
      {
        id: 'xref_group_protocols_and_materials_databases',
        label: 'Protocols and materials databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_dnasu',
            label: 'DNASU',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dnasu-',
          },
          {
            id: 'xref_abcd',
            label: 'ABCD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'abcd-',
          },
          {
            id: 'xref_antibodypedia',
            label: 'Antibodypedia',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'antibodypedia-',
          },
          {
            id: 'xref_cptc',
            label: 'CPTC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cptc-',
          },
        ],
      },
      {
        id: 'xref_group_genome_annotation_databases',
        label: 'Genome annotation databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_ensembl',
            label: 'Ensembl',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensembl-',
          },
          {
            id: 'xref_ensemblbacteria',
            label: 'EnsemblBacteria',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensemblbacteria-',
          },
          {
            id: 'xref_ensemblfungi',
            label: 'EnsemblFungi',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensemblfungi-',
          },
          {
            id: 'xref_ensemblmetazoa',
            label: 'EnsemblMetazoa',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensemblmetazoa-',
          },
          {
            id: 'xref_ensemblplants',
            label: 'EnsemblPlants',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensemblplants-',
          },
          {
            id: 'xref_ensemblprotists',
            label: 'EnsemblProtists',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ensemblprotists-',
          },
          {
            id: 'xref_genedb',
            label: 'GeneDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genedb-',
          },
          {
            id: 'xref_geneid',
            label: 'GeneID',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'geneid-',
          },
          {
            id: 'xref_gramene',
            label: 'Gramene',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'gramene-',
          },
          {
            id: 'xref_kegg',
            label: 'KEGG',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'kegg-',
          },
          {
            id: 'xref_patric',
            label: 'PATRIC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'patric-',
          },
          {
            id: 'xref_ucsc',
            label: 'UCSC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ucsc-',
          },
          {
            id: 'xref_vectorbase',
            label: 'VectorBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'vectorbase-',
          },
          {
            id: 'xref_wbparasite',
            label: 'WBParaSite',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'wbparasite-',
          },
        ],
      },
      {
        id: 'xref_group_organism-specific_databases',
        label: 'Organism-specific databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_arachnoserver',
            label: 'ArachnoServer',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'arachnoserver-',
          },
          {
            id: 'xref_araport',
            label: 'Araport',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'araport-',
          },
          {
            id: 'xref_cgd',
            label: 'CGD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cgd-',
          },
          {
            id: 'xref_conoserver',
            label: 'ConoServer',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'conoserver-',
          },
          {
            id: 'xref_ctd',
            label: 'CTD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ctd-',
          },
          {
            id: 'xref_dictybase',
            label: 'dictyBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'dictybase-',
          },
          {
            id: 'xref_disgenet',
            label: 'DisGeNET',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'disgenet-',
          },
          {
            id: 'xref_echobase',
            label: 'EchoBASE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'echobase-',
          },
          {
            id: 'xref_euhcvdb',
            label: 'euHCVdb',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'euhcvdb-',
          },
          {
            id: 'xref_veupathdb',
            label: 'VEuPathDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'veupathdb-',
          },
          {
            id: 'xref_flybase',
            label: 'FlyBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'flybase-',
          },
          {
            id: 'xref_genecards',
            label: 'GeneCards',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genecards-',
          },
          {
            id: 'xref_genereviews',
            label: 'GeneReviews',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genereviews-',
          },
          {
            id: 'xref_hgnc',
            label: 'HGNC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'hgnc-',
          },
          {
            id: 'xref_hpa',
            label: 'HPA',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'hpa-',
          },
          {
            id: 'xref_legiolist',
            label: 'LegioList',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'legiolist-',
          },
          {
            id: 'xref_leproma',
            label: 'Leproma',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'leproma-',
          },
          {
            id: 'xref_maizegdb',
            label: 'MaizeGDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'maizegdb-',
          },
          {
            id: 'xref_malacards',
            label: 'MalaCards',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'malacards-',
          },
          {
            id: 'xref_mgi',
            label: 'MGI',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'mgi-',
          },
          {
            id: 'xref_mim',
            label: 'MIM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'mim-',
          },
          {
            id: 'xref_niagads',
            label: 'NIAGADS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'niagads-',
          },
          {
            id: 'xref_nextprot',
            label: 'neXtProt',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'nextprot-',
          },
          {
            id: 'xref_opentargets',
            label: 'OpenTargets',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'opentargets-',
          },
          {
            id: 'xref_orphanet',
            label: 'Orphanet',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'orphanet-',
          },
          {
            id: 'xref_pharmgkb',
            label: 'PharmGKB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pharmgkb-',
          },
          {
            id: 'xref_pombase',
            label: 'PomBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pombase-',
          },
          {
            id: 'xref_pseudocap',
            label: 'PseudoCAP',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pseudocap-',
          },
          {
            id: 'xref_rgd',
            label: 'RGD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'rgd-',
          },
          {
            id: 'xref_sgd',
            label: 'SGD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'sgd-',
          },
          {
            id: 'xref_tair',
            label: 'TAIR',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'tair-',
          },
          {
            id: 'xref_tuberculist',
            label: 'TubercuList',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'tuberculist-',
          },
          {
            id: 'xref_vgnc',
            label: 'VGNC',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'vgnc-',
          },
          {
            id: 'xref_wormbase',
            label: 'WormBase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'wormbase-',
          },
          {
            id: 'xref_xenbase',
            label: 'Xenbase',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'xenbase-',
          },
          {
            id: 'xref_zfin',
            label: 'ZFIN',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'zfin-',
          },
        ],
      },
      {
        id: 'xref_group_phylogenomic_databases',
        label: 'Phylogenomic databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_eggnog',
            label: 'eggNOG',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'eggnog-',
          },
          {
            id: 'xref_genetree',
            label: 'GeneTree',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genetree-',
          },
          {
            id: 'xref_hogenom',
            label: 'HOGENOM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'hogenom-',
          },
          {
            id: 'xref_inparanoid',
            label: 'InParanoid',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'inparanoid-',
          },
          {
            id: 'xref_ko',
            label: 'KO',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ko-',
          },
          {
            id: 'xref_oma',
            label: 'OMA',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'oma-',
          },
          {
            id: 'xref_orthodb',
            label: 'OrthoDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'orthodb-',
          },
          {
            id: 'xref_phylomedb',
            label: 'PhylomeDB',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'phylomedb-',
          },
          {
            id: 'xref_treefam',
            label: 'TreeFam',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'treefam-',
          },
        ],
      },
      {
        id: 'xref_group_enzyme_and_pathway_databases',
        label: 'Enzyme and pathway databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_biocyc',
            label: 'BioCyc',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'biocyc-',
          },
          {
            id: 'xref_brenda',
            label: 'BRENDA',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'brenda-',
          },
          {
            id: 'xref_reactome',
            label: 'Reactome',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'reactome-',
          },
          {
            id: 'xref_sabio-rk',
            label: 'SABIO-RK',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'sabio-rk-',
          },
          {
            id: 'xref_signalink',
            label: 'SignaLink',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'signalink-',
          },
          {
            id: 'xref_signor',
            label: 'SIGNOR',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'signor-',
          },
          {
            id: 'xref_unipathway',
            label: 'UniPathway',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'unipathway-',
          },
          {
            id: 'xref_plantreactome',
            label: 'PlantReactome',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'plantreactome-',
          },
          {
            id: 'xref_pathwaycommons',
            label: 'PathwayCommons',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pathwaycommons-',
          },
        ],
      },
      {
        id: 'xref_group_miscellaneous',
        label: 'Miscellaneous',
        itemType: 'group',
        items: [
          {
            id: 'xref_chitars',
            label: 'ChiTaRS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'chitars-',
          },
          {
            id: 'xref_evolutionarytrace',
            label: 'EvolutionaryTrace',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'evolutionarytrace-',
          },
          {
            id: 'xref_genewiki',
            label: 'GeneWiki',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genewiki-',
          },
          {
            id: 'xref_genomernai',
            label: 'GenomeRNAi',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genomernai-',
          },
          {
            id: 'xref_phi-base',
            label: 'PHI-base',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'phi-base-',
          },
          {
            id: 'xref_pro',
            label: 'PRO',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pro-',
          },
          {
            id: 'xref_pharos',
            label: 'Pharos',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pharos-',
          },
          {
            id: 'xref_rnact',
            label: 'RNAct',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'rnact-',
          },
          {
            id: 'xref_biogrid-orcs',
            label: 'BioGRID-ORCS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'biogrid-orcs-',
          },
        ],
      },
      {
        id: 'xref_group_gene_expression_databases',
        label: 'Gene expression databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_bgee',
            label: 'Bgee',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'bgee-',
          },
          {
            id: 'xref_cleanex',
            label: 'CleanEx',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cleanex-',
          },
          {
            id: 'xref_collectf',
            label: 'CollecTF',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'collectf-',
          },
          {
            id: 'xref_expressionatlas',
            label: 'ExpressionAtlas',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'expressionatlas-',
          },
          {
            id: 'xref_genevisible',
            label: 'Genevisible',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'genevisible-',
          },
        ],
      },
      {
        id: 'xref_group_family_and_domain_databases',
        label: 'Family and domain databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_cdd',
            label: 'CDD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'cdd-',
          },
          {
            id: 'xref_gene3d',
            label: 'Gene3D',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'gene3d-',
          },
          {
            id: 'xref_hamap',
            label: 'HAMAP',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'hamap-',
          },
          {
            id: 'xref_ideal',
            label: 'IDEAL',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'ideal-',
          },
          {
            id: 'xref_interpro',
            label: 'InterPro',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'interpro-',
          },
          {
            id: 'xref_panther',
            label: 'PANTHER',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'panther-',
          },
          {
            id: 'xref_pfam',
            label: 'Pfam',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pfam-',
          },
          {
            id: 'xref_pirsf',
            label: 'PIRSF',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'pirsf-',
          },
          {
            id: 'xref_prints',
            label: 'PRINTS',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'prints-',
          },
          {
            id: 'xref_prodom',
            label: 'ProDom',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'prodom-',
          },
          {
            id: 'xref_sfld',
            label: 'SFLD',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'sfld-',
          },
          {
            id: 'xref_smart',
            label: 'SMART',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'smart-',
          },
          {
            id: 'xref_supfam',
            label: 'SUPFAM',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'supfam-',
          },
          {
            id: 'xref_tigrfams',
            label: 'TIGRFAMs',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'tigrfams-',
          },
          {
            id: 'xref_prosite',
            label: 'PROSITE',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'prosite-',
          },
          {
            id: 'xref_disprot',
            label: 'DisProt',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'disprot-',
          },
        ],
      },
      {
        id: 'xref_group_ontologies',
        label: 'Ontologies',
        itemType: 'group',
        items: [
          {
            id: 'xref_go',
            label: 'GO',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'go-',
          },
        ],
      },
      {
        id: 'xref_group_proteomes_databases',
        label: 'Proteomes databases',
        itemType: 'group',
        items: [
          {
            id: 'xref_proteomes',
            label: 'Proteomes',
            itemType: 'single',
            term: 'xref',
            dataType: 'string',
            fieldType: 'general',
            valuePrefix: 'proteomes-',
          },
        ],
      },
      {
        id: 'database',
        itemType: 'single',
        term: 'database',
        dataType: 'string',
        fieldType: 'general',
        example: 'Bgee',
      },
    ],
  },
  {
    id: 'web_resources',
    label: 'Web Resources',
    itemType: 'sibling_group',
    siblings: [
      {
        id: 'cc_webresource',
        itemType: 'single',
        term: 'cc_webresource',
        dataType: 'string',
        fieldType: 'general',
        example: 'lck',
      },
      {
        id: 'ccev_webresource',
        itemType: 'single',
        term: 'ccev_webresource',
        dataType: 'string',
        fieldType: 'evidence',
        example: 'manual',
        evidenceGroups: [
          {
            groupName: 'Any',
            items: [
              {
                name: 'Any assertion method',
                code: 'any',
              },
              {
                name: 'Any manual assertion',
                code: 'manual',
              },
              {
                name: 'Any automatic assertion',
                code: 'automatic',
              },
              {
                name: 'Any experimental assertion',
                code: 'experimental',
              },
            ],
          },
          {
            groupName: 'Manual assertions',
            items: [
              {
                name: 'Experimental',
                code: 'ECO_0000269',
              },
              {
                name: 'Non-traceable author statement',
                code: 'ECO_0000303',
              },
              {
                name: 'Curator inference',
                code: 'ECO_0000305',
              },
              {
                name: 'Sequence similarity',
                code: 'ECO_0000250',
              },
              {
                name: 'Sequence model',
                code: 'ECO_0000255',
              },
              {
                name: 'Combinatorial',
                code: 'ECO_0000244',
              },
              {
                name: 'Imported information',
                code: 'ECO_0000312',
              },
            ],
          },
          {
            groupName: 'Automatic assertions',
            items: [
              {
                name: 'Sequence model',
                code: 'ECO_0000256',
              },
              {
                name: 'Combinatorial',
                code: 'ECO_0000213',
              },
              {
                name: 'Imported information',
                code: 'ECO_0000313',
              },
              {
                name: 'Sequence motif match (InterPro)',
                code: 'ECO_0000259',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'date_of',
    label: 'Date Of',
    itemType: 'group',
    items: [
      {
        id: 'date_created',
        label: 'Date Of Creation',
        itemType: 'single',
        term: 'date_created',
        dataType: 'date',
        fieldType: 'range',
        example: '[2018-03-04 TO 2018-03-08]',
      },
      {
        id: 'date_modified',
        label: 'Date of last entry modification',
        itemType: 'single',
        term: 'date_modified',
        dataType: 'date',
        fieldType: 'range',
        example: '[2018-03-04 TO 2018-03-08]',
      },
      {
        id: 'date_sequence_modified',
        label: 'Date of last sequence modification',
        itemType: 'single',
        term: 'date_sequence_modified',
        dataType: 'date',
        fieldType: 'range',
        example: '[2018-03-04 TO 2018-03-08]',
      },
    ],
  },
  {
    id: 'gene_ontology',
    label: 'Gene Ontology [GO]',
    itemType: 'sibling_group',
    siblings: [
      {
        id: 'go_field',
        itemType: 'single',
        term: 'go',
        dataType: 'string',
        fieldType: 'general',
        example: '0009986',
        autoComplete: '/suggester?dict=go&query=?',
        autoCompleteQueryTerm: 'go',
      },
      {
        id: 'go_evidence',
        itemType: 'single',
        term: 'go',
        dataType: 'string',
        fieldType: 'evidence',
        example: 'manual',
        evidenceGroups: [
          {
            groupName: 'Any',
            items: [
              {
                name: 'Any assertion method',
                code: 'any',
              },
              {
                name: 'Any manual assertion',
                code: 'manual',
              },
              {
                name: 'Any automatic assertion',
                code: 'automatic',
              },
            ],
          },
          {
            groupName: 'Manual assertions',
            items: [
              {
                name: 'Inferred from experiment [EXP]',
                code: 'exp',
              },
              {
                name: 'Inferred from biological aspect of ancestor [IBA]',
                code: 'iba',
              },
              {
                name: 'Inferred by curator [IC]',
                code: 'ic',
              },
              {
                name: 'Inferred from direct assay [IDA]',
                code: 'ida',
              },
              {
                name: 'Inferred from expression pattern [IEP]',
                code: 'iep',
              },
              {
                name: 'Inferred from genomic context [IGC]',
                code: 'igc',
              },
              {
                name: 'Inferred from genetic interaction [IGI]',
                code: 'igi',
              },
              {
                name: 'Inferred from mutant phenotype [IMP]',
                code: 'imp',
              },
              {
                name: 'Inferred from physical interaction [IPI]',
                code: 'ipi',
              },
              {
                name: 'Inferred from sequence alignment [ISA]',
                code: 'isa',
              },
              {
                name: 'Inferred from sequence mode [ISM]',
                code: 'ism',
              },
              {
                name: 'Inferred from sequence orthology [ISO]',
                code: 'iso',
              },
              {
                name: 'Inferred from sequence or structural similarity [ISS]',
                code: 'iss',
              },
              {
                name: 'Non-traceable author statement [NAS]',
                code: 'nas',
              },
              {
                name: 'Traceable author statement [TAS]',
                code: 'tas',
              },
              {
                name: 'Inferred from high throughput direct assay [HDA]',
                code: 'hda',
              },
              {
                name: 'Inferred from high throughput mutant phenotype [HMP]',
                code: 'hmp',
              },
              {
                name: 'Inferred from high throughput genetic interaction [HGI]',
                code: 'hgi',
              },
              {
                name: 'Interred from high throughput expression pattern [HEP]',
                code: 'hep',
              },
              {
                name: 'Inferred from high throughput experiment [HTP]',
                code: 'htp',
              },
            ],
          },
          {
            groupName: 'Automatic assertions',
            items: [
              {
                name: 'Inferred from electronic annotation [IEA]',
                code: 'iea',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'keyword_field',
    label: 'Keyword [KW]',
    itemType: 'single',
    term: 'keyword',
    dataType: 'string',
    fieldType: 'general',
    example: 'chromosomal',
    autoComplete: '/suggester?dict=keyword&query=?',
    autoCompleteQueryTerm: 'keyword',
  },
  {
    id: 'literature_citation',
    label: 'Literature Citation',
    itemType: 'group',
    items: [
      {
        id: 'lit_author',
        label: 'Author',
        itemType: 'single',
        term: 'lit_author',
        dataType: 'string',
        fieldType: 'general',
        example: 'smith',
      },
      {
        id: 'lit_journal',
        label: 'Journal',
        itemType: 'single',
        term: 'lit_journal',
        dataType: 'string',
        fieldType: 'general',
        example: 'nature',
      },
      {
        id: 'lit_pubdate',
        label: 'Published',
        itemType: 'single',
        term: 'lit_pubdate',
        dataType: 'date',
        fieldType: 'range',
        example: '[2009-01-01 TO 2019-12-31]',
      },
      {
        id: 'lit_pubmed',
        label: 'PubMed ID',
        itemType: 'single',
        term: 'lit_pubmed',
        dataType: 'string',
        fieldType: 'general',
        example: '15165820',
      },
      {
        id: 'lit_title',
        label: 'Title',
        itemType: 'single',
        term: 'lit_title',
        dataType: 'string',
        fieldType: 'general',
        example: 'protein',
      },
      {
        id: 'lit_citation_id',
        label: 'Citation ID',
        itemType: 'single',
        term: 'lit_citation_id',
        dataType: 'string',
        fieldType: 'general',
        example: 'CI-6EPRJ6MFFS5LC',
      },
      {
        id: 'computational_pubmed_id',
        label: 'Computational PubMed ID',
        itemType: 'single',
        term: 'computational_pubmed_id',
        dataType: 'string',
        fieldType: 'general',
        example: '15165820',
      },
      {
        id: 'community_pubmed_id',
        label: 'Community PubMed ID',
        itemType: 'single',
        term: 'community_pubmed_id',
        dataType: 'string',
        fieldType: 'general',
        example: '15165820',
      },
    ],
  },
  {
    id: 'proteomes',
    label: 'Proteomes',
    itemType: 'group',
    items: [
      {
        id: 'proteome',
        label: 'Proteome ID',
        itemType: 'single',
        term: 'proteome',
        dataType: 'string',
        fieldType: 'general',
        example: 'UP000005640',
        regex: '(?i)^UP[0-9]{9}$',
      },
      {
        id: 'proteome_component',
        label: 'Proteome Component',
        itemType: 'single',
        term: 'proteomecomponent',
        dataType: 'string',
        fieldType: 'general',
        example: 'chromosome',
      },
    ],
  },
  {
    id: 'cited_for',
    label: 'Cited for',
    itemType: 'single',
    term: 'scope',
    dataType: 'string',
    fieldType: 'general',
    example: 'microtubule',
  },
  {
    id: 'reviewed',
    label: 'Reviewed',
    itemType: 'single',
    term: 'reviewed',
    dataType: 'boolean',
    fieldType: 'general',
    example: 'true',
    regex: '^true|false$',
    values: [
      {
        name: 'Yes',
        value: 'true',
      },
      {
        name: 'No',
        value: 'false',
      },
    ],
  },
  {
    id: 'active',
    label: 'Active',
    itemType: 'single',
    term: 'active',
    dataType: 'boolean',
    fieldType: 'general',
    example: 'true',
    regex: '^true|false$',
    values: [
      {
        name: 'Yes',
        value: 'true',
      },
      {
        name: 'No',
        value: 'false',
      },
    ],
  },
] as SearchTermType[];

export const idToSearchTerm = keyBy(
  flatten(configureSearchTerms),
  ({ id }) => id
);

export default configureSearchTerms;
