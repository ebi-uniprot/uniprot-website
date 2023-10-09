import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ExpandableList, LongNumber } from 'franklin-sites';
import { capitalize } from 'lodash-es';

import ExternalLink from '../../shared/components/ExternalLink';
import BuscoView from '../components/BuscoView';
import BuscoLegend from '../components/BuscoLegend';
import AccessionView from '../../shared/components/results/AccessionView';

import { getEntryPath, LocationToPath, Location } from '../../app/config/urls';
import getLabelAndTooltip from '../../shared/utils/getLabelAndTooltip';

import { organism } from '../../automatic-annotations/shared/column-renderers/Organism';
import { organismId } from '../../automatic-annotations/shared/column-renderers/OrganismID';

import { Namespace } from '../../shared/types/namespaces';
import {
  ProteomesAPIModel,
  ProteomesUIModel,
} from '../adapters/proteomesConverter';
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

export const primaryKeyColumns = [ProteomesColumn.upid];

type Schema = ProteomesAPIModel | ProteomesUIModel;
export const ProteomesColumnConfiguration: ColumnConfiguration<
  ProteomesColumn,
  Schema
> = new Map();

// COLUMN RENDERERS BELOW
ProteomesColumnConfiguration.set(ProteomesColumn.upid, {
  ...getLabelAndTooltip('Entry', 'Unique proteome identifier'),
  render: ({ id, proteomeType }) => (
    <AccessionView
      id={id}
      entryType={proteomeType}
      namespace={Namespace.proteomes}
    />
  ),
});

ProteomesColumnConfiguration.set(
  ProteomesColumn.organismID,
  organismId(({ taxonomy }: Schema) => taxonomy)
);

ProteomesColumnConfiguration.set(
  ProteomesColumn.organism,
  organism(
    ({ taxonomy }: Schema) => taxonomy,
    ({ strain }: Schema) => strain
  )
);

ProteomesColumnConfiguration.set(ProteomesColumn.components, {
  ...getLabelAndTooltip(
    'Components',
    'Genomic components encoding the proteome',
    'proteome_component'
  ),

  render: ({ components }) => (
    <ExpandableList descriptionString="components" displayNumberOfHiddenItems>
      {components?.map(({ name }) => name)}
    </ExpandableList>
  ),
});

ProteomesColumnConfiguration.set(ProteomesColumn.mnemonic, {
  ...getLabelAndTooltip(
    'Mnemonic',
    'Mnemonic organism identification code of at most 5 alphanumeric characters used in the entry names of UniProtKB entries',
    'taxonomy'
  ),
  render: ({ taxonomy }) => taxonomy.mnemonic,
});

// TODO: Eventually signify hidden nodes and unify view with UniProtKB as per https://www.ebi.ac.uk/panda/jira/browse/TRM-25206
ProteomesColumnConfiguration.set(ProteomesColumn.lineage, {
  ...getLabelAndTooltip(
    'Lineage',
    'Hierarchical classification of the source organism',
    'taxonomic_lineage'
  ),
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
  ...getLabelAndTooltip(
    'CPD',
    "Complete Proteome Detector (CPD) is an algorithm which employs statistical evaluation of the completeness and quality of proteomes in UniProt, by looking at the sizes of taxonomically close proteomes. Possible values are 'Standard', 'Close to standard (high value)', 'Close to standard (low value)', 'Outlier (high value)', 'Outlier (low value)' or 'Unknown'.",
    'assessing_proteomes'
  ),
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport?.cpdReport?.status,
});

ProteomesColumnConfiguration.set(ProteomesColumn.genomeAssembly, {
  ...getLabelAndTooltip(
    'Genome assembly ID',
    'Identifier for the genome assembly'
  ),
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
  ...getLabelAndTooltip(
    'Genome representation',
    'NCBI RefSeq’s assessment of genome assembly representation'
  ),

  render: ({ genomeAssembly }) =>
    genomeAssembly && capitalize(genomeAssembly.level),
});

ProteomesColumnConfiguration.set(ProteomesColumn.proteinCount, {
  ...getLabelAndTooltip(
    'Protein count',
    'Number of protein entries associated with this proteome: UniProtKB entries for regular proteomes or UniParc entries for redundant proteomes'
  ),
  render: ({ id, proteinCount, proteomeType }) => {
    if (!proteinCount) {
      return 0;
    }
    const shouldPointToUniParc =
      proteomeType === 'Excluded' || proteomeType === 'Redundant proteome';
    return (
      <Link
        to={{
          pathname:
            LocationToPath[
              shouldPointToUniParc
                ? Location.UniParcResults
                : Location.UniProtKBResults
            ],
          search: `query=${shouldPointToUniParc ? 'upid' : 'proteome'}:${id}`,
        }}
      >
        {/* Excluded not supported at the moment, need to wait for TRM-28011 */}
        {proteomeType === 'Excluded' ? (
          'Browse UniParc entries'
        ) : (
          <LongNumber>{proteinCount}</LongNumber>
        )}
      </Link>
    );
  },
});

ProteomesColumnConfiguration.set(ProteomesColumn.busco, {
  ...getLabelAndTooltip(
    <>
      BUSCO
      <br />
      <BuscoLegend />
    </>,
    'The Benchmarking Universal Single-Copy Ortholog (BUSCO) assessment tool is used, for eukaryotic and bacterial proteomes, to provide quantitative measures of UniProt proteome data completeness in terms of expected gene content.',
    'assessing_proteomes'
  ),
  render: ({ proteomeCompletenessReport }) =>
    proteomeCompletenessReport?.buscoReport && (
      <BuscoView report={proteomeCompletenessReport.buscoReport} />
    ),
});

export default ProteomesColumnConfiguration;
