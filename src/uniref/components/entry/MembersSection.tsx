import { memo, useCallback, useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, DataTableWithLoader, Loader } from 'franklin-sites';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import MemberLink from './MemberLink';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';

import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import {
  Location,
  LocationToPath,
  getEntryPathFor,
} from '../../../app/config/urls';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { Namespace } from '../../../shared/types/namespaces';

import {
  Identity,
  UniRefMember,
  UniRefAPIModel,
  RepresentativeMember,
} from '../../adapters/uniRefConverter';

// OK so, if it's UniProt KB, use first accession as unique key and as first
// column, if it's UniParc use ID (see entryname renderer lower for counterpart)
const getKey = (member: UniRefMember) =>
  member.memberIdType === 'UniProtKB ID' && member.accessions
    ? member.accessions[0]
    : member.memberId;

type ColumDescriptor = {
  name: string;
  label?: string;
  render: (
    datum: UniRefMember
  ) => undefined | string | number | boolean | JSX.Element;
};

const getEntryPathForTaxonomy = getEntryPathFor(Namespace.taxonomy);
const getEntryPathForUniRef = getEntryPathFor(Namespace.uniref);

const columns: ColumDescriptor[] = [
  {
    name: 'members',
    label: 'Cluster Members',
    render: (member) => <MemberLink accession={getKey(member)} />,
  },
  {
    name: 'entryNames',
    label: 'Entry names',
    // And here if it's UniProtKB, use the ID as name, and don't display
    // anything for UniParc...
    render: (member) =>
      member.memberIdType === 'UniProtKB ID' && (
        <MemberLink accession={getKey(member)}>{member.memberId}</MemberLink>
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
      <Link to={getEntryPathForTaxonomy(organismTaxId)}>{organismName}</Link>
    ),
  },
  {
    name: 'organismIDs',
    label: 'Organism IDs',
    render: ({ organismTaxId }) => (
      <Link to={getEntryPathForTaxonomy(organismTaxId)}>{organismTaxId}</Link>
    ),
  },
  {
    name: 'relatedClusters',
    label: 'Related clusters',
    render: (member) => (
      <>
        {member.uniref50Id && (
          <>
            <Link to={getEntryPathForUniRef(member.uniref50Id)}>
              {member.uniref50Id}
            </Link>{' '}
          </>
        )}
        {member.uniref90Id && (
          <>
            <Link to={getEntryPathForUniRef(member.uniref90Id)}>
              {member.uniref90Id}
            </Link>{' '}
          </>
        )}
        {member.uniref100Id && (
          <Link to={getEntryPathForUniRef(member.uniref100Id)}>
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

export const RelatedClusters = memo(
  ({
    identity,
    id,
  }: {
    identity: Identity;
    id: string;
    // eslint-disable-next-line consistent-return
  }) => {
    // TODO: remove this when backend has found out a way to present this
    return null;
    const pathname = LocationToPath[Location.UniRefResults];
    // TODO: check when backend has implemented it if "cluster" is the correct
    // TODO: field name for that query
    const baseSearchString = `query=(cluster:${id})`;
    // "Expand" to related *lower* identity clusters, redirect to entry page
    // "List" related *higher* identity clusters

    // eslint-disable-next-line default-case
    switch (identity) {
      case 50:
        return (
          <>
            List component clusters with{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:0.9)`,
              }}
            >
              90%
            </Link>{' '}
            or{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:1.0)`,
              }}
            >
              100%
            </Link>{' '}
            identity
          </>
        );
      case 90:
        return (
          <>
            Expand cluster to{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:0.5)&direct`,
              }}
            >
              50%
            </Link>{' '}
            identity · List component clusters with{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:1.0)`,
              }}
            >
              100%
            </Link>{' '}
            identity
          </>
        );
      case 100:
        return (
          <>
            Expand cluster to{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:0.5)&direct`,
              }}
            >
              50%
            </Link>{' '}
            or{' '}
            <Link
              to={{
                pathname,
                search: `${baseSearchString} AND (identity:0.9)&direct`,
              }}
            >
              90%
            </Link>{' '}
            identity
          </>
        );
    }
  }
);

type Props = {
  id: string;
  identity: Identity;
  representativeMember: RepresentativeMember;
  members?: UniRefMember[];
  metadata?: Record<string, string>;
};

const emptyMembers: UniRefMember[] = [];

export const MembersSection: FC<Props> = ({
  id,
  identity,
  representativeMember,
  members = emptyMembers,
  metadata: propMetadata,
}) => {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const [url, setUrl] = useState<string>();
  const [metadata, setMetadata] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({
    total: +(propMetadata?.['x-totalrecords'] || 1),
    nextUrl: getNextURLFromHeaders(propMetadata),
  }));
  usePrefetch(metadata.nextUrl);
  const [allResults, setAllResults] = useState(() => [
    representativeMember,
    ...members,
  ]);

  const { data, headers, loading } = useDataApi<UniRefAPIModel>(url);

  // reset everything when it looks like we changed entry
  useEffect(() => {
    setUrl(undefined);
    setMetadata({
      total: +(propMetadata?.['x-totalrecords'] || 1),
      nextUrl: getNextURLFromHeaders(propMetadata),
    });
    setAllResults([representativeMember, ...members]);
  }, [members, propMetadata, representativeMember]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { members = [] } = data;
    setAllResults((allMembers) => [...allMembers, ...members]);
    setMetadata(() => ({
      total: +(headers?.['x-totalrecords'] || 1),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = useCallback((rowId: string) => {
    setSelectedEntries((selectedEntries) => {
      const filtered = selectedEntries.filter((id) => id !== rowId);
      return filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered;
    });
  }, []);

  const { total, nextUrl } = metadata;

  if (allResults.length === 0 && loading) {
    return <Loader />;
  }

  return (
    <div id={EntrySection.Members}>
      <Card title={getEntrySectionNameAndId(EntrySection.Members).name}>
        <div>
          <RelatedClusters identity={identity} id={id} />
        </div>
        <div className="button-group">
          <BlastButton selectedEntries={selectedEntries} />
          <AlignButton selectedEntries={selectedEntries} />
          <AddToBasket selectedEntries={selectedEntries} />
        </div>
        <DataTableWithLoader
          hasMoreData={total > allResults.length}
          onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
          columns={columns}
          data={allResults}
          getIdKey={getKey}
          density="compact"
          selected={selectedEntries}
          onSelectRow={handleSelectedEntries}
        />
      </Card>
    </div>
  );
};

export default MembersSection;
