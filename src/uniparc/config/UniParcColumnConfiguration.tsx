import { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { EntryTypeIcon } from '../../shared/components/entry/EntryTypeIcon';

import {
  SequenceFeature,
  UniParcAPIModel,
  UniParcXRef,
  XRefProperty,
} from '../adapters/uniParcConverter';

import externalUrls from '../../shared/config/externalUrls';
import { Location, LocationToPath } from '../../app/config/urls';

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
  accession = 'accession',
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
}

export const defaultColumns = [
  UniParcColumn.upi,
  UniParcColumn.organism,
  UniParcColumn.length,
  UniParcColumn.accession,
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
];

export const primaryKeyColumn = UniParcColumn.upi;

export const UniParcColumnConfiguration = new Map<
  UniParcColumn,
  {
    label: ReactNode;
    render: (data: UniParcAPIModel) => ReactNode;
  }
>();

/* NOTE:
  is this a good thing to do? I'd assume order is not important and might make
  things easier in the case of user looking for a specific value within a list
 */
// alphabetical sort helper
const intlCollator = new Intl.Collator('en-UK', {
  // a ≠ b, a ≠ á, a = A
  sensitivity: 'accent',
  // "1" < "2" < "10"
  numeric: true,
});

const genericPropertyGetter = (
  data: UniParcAPIModel,
  propertyName: XRefProperty['key'],
  sortBy?: typeof intlCollator.compare
): Set<string> => {
  const rawList = data.uniParcCrossReferences
    ?.flatMap((xref) =>
      xref.properties?.map((p) => p.key === propertyName && p.value)
    )
    // remove properties that were not the ones we were interested in
    .filter((name): name is string => Boolean(name));
  if (sortBy) {
    rawList?.sort(sortBy);
  }
  // remove duplicates
  return new Set(rawList);
};

const familyAndDomainRenderer = (
  db: SequenceFeature['database'],
  externalURLAccessor: keyof typeof externalUrls
) => (data: UniParcAPIModel) => (
  <ExpandableList>
    {data.sequenceFeatures
      ?.filter((feature): feature is SequenceFeature => feature.database === db)
      .map((feature) => (
        <span title={feature.interproGroup?.name} key={feature.databaseId}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={externalUrls[externalURLAccessor](feature.databaseId)}
          >
            {feature.databaseId}
          </a>
          {feature.interproGroup && (
            <>
              &nbsp;(
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={externalUrls.InterProEntry(feature.interproGroup.id)}
              >
                {feature.interproGroup.id}
              </a>
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
    <Link
      to={generatePath(LocationToPath[Location.UniParcEntry], {
        accession: uniParcId,
      })}
    >
      {uniParcId}
    </Link>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.gene, {
  label: 'Gene names',
  render: (data) => (
    <ExpandableList descriptionString="gene names" displayNumberOfHiddenItems>
      {genericPropertyGetter(data, 'gene_name', intlCollator.compare)}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  label: 'Organism IDs',
  render: (data) => (
    <ExpandableList descriptionString="organims" displayNumberOfHiddenItems>
      {data.taxonomies.map(({ taxonId }) => (
        <Link
          key={taxonId}
          to={generatePath(LocationToPath[Location.TaxonomyEntry], {
            accession: taxonId,
          })}
        >
          {taxonId}
        </Link>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organism, {
  label: 'Organisms',
  /* TODO:
    Not in the payload! Defaulting to taxon IDs as it's important because this
    column is one of the default columns
   */
  render: (data) => (
    <ExpandableList descriptionString="organims" displayNumberOfHiddenItems>
      {data.taxonomies.map(({ taxonId }) => (
        <Link
          key={taxonId}
          to={generatePath(LocationToPath[Location.TaxonomyEntry], {
            accession: taxonId,
          })}
        >
          {taxonId}
        </Link>
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
      {genericPropertyGetter(data, 'protein_name', intlCollator.compare)}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  label: 'Proteomes',
  render: (data) => (
    <ExpandableList descriptionString="proteomes" displayNumberOfHiddenItems>
      {Array.from(genericPropertyGetter(data, 'proteome_id'), (accession) => (
        <Link
          key={accession}
          to={generatePath(LocationToPath[Location.ProteomesEntry], {
            accession,
          })}
        >
          {accession}
        </Link>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.checksum, {
  label: 'Checksum',
  render: ({ sequence: { crc64 } }) => crc64,
});

UniParcColumnConfiguration.set(UniParcColumn.length, {
  label: 'Length',
  render: ({ sequence: { length } }) => length,
});

UniParcColumnConfiguration.set(UniParcColumn.sequence, {
  label: 'Sequence',
  // NOTE: not consistent with the way it's represented in UniProtKB column
  render: ({ sequence }) => (
    <span className="break-anywhere">{sequence.value}</span>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.accession, {
  label: 'UniProtKB',
  render: ({ uniParcCrossReferences }) => (
    <ExpandableList descriptionString="entries" displayNumberOfHiddenItems>
      {uniParcCrossReferences
        ?.filter((xref): xref is UniParcXRef =>
          xref.database.startsWith('UniProtKB')
        )
        .map((xref) => (
          <Link
            // id might be repeated because it's referring to different versions
            key={`${xref.id}-${xref.version}`}
            // TODO: handle link to obsolete entry by linking to version page
            to={generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession: xref.id,
            })}
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
  render({ uniParcCrossReferences }) {
    const created = uniParcCrossReferences
      ?.map(({ created }) => created)
      .sort();
    if (!created?.length) {
      return null;
    }
    const firstSeen = created[0];
    return (
      <time dateTime={new Date(firstSeen).toISOString()}>{firstSeen}</time>
    );
  },
});

UniParcColumnConfiguration.set(UniParcColumn.lastSeen, {
  label: 'Last seen',
  render({ uniParcCrossReferences }) {
    const lastUpdated = uniParcCrossReferences
      ?.map(({ lastUpdated }) => lastUpdated)
      .sort();
    if (!lastUpdated?.length) {
      return null;
    }
    const lastSeen = lastUpdated[lastUpdated.length - 1];
    return <time dateTime={new Date(lastSeen).toISOString()}>{lastSeen}</time>;
  },
});

UniParcColumnConfiguration.set(UniParcColumn.cdd, {
  label: 'CDD',
  // TODO:
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

export default UniParcColumnConfiguration;
