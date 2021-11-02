import axios from 'axios';
import { GroupedGoTerms } from './functionConverter';

const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

type GOSLimSets = {
  goSlimSets: {
    name: string;
    id: string;
    associations: {
      name: string;
      id: `GO:${number}`;
      aspect:
        | 'cellular_component'
        | 'molecular_function'
        | 'biological_process';
    }[];
  }[];
};

const getAGRSlimSet = async () => {
  const slimSets = await axios.get<GOSLimSets>(SLIM_SETS_URL);
  const agrSlimSet = slimSets.data?.goSlimSets.find(
    (slimSet) => slimSet.id === 'goslim_agr'
  );
  return agrSlimSet?.associations.map((association) => association.id);
};

const handleGOData = async (goTerms?: GroupedGoTerms) => {
  if (!goTerms) {
    return;
  }

  const fromList = Array.from(goTerms.values()).flatMap((goTerm) =>
    goTerm.map((term) => term.id)
  );

  const agrSlimSet = await getAGRSlimSet();
  const slimmedData = await axios.get(SLIMMING_URL, {
    params: {
      slimsToIds: agrSlimSet?.join(','),
      slimsFromIds: fromList.join(','),
      relations: 'is_a,part_of,occurs_in,regulates',
    },
  });
  return slimmedData.data;
};

export default handleGOData;
