import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: string[];
  cardColumns: string[];
  facets: Facet[];
  nextUrl: string;
  results: {
    data: UniProtkbAPIModel[];
    isFetching: boolean;
    isFetched: { [url: string]: boolean };
  };
  totalNumberResults: number;
  viewMode: ViewMode;
  fields: {
    data: any;
    isFetching: boolean;
  };
};

const resultsInitialState = {
  // tableColumns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  tableColumns: ["accession", "id", "gene_names", "organism", "protein_name", "date_create", "date_mod", "date_seq_mod", "version", "cc:developmental_stage", "cc:induction", "cc:tissue_specificity", "ft:coiled", "ft:compbias", "ft:domain", "ft:motif", "cc:domain", "protein_families", "ft:repeat", "ft:region", "cc:similarity", "ft:zn_fing", "absorption", "ft:act_site", "ft:binding", "ft:ca_bind", "cc:catalytic_activity", "cc:cofactor", "ft:dna_bind", "ec", "cc:enzyme_regulation", "cc:function", "kinetics", "ft:metal", "ft:np_bind", "cc:pathway", "ph_dependence", "redox_potential", "ft:site", "temp_dependence", "dr:pdbsum", "dr:pdb", "dr:evolutionarytrace", "dr:genomernai"],
  cardColumns: [
    'accession',
    'id',
    'protein_name',
    'gene_names',
    'organism',
    'keyword',
    'cc:function',
    'sequence',
  ],
  results: {
    data: [],
    isFetching: false,
    isFetched: {},
  },
  facets: [],
  nextUrl: '',
  totalNumberResults: 0,
  viewMode: ViewMode.CARD,
  fields: {
    data: [],
    isFetching: false,
  },
};

export default resultsInitialState;
