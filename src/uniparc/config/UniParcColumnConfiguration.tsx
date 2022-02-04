import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { uniqBy } from 'lodash-es';
import {
  ExpandableList,
  ExternalLink,
  LongNumber,
  Sequence,
} from 'franklin-sites';

import { EntryTypeIcon } from '../../shared/components/entry/EntryTypeIcon';
import AccessionView from '../../shared/components/results/AccessionView';
import TaxonomyView from '../../shared/components/entry/TaxonomyView';

import externalUrls from '../../shared/config/externalUrls';
import { getEntryPath } from '../../app/config/urls';
import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';

import parseDate from '../../shared/utils/parseDate';
import xrefGetter from '../utils/xrefGetter';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';

import {
  SequenceFeature,
  UniParcAPIModel,
  UniParcXRef,
} from '../adapters/uniParcConverter';

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
  tigrfams = 'TIGRFAMs',
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

export const UniParcColumnConfiguration: ColumnConfiguration<
  UniParcColumn,
  UniParcAPIModel
> = new Map();

const familyAndDomainRenderer =
  (
    db: SequenceFeature['database'],
    externalURLAccessor: keyof typeof externalUrls
  ) =>
  (data: UniParcAPIModel) =>
    (
      <ExpandableList displayNumberOfHiddenItems>
        {data.sequenceFeatures
          ?.filter(
            (feature): feature is SequenceFeature => feature.database === db
          )
          .map((feature) => (
            <span title={feature.interproGroup?.name} key={feature.databaseId}>
              <ExternalLink
                url={externalUrls[externalURLAccessor](feature.databaseId)}
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

// COLUMN RENDERERS BELOW
UniParcColumnConfiguration.set(UniParcColumn.upi, {
  label: 'Entry',
  render: ({ uniParcId }) => (
    <AccessionView id={uniParcId} namespace={Namespace.uniparc} />
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.gene, {
  label: 'Gene names',
  render: (data) => (
    <ExpandableList descriptionString="gene names" displayNumberOfHiddenItems>
      {xrefGetter(data, 'geneName')}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  label: 'Organism IDs',
  render: (data) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {xrefGetter(data, 'organism', 'taxonId')?.map((taxon) => (
        <TaxonomyView key={taxon.taxonId} data={taxon} displayOnlyID />
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organism, {
  label: 'Organisms',
  render: (data) => (
    <ExpandableList descriptionString="organisms" displayNumberOfHiddenItems>
      {xrefGetter(data, 'organism', 'taxonId')?.map((taxon) => (
        <TaxonomyView key={taxon.taxonId} data={taxon} />
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.protein, {
  label: 'Protein names',
  render: (data) => (
    <ExpandableList
      descriptionString="protein names"
      displayNumberOfHiddenItems
    >
      {xrefGetter(data, 'proteinName')}
    </ExpandableList>
  ),
});

type XRefWithProteomeId = UniParcXRef &
  Required<Pick<UniParcXRef, 'proteomeId'>>;
UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  label: 'Proteomes',
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
  label: 'Checksum',
  tooltip: <>Cyclic redundancy check value (CRC64)</>,
  render: ({ sequence: { crc64 } }) => crc64,
});

UniParcColumnConfiguration.set(UniParcColumn.length, {
  label: 'Length',
  tooltip: 'Sequence length',
  render: ({ sequence: { length } }) => <LongNumber>{length}</LongNumber>,
});

UniParcColumnConfiguration.set(UniParcColumn.sequence, {
  label: 'Sequence',
  render: ({ sequence }) => (
    <Sequence sequence={sequence.value} showActionBar={false} />
  ),
});

type XRefWithDatabase = UniParcXRef &
  Required<Pick<UniParcXRef, 'database' | 'id'>>;
UniParcColumnConfiguration.set(UniParcColumn.accession, {
  label: 'UniProtKB',
  render: ({ uniParcCrossReferences }) => (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {uniParcCrossReferences
        ?.filter((xref): xref is XRefWithDatabase =>
          Boolean(xref.database?.startsWith('UniProtKB') && xref.id)
        )
        .map((xref) => (
          <Link
            // id might be repeated because it's referring to different versions
            key={`${xref.id}-${xref.version}-${xref.database}-${xref.active}`}
            // TODO: handle link to obsolete entry by linking to version page
            to={getEntryPath(Namespace.uniprotkb, xref.id)}
          >
            <EntryTypeIcon entryType={xref.database} />
            {xref.id}
            {xref.active ? '' : `.${xref.version} (obsolete)`}
          </Link>
        ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.firstSeen, {
  label: 'First seen',
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
  label: 'Last seen',
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
  render: familyAndDomainRenderer('CDD', 'CDDEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.gene3D, {
  label: 'Gene3D',
  render: familyAndDomainRenderer('Gene3D', 'Gene3DEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.hamap, {
  label: 'HAMAP',
  render: familyAndDomainRenderer('HAMAP', 'HAMAPEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.panther, {
  label: 'PANTHER',
  render: familyAndDomainRenderer('PANTHER', 'PANTHEREntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.pfam, {
  label: 'Pfam',
  render: familyAndDomainRenderer('Pfam', 'PfamEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.pirsf, {
  label: 'PIRSF',
  render: familyAndDomainRenderer('PIRSF', 'PIRSFEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.prints, {
  label: 'PRINTS',
  render: familyAndDomainRenderer('PRINTS', 'PRINTSEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.prosite, {
  label: 'PROSITE',
  render: familyAndDomainRenderer('PROSITE', 'PROSITEEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.sfld, {
  label: 'SFLD',
  render: familyAndDomainRenderer('SFLD', 'SFLDEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.smart, {
  label: 'SMART',
  render: familyAndDomainRenderer('SMART', 'SMARTEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.supfam, {
  label: 'SUPFAM',
  render: familyAndDomainRenderer('SUPFAM', 'SUPFAMEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.tigrfams, {
  label: 'TIGRFAMs',
  render: familyAndDomainRenderer('TIGRFAMs', 'TIGRFAMsEntry'),
});

UniParcColumnConfiguration.set(UniParcColumn.from, fromColumnConfig);

export default UniParcColumnConfiguration;
