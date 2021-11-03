/* eslint-disable camelcase */
import axios from 'axios';
import { GroupedGoTerms } from './functionConverter';

const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

type GOAspect =
  | 'cellular_component'
  | 'molecular_function'
  | 'biological_process';

type GOSLimSets = {
  goSlimSets: {
    name: string;
    id: string;
    associations: {
      name: string;
      id: `GO:${number}`;
      aspect: GOAspect;
    }[];
  }[];
};

type GOSlimmedData = {
  numberOfHits: number;
  pageInfo?: string;
  results: {
    slimsFromId: `GO:${number}`;
    slimsToIds: `GO:${number}`[];
  }[];
};

type AGRRibbonCategory = {
  description: string;
  id: `GO:${number}`;
  label: GOAspect;
  groups: {
    id: `GO:${number}`;
    label: string;
    description: string;
    type: string;
  }[];
};

type AGRRibbonSubject = {
  id: string;
  nb_classes: number; // n of children
  nb_annotations: number; // n of evidences
  label: string;
  taxon_id?: string;
  taxon_label?: string;
  groups: {
    [key: `GO:${number}`]: {
      [key: string]: {
        nb_classes: number;
        nb_annotations: number;
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

const slimData = async (
  agrSlimSet: `GO:${number}`[],
  fromList: `GO:${number}`[]
) => {
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

const slimDataToAGRRibbon = (data: GOSlimmedData): AGRRibbonData => {
  const categories: AGRRibbonCategory[] = [
    {
      id: 'GO:0003674',
      description: 'desc',
      label: 'biological_process',
      groups: [],
    },
  ];
  const subjects: AGRRibbonSubject[] = [
    {
      id: 'HGNC:11998',
      nb_classes: 169,
      nb_annotations: 442,
      label: 'TP53',
      taxon_id: 'NCBITaxon:9606',
      taxon_label: 'Homo sapiens',
      groups: {
        'GO:0003674': {
          ALL: {
            nb_classes: 37,
            nb_annotations: 94,
          },
          IDA: {
            nb_classes: 14,
            nb_annotations: 22,
          },
          ISS: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          ISA: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IPI: {
            nb_classes: 20,
            nb_annotations: 62,
          },
          IMP: {
            nb_classes: 2,
            nb_annotations: 3,
          },
          TAS: {
            nb_classes: 1,
            nb_annotations: 1,
          },
          IEA: {
            nb_classes: 2,
            nb_annotations: 2,
          },
          IBA: {
            nb_classes: 2,
            nb_annotations: 2,
          },
        },
      },
    },
  ];
  return { categories, subjects };
};

const handleGOData = async (
  goTerms?: GroupedGoTerms
): Promise<AGRRibbonData | null> => {
  if (!goTerms) {
    return null;
  }

  const fromList = Array.from(goTerms.values()).flatMap((goTerm) =>
    goTerm.map((term) => term.id)
  ) as `GO:${number}`[];

  const agrSlimSet = await getAGRSlimSet();
  if (!agrSlimSet) {
    return null;
  }
  const slimmedData = await slimData(agrSlimSet, fromList);
  const ribbonData = slimDataToAGRRibbon(slimmedData);
  return ribbonData;
};

export default handleGOData;
