import { Fragment } from 'react';
import { Link } from 'react-router';
import { partialRight } from 'lodash-es';
import { ExpandableList, LongNumber, Sequence } from 'franklin-sites';

import ExternalLink from '../../shared/components/ExternalLink';
import AccessionView from '../../shared/components/results/AccessionView';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';

import useDatabaseInfoMaps from '../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../shared/config/externalUrls';
import { getEntryPath } from '../../app/config/urls';
import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';

import getLabelAndTooltip from '../../shared/utils/getLabelAndTooltip';
import { getUrlFromDatabaseInfo } from '../../shared/utils/xrefs';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import {
  SequenceFeature,
  UniParcLiteAPIModel,
} from '../adapters/uniParcConverter';

export enum UniParcColumn {
  // Names & taxonomy
  upi = 'upi',
  gene = 'gene',
  organismID = 'organism_id',
  organism = 'organism',
  protein = 'protein',
  proteome = 'proteome',
  commonTaxons = 'common_taxons',
  commonTaxonID = 'common_taxon_ids',
  // Sequences
  checksum = 'checksum',
  length = 'length',
  sequence = 'sequence',
  // Miscellaneous
  accession = 'accession', // map to UniProtKB column
  // Date of
  firstSeen = 'first_seen',
  lastSeen = 'last_seen',
  // Family & domains
  cdd = 'CDD',
  gene3D = 'Gene3D',
  hamap = 'HAMAP',
  panther = 'PANTHER',
  pfam = 'Pfam',
  pirsf = 'PIRSF',
  prints = 'PRINTS',
  prosite = 'PROSITE',
  sfld = 'SFLD',
  smart = 'SMART',
  supfam = 'SUPFAM',
  ncbifam = 'NCBIfam',
  funfam = 'FUNFAM',
  from = 'from',
}

export const defaultColumns = [
  UniParcColumn.upi,
  UniParcColumn.commonTaxons,
  UniParcColumn.length,
  UniParcColumn.accession,
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
];

export const primaryKeyColumns = [UniParcColumn.upi];

const UniParcColumnConfiguration: ColumnConfiguration<
  UniParcColumn,
  UniParcLiteAPIModel
> = new Map();

const FamilyAndDomain = ({
  data,
  db,
  externalURLAccessor,
}: {
  data: UniParcLiteAPIModel;
  db: SequenceFeature['database'];
  externalURLAccessor?: (id: string) => string;
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <ExpandableList displayNumberOfHiddenItems>
      {data.sequenceFeatures
        ?.filter(
          (feature): feature is SequenceFeature => feature.database === db
        )
        .map((feature) => (
          <span title={feature.interproGroup?.name} key={feature.databaseId}>
            <ExternalLink
              url={
                externalURLAccessor
                  ? externalURLAccessor(feature.databaseId)
                  : getUrlFromDatabaseInfo(databaseInfoMaps, db, {
                      id: feature.databaseId,
                    })
              }
            >
              {feature.databaseId}
            </ExternalLink>
            {feature.interproGroup && (
              <>
                &nbsp;(&nbsp;
                <ExternalLink
                  url={externalUrls.InterProEntry(feature.interproGroup.id)}
                >
                  {feature.interproGroup.id}
                </ExternalLink>
                )
              </>
            )}
          </span>
        ))}
    </ExpandableList>
  );
};

const familyAndDomainRenderer = (
  data: UniParcLiteAPIModel,
  db: SequenceFeature['database'],
  externalURLAccessor?: (id: string) => string
) => (
  <FamilyAndDomain
    data={data}
    db={db}
    externalURLAccessor={externalURLAccessor}
  />
);

