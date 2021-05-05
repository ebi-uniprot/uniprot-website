import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ExpandableList, LongNumber } from 'franklin-sites';
import { capitalize } from 'lodash-es';

import BuscoView from '../components/BuscoView';
import BuscoLegend from '../components/BuscoLegend';
import AccessionView from '../../shared/components/results/AccessionView';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';
import BuscoAbbr from '../components/BuscoAbbr';

import { getEntryPath, LocationToPath, Location } from '../../app/config/urls';
import abbreviationToTitle from '../../shared/config/abbreviations';

import { Namespace } from '../../shared/types/namespaces';
import { ProteomesAPIModel } from '../adapters/proteomesConverter';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';

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
    <AccessionView
      id={id}
      entryType={proteomeType}
      namespace={Namespace.proteomes}
    />
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.organismID, {
  label: 'Organism ID',
  render: ({ taxonomy }) => <TaxonomyView data={taxonomy} displayOnlyID />,
});

ProteomesColumnConfiguration.set(ProteomesColumn.organism, {
  label: 'Organism',
  render: ({ taxonomy }) => <TaxonomyView data={taxonomy} />,
});

ProteomesColumnConfiguration.set(ProteomesColumn.components, {
  label: 'Components',
  render: ({ components }) =>
    components && (
      <ExpandableList descriptionString="components" displayNumberOfHiddenItems>
        {components?.map(({ name }) => name)}
      </ExpandableList>
    ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.mnemonic, {
  label: 'Mnemonic',
  render: ({ taxonomy }) => taxonomy.mnemonic,
});

// TODO: Eventually signify hidden nodes and unify view with UniProtKB as per https://www.ebi.ac.uk/panda/jira/browse/TRM-25206
ProteomesColumnConfiguration.set(ProteomesColumn.lineage, {
  label: 'Lineage',
  render: ({ taxonLineage }) =>
    taxonLineage?.map(({ scientificName, taxonId, rank }, index) => (
      <Fragment key={taxonId}>
        {index > 0 && ', '}
        <Link key={taxonId} to={getEntryPath(Namespace.taxonomy, taxonId)}>
          {scientificName}
          {rank !== 'no rank' && ` (${rank})`}
        </Link>
      </Fragment>
    )),
});

ProteomesColumnConfiguration.set(ProteomesColumn.cpd, {
  label: <abbr title={abbreviationToTitle.CPD}>CPD</abbr>,
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport?.cpdReport?.status,
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

ProteomesColumnConfiguration.set(ProteomesColumn.genomeRepresentation, {
  label: 'Genome representation',
  render: ({ genomeAssembly }) =>
    genomeAssembly && capitalize(genomeAssembly.level),
});

ProteomesColumnConfiguration.set(ProteomesColumn.proteinCount, {
  label: 'Protein count',
  render: ({ id, proteinCount }) =>
    proteinCount ? (
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${UniProtKBColumn.proteome}:${id}`,
        }}
      >
        <LongNumber>{proteinCount}</LongNumber>
      </Link>
    ) : (
      0
    ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.busco, {
  label: (
    <>
      <BuscoAbbr />
      <br />
      <BuscoLegend />
    </>
  ),
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport?.buscoReport && (
      <BuscoView report={proteomeCompletenessReport.buscoReport} />
    ),
});

export default ProteomesColumnConfiguration;
