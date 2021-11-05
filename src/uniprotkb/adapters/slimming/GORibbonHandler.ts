/* eslint-disable camelcase */
import axios from 'axios';
import _groupBy from 'lodash-es/groupBy';

import { GroupedGoTerms } from '../functionConverter';

const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

type GOAspect =
  | 'cellular_component'
  | 'molecular_function'
  | 'biological_process';

type GOTerm = `GO:${number}${string}`;

type GOSLimSets = {
  goSlimSets: {
    name: string;
    id: string;
    associations: {
      name: string;
      id: GOTerm;
      aspect: GOAspect;
    }[];
  }[];
};

export type GOSlimmedData = {
  numberOfHits: number;
  pageInfo?: string | null; // should this be null or bug with endpoint?
  results: {
    slimsFromId: GOTerm;
    slimsToIds: GOTerm[];
  }[];
};

type AGRRibbonCategory = {
  // Each category represents an aspect
  description: string;
  id: GOTerm;
  label: GOAspect;
  groups: {
    id: GOTerm;
    label: string;
    description: string;
    type: string;
  }[];
};

type AGRRibbonSubject = {
  id: string; // The accession
  nb_classes: number; // n of children
  nb_annotations: number; // n of evidences
  label: string; // Protein name
  taxon_id?: string;
  taxon_label?: string;
  groups: {
    [key: GOTerm]: {
      [key: string]: {
        // This is the evidence tag
        terms?: GOTerm[];
        nb_classes: number; // Number of slimmed terms
        nb_annotations: number; // ??
      };
    };
  };
};

export type AGRRibbonData = {
  categories: AGRRibbonCategory[];
  subjects: AGRRibbonSubject[];
};

const getAGRSlimSet = async () => {
  const slimSets = await axios.get<GOSLimSets>(SLIM_SETS_URL);
  const agrSlimSet = slimSets.data?.goSlimSets.find(
    (slimSet) => slimSet.id === 'goslim_agr'
  );
  return agrSlimSet?.associations.map((association) => association.id);
};

const slimData = async (agrSlimSet: GOTerm[], fromList: GOTerm[]) => {
  // TODO handle pagination
  const slimmedData = await axios.get<GOSlimmedData>(SLIMMING_URL, {
    params: {
      slimsToIds: agrSlimSet?.join(','),
      slimsFromIds: fromList.join(','),
      relations: 'is_a,part_of,occurs_in,regulates',
    },
  });
  return slimmedData.data;
};

const aspectDefinition = [
  {
    aspect: 'Molecular Function',
    id: 'GO:0003674',
    description:
      'A molecular process that can be carried out by the action of a single macromolecular machine, usually via direct physical interactions with other molecular entities. Function in this sense denotes an action, or activity, that a gene product (or a complex) performs. These actions are described from two distinct but related perspectives: (1) biochemical activity, and (2) role as a component in a larger system/process.',
  },
  {
    aspect: 'Biological Process',
    id: 'GO:0008150',
    description:
      'A biological process represents a specific objective that the organism is genetically programmed to achieve. Biological processes are often described by their outcome or ending state, e.g., the biological process of cell division results in the creation of two daughter cells (a divided cell) from a single parent cell. A biological process is accomplished by a particular set of molecular functions carried out by specific gene products (or macromolecular complexes), often in a highly regulated manner and in a particular temporal sequence.',
  },
  {
    aspect: 'Cellular Component',
    id: 'GO:0005575',
    description:
      'A location, relative to cellular compartments and structures, occupied by a macromolecular machine when it carries out a molecular function. There are two ways in which the gene ontology describes locations of gene products: (1) relative to cellular structures (e.g., cytoplasmic side of plasma membrane) or compartments (e.g., mitochondrion), and (2) the stable macromolecular complexes of which they are parts (e.g., the ribosome).',
  },
];

const slimDataToAGRRibbon = (
  goTerms: GroupedGoTerms,
  data: GOSlimmedData,
  primaryAccession: string
): AGRRibbonData => {
  const flatTerms = [...goTerms.values()].flatMap((groupedTerm) =>
    groupedTerm.map((item) => item)
  );

  // Map(['cellular_component', [{slimTo : [slimfroms with evidence]}]])

  const enrichedData = data.results
    .filter((mapping) => mapping.slimsToIds.length > 0)
    .map((mapping) => ({
      // TODO: check, is everything there? What if nothing is found???
      slimFrom: flatTerms.find((term) => term.id === mapping.slimsFromId),
      slimTo: [
        ...flatTerms.filter((term) => mapping.slimsToIds.includes(term.id)),
      ],
    }));

  const groupedEnrichedData = _groupBy(
    enrichedData,
    (item) => item.slimFrom?.aspect
  );

  console.log(groupedEnrichedData);

  const categories: AGRRibbonCategory[] = aspectDefinition.map(
    ({ aspect, id, description }) => ({
      id,
      label: aspect,
      description,
      groups: groupedEnrichedData[aspect].map((mapping) => ({
        id: mapping.slimFrom?.id,
        description: mapping.slimFrom?.termDescription,
        label: mapping.slimFrom?.properties.GoTerm,
        groups: [
          mapping.slimTo.map((slimToTerm) => ({
            id: slimToTerm.id,
            label: slimToTerm.properties.GoTerm,
            description: slimToTerm.termDescription,
            type: 'type',
            groups: [],
          })),
        ],
      })),
    })
  );
  const subjectGroups = data.results.reduce((obj, mapping) => {
    obj[mapping.slimsFromId] = {
      ALL: {
        nb_classes: mapping.slimsToIds.length,
        nb_annotations: 0,
      },
    };
    return obj;
  }, {});

  const subjects: AGRRibbonSubject[] = [
    {
      id: primaryAccession,
      nb_classes: 169,
      nb_annotations: 442,
      label: 'TP53',
      taxon_id: 'NCBITaxon:9606',
      taxon_label: 'Homo sapiens',
      groups: subjectGroups,
    },
  ];
  return { categories, subjects };
};

const handleGOData = async (
  goTerms: GroupedGoTerms,
  primaryAccession?: string
): Promise<AGRRibbonData | null> => {
  if (!goTerms) {
    return null;
  }

  const fromList = [...goTerms.values()].flatMap((groupedTerm) =>
    groupedTerm.map(({ id }) => id)
  ) as GOTerm[];

  const agrSlimSet = await getAGRSlimSet();
  if (!agrSlimSet) {
    return null;
  }
  const slimmedData = await slimData(agrSlimSet, fromList);
  const ribbonData = slimDataToAGRRibbon(
    goTerms,
    slimmedData,
    primaryAccession
  );
  return ribbonData;
};

export default handleGOData;