// COLUMN RENDERERS BELOW
UniParcColumnConfiguration.set(UniParcColumn.upi, {
  ...getLabelAndTooltip('Entry', 'Unique and stable entry identifier'),
  render: ({ uniParcId }) => (
    <AccessionView id={uniParcId} namespace={Namespace.uniparc} />
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.gene, {
  ...getLabelAndTooltip(
    'Gene Names',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
  render: ({ geneNames }) => (
    <ExpandableList descriptionString="gene names" displayNumberOfHiddenItems>
      {geneNames?.map((gene) => <span key={gene}>{gene}</span>)}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  ...getLabelAndTooltip(
    'Organism IDs',
    'NCBI taxonomy identifiers of the source organisms ',
    'taxonomic_identifier'
  ),
  render: ({ organisms }) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {organisms?.map((organism) => (
        <TaxonomyView key={organism.taxonId} data={organism} displayOnlyID />
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organism, {
  ...getLabelAndTooltip(
    'Organisms',
    'Scientific name (and synonyms) of the source organism',
    'organism-name'
  ),
  render: ({ organisms }) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {organisms?.map((organism) => (
        <TaxonomyView key={organism.taxonId} data={organism} />
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.protein, {
  ...getLabelAndTooltip(
    'Protein Names',
    'Name(s) and synonym(s) of the protein',
    'protein_names'
  ),
  render: ({ proteinNames }) => (
    <ExpandableList
      descriptionString="protein names"
      displayNumberOfHiddenItems
      translate="yes"
    >
      {proteinNames?.map((proteinName) => (
        <span key={proteinName}>{proteinName}</span>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  ...getLabelAndTooltip(
    'Proteomes',
    'Unique proteome identifier(s) and component(s)'
  ),
  render: ({ proteomes }) => (
    <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
      {proteomes?.map((proteome) => (
        <Fragment key={`${proteome.id}-${proteome.component}`}>
          <Link to={getEntryPath(Namespace.proteomes, proteome.id)}>
            {proteome.id}
          </Link>
          {proteome.component ? ` (${proteome.component})` : undefined}
        </Fragment>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.commonTaxons, {
  ...getLabelAndTooltip(
    'Common taxonomies',
    'Common taxonomy identifiers shared by the sequence',
    'taxonomic_identifier'
  ),
  render: ({ commonTaxons }) => (
    <ExpandableList
      descriptionString="common taxonomies"
      displayNumberOfHiddenItems
    >
      {commonTaxons?.map((taxon) => (
        <Fragment key={`${taxon.commonTaxon}-${taxon.commonTaxonId}`}>
          <Link to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}>
            {taxon.commonTaxon}
          </Link>{' '}
          ({taxon.topLevel})
        </Fragment>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.commonTaxonID, {
  ...getLabelAndTooltip(
    'Common Taxononmy IDs',
    'Common taxonomy identifiers shared by the sequence',
    'taxonomic_identifier'
  ),
  render: ({ commonTaxons }) => (
    <ExpandableList
      descriptionString="common taxonomy IDs"
      displayNumberOfHiddenItems
    >
      {commonTaxons?.map((taxon) => (
        <Link
          key={taxon.commonTaxonId}
          to={getEntryPath(Namespace.taxonomy, taxon.commonTaxonId)}
        >
          {taxon.commonTaxonId}
        </Link>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.checksum, {
  ...getLabelAndTooltip(
    'Checksum',
    'Cyclic redundancy check value (CRC64)',
    'checksum'
  ),
  render: ({ sequence: { crc64 } }) => crc64,
});

UniParcColumnConfiguration.set(UniParcColumn.length, {
  ...getLabelAndTooltip('Length', 'Sequence length'),
  render: ({ sequence: { length } }) => <LongNumber>{length}</LongNumber>,
});

UniParcColumnConfiguration.set(UniParcColumn.sequence, {
  ...getLabelAndTooltip('Sequence', 'Amino acid sequence'),
  render: ({ sequence }) => (
    <Sequence sequence={sequence.value} isCollapsible={sequence.length > 400} />
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.accession, {
  ...getLabelAndTooltip(
    'UniProtKB',
    'UniProtKB entries describing this protein'
  ),
  render: ({ uniProtKBAccessions }) => (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {uniProtKBAccessions?.map((accession) =>
        accession.includes('.') ? (
          // Light object returns only a list of IDs. We can identify obsolete ones only if there is version attached to it
          <span key={accession}>{accession} (obsolete)</span>
        ) : (
          <Link
            key={accession}
            to={getEntryPath(Namespace.uniprotkb, accession)}
          >
            {accession}
          </Link>
        )
      )}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.firstSeen, {
  ...getLabelAndTooltip(
    'First seen',
    'Date when source database entry was associated with this sequence for the first time'
  ),
  render: ({ oldestCrossRefCreated }) => (
    <time dateTime={oldestCrossRefCreated}>{oldestCrossRefCreated}</time>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.lastSeen, {
  ...getLabelAndTooltip(
    'Last seen',
    'Date when source database entry was last confirmed to be associated with this sequence'
  ),
  render: ({ mostRecentCrossRefUpdated }) => (
    <time dateTime={mostRecentCrossRefUpdated}>
      {mostRecentCrossRefUpdated}
    </time>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.cdd, {
  label: 'CDD',
  render: partialRight(familyAndDomainRenderer, 'CDD'),
});

UniParcColumnConfiguration.set(UniParcColumn.gene3D, {
  label: 'Gene3D',
  render: partialRight(familyAndDomainRenderer, 'Gene3D', (id: string) =>
    externalUrls.Gene3DEntry(id)
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.hamap, {
  label: 'HAMAP',
  render: partialRight(familyAndDomainRenderer, 'HAMAP'),
});

UniParcColumnConfiguration.set(UniParcColumn.panther, {
  label: 'PANTHER',
  render: partialRight(familyAndDomainRenderer, 'PANTHER'),
});

UniParcColumnConfiguration.set(UniParcColumn.pfam, {
  label: 'Pfam',
  render: partialRight(familyAndDomainRenderer, 'Pfam'),
});

UniParcColumnConfiguration.set(UniParcColumn.pirsf, {
  label: 'PIRSF',
  render: partialRight(familyAndDomainRenderer, 'PIRSF'),
});

UniParcColumnConfiguration.set(UniParcColumn.prints, {
  label: 'PRINTS',
  render: partialRight(familyAndDomainRenderer, 'PRINTS'),
});

UniParcColumnConfiguration.set(UniParcColumn.prosite, {
  label: 'PROSITE',
  render: partialRight(familyAndDomainRenderer, 'PROSITE'),
});

UniParcColumnConfiguration.set(UniParcColumn.sfld, {
  label: 'SFLD',
  render: partialRight(familyAndDomainRenderer, 'SFLD'),
});

UniParcColumnConfiguration.set(UniParcColumn.smart, {
  label: 'SMART',
  render: partialRight(familyAndDomainRenderer, 'SMART'),
});

UniParcColumnConfiguration.set(UniParcColumn.supfam, {
  label: 'SUPFAM',
  render: partialRight(familyAndDomainRenderer, 'SUPFAM'),
});

UniParcColumnConfiguration.set(UniParcColumn.ncbifam, {
  label: 'NCBIfam',
  render: partialRight(familyAndDomainRenderer, 'NCBIfam'),
});

UniParcColumnConfiguration.set(UniParcColumn.funfam, {
  label: 'FUNFAM',
  render: partialRight(familyAndDomainRenderer, 'FUNFAM', (id: string) =>
    externalUrls.Funfam(id)
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.from, fromColumnConfig);

export default UniParcColumnConfiguration;
