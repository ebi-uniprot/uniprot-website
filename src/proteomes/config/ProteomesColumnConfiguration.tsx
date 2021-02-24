import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'franklin-sites';

import BuscoView from '../components/BuscoView';
import BuscoLabel from '../components/BuscoLabel';
import AccessionView from '../components/AccessionView';
import { OrganismDataView } from '../../shared/components/views/OrganismDataView';

import { getEntryPath, Location, LocationToPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import { ProteomesAPIModel } from '../adapters/proteomesConverter';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';

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

export const ProteomesColumnConfiguration: ColumnConfiguration<
  ProteomesColumn,
  ProteomesAPIModel
> = new Map();

// COLUMN RENDERERS BELOW
ProteomesColumnConfiguration.set(ProteomesColumn.upid, {
  label: 'Entry',
  render: ({ id, proteomeType }) => (
    <AccessionView id={id} proteomeType={proteomeType} />
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.organismID, {
  label: 'Organism ID',
  render: ({ taxonomy }) => (
    <OrganismDataView organism={taxonomy} displayOnlyID />
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.organism, {
  label: 'Organism',
  render: ({ taxonomy }) => <OrganismDataView organism={taxonomy} />,
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
    taxonLineage?.map(({ scientificName, taxonId }, index) => (
      <Fragment key={taxonId}>
        {index > 0 && ', '}
        <Link key={taxonId} to={getEntryPath(Namespace.taxonomy, taxonId)}>
          {scientificName}
        </Link>
      </Fragment>
    )),
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

ProteomesColumnConfiguration.set(ProteomesColumn.busco, {
  label: <BuscoLabel />,
  render: ({ proteomeCompletenessReport: { buscoReport } }) =>
    buscoReport && <BuscoView report={buscoReport} />,
});
// TODO: implement BUSCO viz

export default ProteomesColumnConfiguration;
