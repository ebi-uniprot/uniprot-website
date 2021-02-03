import { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { ExternalLink } from 'franklin-sites';

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
  busco = 'busco',
  cpd = 'cpd',
  genomeAssembly = 'genome_assembly',
  genomeRepresentation = 'genome_representation',
  proteinCount = 'protein_count',
}

export const defaultColumns = [
  ProteomesColumn.upid,
  ProteomesColumn.organism,
  ProteomesColumn.organismID,
  ProteomesColumn.proteinCount,
  ProteomesColumn.busco,
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
  render: ({ taxonomy }) => (
    <Link
      to={generatePath(LocationToPath[Location.TaxonomyEntry], {
        accession: String(taxonomy.taxonId),
      })}
    >
      {taxonomy.taxonId}
    </Link>
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.organism, {
  label: 'Organism',
  // TODO: update (REF) with proper frankin component when complete in https://www.ebi.ac.uk/panda/jira/browse/TRM-25391
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

ProteomesColumnConfiguration.set(ProteomesColumn.components, {
  label: 'Components',
  // TODO: wait for confirmation from Jie if components should be rendered. Note not shown in current UniProt
  render: ({ components }) => components && null,
});

ProteomesColumnConfiguration.set(ProteomesColumn.mnemonic, {
  label: 'Mnemonic',
  render: ({ taxonomy }) => taxonomy.mnemonic,
});

// TODO: Reflect current view in uniprot.org. This may want, pending discussion, to be improved as part of https://www.ebi.ac.uk/panda/jira/browse/TRM-25206.
ProteomesColumnConfiguration.set(ProteomesColumn.lineage, {
  label: 'Lineage',
  render: ({ taxonLineage }) =>
    taxonLineage
      ?.map<ReactNode>(({ scientificName, taxonId }) => (
        <Link
          key={taxonId}
          to={generatePath(LocationToPath[Location.TaxonomyEntry], {
            accession: String(taxonId),
          })}
        >
          {scientificName}
        </Link>
      ))
      .reduce((prev, curr) => [prev, ', ', curr]),
});

ProteomesColumnConfiguration.set(ProteomesColumn.cpd, {
  label: <abbr title="Complete Proteome Detector">CPD</abbr>,
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport.cpdReport.status,
});

ProteomesColumnConfiguration.set(ProteomesColumn.genomeAssembly, {
  label: 'Genome assembly ID',
  render: ({ genomeAssembly }) => {
    if (!genomeAssembly) {
      return null;
    }
    if (genomeAssembly.genomeAssemblyUrl) {
      return (
        <ExternalLink url={genomeAssembly.genomeAssemblyUrl}>
          {genomeAssembly.assemblyId}
        </ExternalLink>
      );
    }
    return genomeAssembly.assemblyId;
  },
});

// TODO: this exists in the data but is not in result-fields yet. Backend to amend imminently.
ProteomesColumnConfiguration.set(ProteomesColumn.genomeRepresentation, {
  label: 'Genome representation (RefSeq)',
  render: ({ genomeAssembly }) => genomeAssembly?.level,
});

ProteomesColumnConfiguration.set(ProteomesColumn.proteinCount, {
  label: 'Protein Count',
  render: ({ id, proteinCount }) => (
    <Link
      to={{
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `query=proteome:${id}`,
      }}
    >
      {/* TODO: to eventually be supported by the backend in 2021_02 - 2021_03 */}
      {proteinCount ?? 'no data yet'}
    </Link>
  ),
});

// TODO: implement BUSCO viz

export default ProteomesColumnConfiguration;
