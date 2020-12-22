/* eslint-disable camelcase */
import { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import { UniParcAPIModel } from '../adapters/uniParcConverter';

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
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  label: 'Organism IDs',
  render: (data) => (
    <ExpandableList descriptionString="organims" displayNumberOfHiddenItems>
      {data.taxonomies.map(({ taxonId }) => (
        <Link key={taxonId} to={`/taxonomy/${taxonId}`}>
          {taxonId}
        </Link>
      ))}
    </ExpandableList>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.organism, {
  label: 'Organisms',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.protein, {
  label: 'Protein names',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  label: 'Proteomes',
  // TODO:
  render: () => null,
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
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.firstSeen, {
  label: 'First seen',
  render({ uniParcCrossReferences }) {
    const created = uniParcCrossReferences.map(({ created }) => created).sort();
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
      .map(({ lastUpdated }) => lastUpdated)
      .sort();
    const lastSeen = lastUpdated[lastUpdated.length - 1];
    return <time dateTime={new Date(lastSeen).toISOString()}>{lastSeen}</time>;
  },
});

UniParcColumnConfiguration.set(UniParcColumn.cdd, {
  label: 'CDD',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.gene3D, {
  label: 'Gene3D',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.hamap, {
  label: 'HAMAP',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.panther, {
  label: 'PANTHER',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.pfam, {
  label: 'Pfam',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.pirsf, {
  label: 'PIRSF',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.prints, {
  label: 'PRINTS',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.prosite, {
  label: 'PROSITE',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.sfld, {
  label: 'SFLD',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.smart, {
  label: 'SMART',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.supfam, {
  label: 'SUPFAM',
  // TODO:
  render: () => null,
});

UniParcColumnConfiguration.set(UniParcColumn.tigrfams, {
  label: 'TIGRFAMs',
  // TODO:
  render: () => null,
});

export default UniParcColumnConfiguration;
