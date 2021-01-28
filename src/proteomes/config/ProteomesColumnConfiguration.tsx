import { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';

import {
  ProteomesAPIModel,
  ProteomeType,
} from '../adapters/proteomesConverter';

import { Location, LocationToPath } from '../../app/config/urls';

export enum ProteomesColumn {
  // Names & taxonomy
  upid = 'upid',
  organismID = 'organism_id',
  organism = 'organism',
  components = 'components',
  mnemonic = 'mnemonic',
  lineage = 'lineage',
  // Miscellaneous
  busco = 'busco', // TODO: implement BUSCO viz
  cpd = 'cpd',
  genomeAssembly = 'genome_assembly',
  genomeRepresentation = 'genome_representation', // TODO: this exists in the data but is not in result-fields yet. Backend to amend imminently.
  proteinCount = 'protein_count', // TODO: to eventually be supported by the backend in 2021_02 - 2021_03
}

export const defaultColumns = [
  ProteomesColumn.upid,
  ProteomesColumn.organism,
  ProteomesColumn.organismID,
  // ProteomesColumn.proteinCount, // TODO: to eventually be supported by the backend in 2021_02 - 2021_03
  // ProteomesColumn.busco, // TODO: implement BUSCO viz
  ProteomesColumn.cpd,
];

export const primaryKeyColumn = ProteomesColumn.upid;

export const ProteomesColumnConfiguration = new Map<
  ProteomesColumn,
  {
    label: ReactNode;
    render: (data: ProteomesAPIModel) => ReactNode;
  }
>();

// COLUMN RENDERERS BELOW
ProteomesColumnConfiguration.set(ProteomesColumn.upid, {
  label: 'Entry',
  render: ({ id }) => (
    <Link
      to={generatePath(LocationToPath[Location.ProteomesEntry], {
        accession: id,
      })}
    >
      {id}
    </Link>
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.organismID, {
  label: 'Organism ID',
  render: ({ taxonomy }) => taxonomy.taxonId,
});

ProteomesColumnConfiguration.set(ProteomesColumn.organism, {
  label: 'Organism',
  // TODO: update R with proper frankin component
  render: ({ taxonomy, proteomeType }) => (
    <>
      {[
        ProteomeType.REFERENCE,
        ProteomeType.REFERENCE_AND_REPRESENTATIVE,
        ProteomeType.REPRESENTATIVE,
      ].includes(proteomeType) && '(REF) '}
      {taxonomy.scientificName}
    </>
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.cpd, {
  label: 'CPD',
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport.cpdReport.status,
});

ProteomesColumnConfiguration.set(ProteomesColumn.genomeAssembly, {
  label: 'Genome assembly ID',
  render: ({ genomeAssembly }) => genomeAssembly?.assemblyId,
});

ProteomesColumnConfiguration.set(ProteomesColumn.genomeRepresentation, {
  label: 'Genome representation (RefSeq)',
  render: ({ genomeAssembly }) => genomeAssembly.level,
});

// TODO: to eventually be supported by the backend in 2021_02 - 2021_03
// ProteomesColumnConfiguration.set(ProteomesColumn.proteinCount, {
//   label: 'Protein Count',
//   render: ({ proteinCount }) => proteinCount
// });

export default ProteomesColumnConfiguration;
