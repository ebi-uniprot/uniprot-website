import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { partialRight, uniqBy } from 'lodash-es';
import { ExpandableList, LongNumber, Sequence } from 'franklin-sites';

import ExternalLink from '../../shared/components/ExternalLink';
import EntryTypeIcon from '../../shared/components/entry/EntryTypeIcon';
import AccessionView from '../../shared/components/results/AccessionView';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';

import useDatabaseInfoMaps from '../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../shared/config/externalUrls';
import { getEntryPath } from '../../app/config/urls';
import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';

import parseDate from '../../shared/utils/parseDate';
import xrefGetter from '../utils/xrefGetter';
import getLabelAndTooltip from '../../shared/utils/getLabelAndTooltip';
import { getUrlFromDatabaseInfo } from '../../shared/utils/xrefs';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import {
  SequenceFeature,
  UniParcAPIModel,
  UniParcXRef,
} from '../adapters/uniParcConverter';
import { TabLocation } from '../../uniprotkb/types/entry';

export enum UniParcColumn {
  // Names & taxonomy
  upi = 'upi',
  gene = 'gene',
  organismID = 'organism_id',
  organism = 'organism',
  protein = 'protein',
  proteome = 'proteome',
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
  from = 'from',
}

export const defaultColumns = [
  UniParcColumn.upi,
  UniParcColumn.organism,
  UniParcColumn.length,
  UniParcColumn.accession,
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
];

export const primaryKeyColumns = [UniParcColumn.upi];

const UniParcColumnConfiguration: ColumnConfiguration<
  UniParcColumn,
  UniParcAPIModel
> = new Map();

const FamilyAndDomain = ({
  data,
  db,
  externalURLAccessor,
}: {
  data: UniParcAPIModel;
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
  data: UniParcAPIModel,
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
  render: (data) => (
    <ExpandableList descriptionString="gene names" displayNumberOfHiddenItems>
      {xrefGetter(data, 'geneName')}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  ...getLabelAndTooltip(
    'Organism IDs',
    'NCBI taxonomy identifiers of the source organisms ',
    'taxonomic_identifier'
  ),
  render: (data) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {xrefGetter(data, 'organism', 'taxonId')?.map((taxon) => (
        <TaxonomyView key={taxon.taxonId} data={taxon} displayOnlyID />
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
  render: (data) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {xrefGetter(data, 'organism', 'taxonId')?.map((taxon) => (
        <TaxonomyView key={taxon.taxonId} data={taxon} />
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
  render: (data) => (
    <ExpandableList
      descriptionString="protein names"
      displayNumberOfHiddenItems
      translate="yes"
    >
      {xrefGetter(data, 'proteinName')}
    </ExpandableList>
  ),
});

type XRefWithProteomeId = UniParcXRef &
  Required<Pick<UniParcXRef, 'proteomeId'>>;
UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  ...getLabelAndTooltip(
    'Proteomes',
    'Unique proteome identifier(s) and component(s)'
  ),
  render: ({ uniParcCrossReferences }) => (
    <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
      {uniqBy(
        uniParcCrossReferences?.filter((xref): xref is XRefWithProteomeId =>
          Boolean(xref.proteomeId)
        ) || [],
        (xref) => `${xref.proteomeId}-${xref.component}`
      ).map((xref) => (
        <Fragment key={`${xref.proteomeId}-${xref.component}`}>
          <Link to={getEntryPath(Namespace.proteomes, xref.proteomeId)}>
            {xref.proteomeId}
          </Link>
          {xref.component ? ` (${xref.component})` : undefined}
        </Fragment>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.checksum, {
  ...getLabelAndTooltip('Checksum', 'Cyclic redundancy check value (CRC64)'),
  render: ({ sequence: { crc64 } }) => crc64,
});

UniParcColumnConfiguration.set(UniParcColumn.length, {
  ...getLabelAndTooltip('Length', 'Sequence length'),
  render: ({ sequence: { length } }) => <LongNumber>{length}</LongNumber>,
});

UniParcColumnConfiguration.set(UniParcColumn.sequence, {
  ...getLabelAndTooltip('Sequence', 'Amino acid sequence'),
  render: ({ sequence }) => (
    <Sequence sequence={sequence.value} showActionBar={false} />
  ),
});

type XRefWithDatabase = UniParcXRef &
  Required<Pick<UniParcXRef, 'database' | 'id'>>;
UniParcColumnConfiguration.set(UniParcColumn.accession, {
  ...getLabelAndTooltip(
    'UniProtKB',
    'UniProtKB entries describing this protein'
  ),
  render: ({ uniParcCrossReferences }) => (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {uniParcCrossReferences
        ?.filter((xref): xref is XRefWithDatabase =>
          Boolean(xref.database?.startsWith('UniProtKB') && xref.id)
        )
        .map((xref, index) => {
          const key = `${xref.id}-${
            // isoforms will not have versions
            xref.version || index
          }-${xref.database}-${xref.active}`;
          const icon = <EntryTypeIcon entryType={xref.database} />;

          // If it's an inactive isoform, no link
          if (xref.database.includes('isoforms') && !xref.active) {
            return (
              <span key={key}>
                {icon}
                {xref.id} (obsolete)
              </span>
            );
          }
          return (
            <Link
              key={key}
              to={getEntryPath(
                Namespace.uniprotkb,
                xref.id,
                xref.active ? TabLocation.Entry : TabLocation.History
              )}
            >
              <EntryTypeIcon entryType={xref.database} />
              {xref.id}
              {xref.version && !xref.active ? `.${xref.version}` : ''}
              {xref.active ? '' : ' (obsolete)'}
            </Link>
          );
        })}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.firstSeen, {
  ...getLabelAndTooltip(
    'First seen',
    'Date when source database entry was associated with this sequence for the first time'
  ),
  render(data) {
    // TODO: use `xref.oldestCrossRefCreated` whenever returned by backend
    const created = xrefGetter(data, 'created');
    if (!created?.length) {
      return null;
    }
    const firstSeen = created.sort()[0];
    return (
      <time dateTime={parseDate(firstSeen)?.toISOString()}>{firstSeen}</time>
    );
  },
});

UniParcColumnConfiguration.set(UniParcColumn.lastSeen, {
  ...getLabelAndTooltip(
    'Last seen',
    'Date when source database entry was last confirmed to be associated with this sequence'
  ),
  render(data) {
    // TODO: use `xref.mostRecentCrossRefUpdated` whenever returned by backend
    const lastUpdated = xrefGetter(data, 'lastUpdated');
    if (!lastUpdated?.length) {
      return null;
    }
    const lastSeen = lastUpdated.sort()[lastUpdated.length - 1];
    return (
      <time dateTime={parseDate(lastSeen)?.toISOString()}>{lastSeen}</time>
    );
  },
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

UniParcColumnConfiguration.set(UniParcColumn.from, fromColumnConfig);

export default UniParcColumnConfiguration;
