import { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, DataTableWithLoader, Loader, LongNumber } from 'franklin-sites';

import AddToBasket from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import BasketStatus from '../../../basket/BasketStatus';
import MemberLink from './MemberLink';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';
import useItemSelect from '../../../shared/hooks/useItemSelect';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { pluralise } from '../../../shared/utils/utils';
import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import {
  Location,
  LocationToPath,
  getEntryPathFor,
} from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { Namespace } from '../../../shared/types/namespaces';
import {
  Identity,
  UniRefMember,
  RepresentativeMember,
} from '../../adapters/uniRefConverter';
import { UniRefMembersResults } from '../../types/membersEndpoint';

import helper from '../../../shared/styles/helper.module.scss';

// OK so, if it's UniProt KB, use first accession as unique key and as first
// column, if it's UniParc use ID (see entryname renderer lower for counterpart)
const getKey = (member: UniRefMember) =>
  member.memberIdType === 'UniProtKB ID' && member.accessions
    ? member.accessions[0]
    : member.memberId;

type ColumDescriptor = {
  name: string;
  label: string;
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
    render: (member) => {
      const id = getKey(member);
      return (
        <div className={helper['no-wrap']}>
          <MemberLink accession={id} />
          <BasketStatus id={id} />
        </div>
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
        <MemberLink accession={getKey(member)}>{member.memberId}</MemberLink>
      ),
  },
  {
    name: 'reviewed',
    label: '',
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
    const pathname = LocationToPath[Location.UniRefResults];
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
};

export const MembersSection = ({
  id,
  identity,
  representativeMember,
}: Props) => {
  const { search } = useLocation();
  const [{ selectedFacets }] = getParamsFromURL(search);

  const initialUrl = apiUrls.members(id, {
    selectedFacets: selectedFacets.map(
      (facet) => `${facet.name}:${facet.value}`
    ),
  });

  const [url, setUrl] = useState<string | undefined>(initialUrl);
  const [metadata, setMetadata] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({
    total: 0,
    nextUrl: undefined,
  }));
  usePrefetch(metadata.nextUrl);
  const [allResults, setAllResults] = useState<UniRefMember[]>(() => [
    representativeMember,
  ]);

  const { data, headers, loading } = useDataApi<UniRefMembersResults>(url);

  // reset everything when it looks like we changed entry
  useEffect(() => {
    setAllResults([]);
    setMetadata({ total: 0, nextUrl: undefined });
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetadata(() => ({
      total: +(headers?.['x-total-results'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  const smallScreen = useSmallScreen();
  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();

  const { total, nextUrl } = metadata;

  if (allResults.length === 0 && loading) {
    return <Loader />;
  }

  return (
    <Card
      header={
        <h2>
          <LongNumber>{total}</LongNumber>{' '}
          {pluralise(
            getEntrySectionNameAndId(EntrySection.Members).name,
            total
          )}
        </h2>
      }
      id={EntrySection.Members}
    >
      <div>
        <RelatedClusters identity={identity} id={id} />
      </div>
      <div className="button-group">
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton selectedEntries={selectedEntries} />
        <AddToBasket selectedEntries={selectedEntries} />
      </div>
      <DataTableWithLoader
        hasMoreData={total > allResults.length + 1}
        onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
        columns={columns}
        data={allResults}
        getIdKey={getKey}
        density="compact"
        onSelectionChange={smallScreen ? undefined : setSelectedItemFromEvent}
      />
    </Card>
  );
};

export default MembersSection;
