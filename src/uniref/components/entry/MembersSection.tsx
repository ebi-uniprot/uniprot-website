import React, { FC, useMemo, useCallback, useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Card, DataTable, DENSITY_COMPACT } from 'franklin-sites';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

import { Location, LocationToPath } from '../../../app/config/urls';
import { UniRefMember } from '../../adapters/uniRefConverter';

type ColumDescriptor = {
  name: string;
  label?: string;
  render: (
    datum: UniRefMember
  ) => undefined | string | number | boolean | JSX.Element;
};

// OK so, if it's UniProt KB, use first accession as unique key and as first
// column, if it's UniParc use ID (see entryname renderer lower for counterpart)
const getKey = (member: UniRefMember) =>
  member.memberIdType === 'UniProtKB ID'
    ? member.accessions?.[0]
    : member.memberId;

const columns: ColumDescriptor[] = [
  {
    name: 'members',
    label: 'Cluster Members',
    render: (member) => {
      const accession = getKey(member);
      return (
        <Link
          to={generatePath(
            LocationToPath[
              member.memberIdType === 'UniParc'
                ? Location.UniParcEntry
                : Location.UniProtKBEntry
            ],
            { accession }
          )}
        >
          {accession}
        </Link>
      );
    },
  },
  {
    name: 'entryNames',
    label: 'Entry names',
    // And here if it's UniProtKB, use the ID as name, and don't display
    // anything for UniParc...
    render: (member) =>
      member.memberIdType === 'UniProtKB ID' && (
        <Link
          to={generatePath(LocationToPath[Location.UniProtKBEntry], {
            accession: getKey(member),
          })}
        >
          {member.memberId}
        </Link>
      ),
  },
  {
    name: 'reviewed',
    render: (member) => (
      <EntryTypeIcon
        entryType={member.memberIdType}
        entryAccession={member.accessions?.[0]}
        entryId={member.memberId}
      />
    ),
  },
  {
    name: 'proteinNames',
    label: 'Protein names',
    render: ({ proteinName }) => proteinName,
  },
  {
    name: 'organisms',
    label: 'Organisms',
    render: ({ organismName, organismTaxId }) => (
      <Link
        to={generatePath(LocationToPath[Location.TaxonomyEntry], {
          taxid: organismTaxId,
        })}
      >
        {organismName}
      </Link>
    ),
  },
  {
    name: 'organismIDs',
    label: 'Organism IDs',
    render: ({ organismTaxId }) => (
      <Link
        to={generatePath(LocationToPath[Location.TaxonomyEntry], {
          taxid: organismTaxId,
        })}
      >
        {organismTaxId}
      </Link>
    ),
  },
  {
    name: 'relatedClusters',
    label: 'Related clusters',
    render: (member) => (
      <>
        {member.uniref50Id && (
          <>
            <Link
              to={generatePath(LocationToPath[Location.UniRefEntry], {
                accession: member.uniref50Id,
              })}
            >
              {member.uniref50Id}
            </Link>{' '}
          </>
        )}
        {member.uniref90Id && (
          <>
            <Link
              to={generatePath(LocationToPath[Location.UniRefEntry], {
                accession: member.uniref90Id,
              })}
            >
              {member.uniref90Id}
            </Link>{' '}
          </>
        )}
        {member.uniref100Id && (
          <Link
            to={generatePath(LocationToPath[Location.UniRefEntry], {
              accession: member.uniref100Id,
            })}
          >
            {member.uniref100Id}
          </Link>
        )}
      </>
    ),
  },
  {
    name: 'lengths',
    label: 'Lengths',
    render: ({ sequenceLength }) => sequenceLength,
  },
  {
    name: 'roles',
    label: 'Roles',
    // eslint-disable-next-line consistent-return
    render: (member) => {
      if (member.seed && 'sequence' in member) {
        return 'seed & representative';
      }
      if (member.seed) {
        return 'seed';
      }
      if ('sequence' in member) {
        return 'representative';
      }
    },
  },
];

const MembersSection: FC<{ data: { members: UniRefMember[] } }> = ({
  data,
}) => {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = useCallback((rowId: string) => {
    setSelectedEntries((selectedEntries) => {
      const filtered = selectedEntries.filter((id) => id !== rowId);
      return filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered;
    });
  }, []);

  if (!hasContent(data)) {
    return null;
  }

  return (
    <div id={EntrySectionIDs[EntrySection.Members]} data-entry-section>
      <Card title={EntrySection.Members}>
        <div className="button-group">
          <BlastButton selectedEntries={selectedEntries} />
          <AlignButton selectedEntries={selectedEntries} />
          <AddToBasket selectedEntries={selectedEntries} />
        </div>
        <div data-loader-scroll="uniref-members">
          <DataTable
            columns={columns}
            data={data.members}
            getIdKey={getKey}
            density={DENSITY_COMPACT}
            scrollDataAttribute="uniref-members"
            selectable
            selected={selectedEntries}
            onSelect={handleSelectedEntries}
          />
        </div>
      </Card>
    </div>
  );
};

export default MembersSection;
