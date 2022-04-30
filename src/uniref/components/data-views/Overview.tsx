import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  SpinnerIcon,
  TremblIcon,
  SwissProtIcon,
  UniParcIcon,
} from 'franklin-sites';

import MemberLink from '../entry/MemberLink';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getBEMClassName, pluralise } from '../../../shared/utils/utils';
import parseDate from '../../../shared/utils/parseDate';
import { getEntryPath } from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import { Namespace } from '../../../shared/types/namespaces';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

import {
  UniRefMembersResults,
  uniRefMembersFacets,
} from '../../types/membersEndpoint';

import './styles/overview.scss';

enum MemberTypes {
  Reviewed = 'uniprotkb_reviewed_swissprot',
  Unreviewed = 'uniprotkb_unreviewed_trembl',
  UniParc = 'uniparc',
}

export const MemberIcons: FC<{ id: string }> = ({ id }) => {
  const { loading, data } = useDataApi<UniRefMembersResults>(
    apiUrls.members(id, {
      facets: uniRefMembersFacets,
      size: 0,
    })
  );

  if (loading) {
    return (
      <span className="member-icons">
        <SpinnerIcon className="member-icons" />
      </span>
    );
  }

  if (!data) {
    return null;
  }

  const uniProtKBFacetValues = data?.facets?.find(
    (f) => f?.name === 'uniprot_member_id_type'
  )?.values;
  const uniProtReviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Reviewed
  )?.count;
  const uniProtUnreviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Unreviewed
  )?.count;
  const uniParcCount = data?.facets
    ?.find((f) => f?.name === 'member_id_type')
    ?.values?.find((fv) => fv.value === MemberTypes.UniParc)?.count;

  const pathname = getEntryPath(Namespace.uniref, id);

  return (
    <>
      {uniProtReviewedCount && (
        <Link
          to={{
            pathname,
            search: `facets=uniprot_member_id_type:${MemberTypes.Reviewed}`,
          }}
          className={getBEMClassName({
            b: 'member-icons',
            m: 'uniprotkb-reviewed',
          })}
          title={`${uniProtReviewedCount} UniProtKB reviewed ${pluralise(
            'member',
            uniProtReviewedCount
          )}`}
        >
          <SwissProtIcon />
        </Link>
      )}
      {uniProtUnreviewedCount && (
        <Link
          to={{
            pathname,
            search: `facets=uniprot_member_id_type:${MemberTypes.Unreviewed}`,
          }}
          className={getBEMClassName({
            b: 'member-icons',
            m: 'uniprotkb-unreviewed',
          })}
          title={`${uniProtUnreviewedCount} UniProtKB unreviewed ${pluralise(
            'member',
            uniProtUnreviewedCount
          )}`}
        >
          <TremblIcon />
        </Link>
      )}
      {uniParcCount && (
        <Link
          to={{
            pathname,
            search: `facets=member_id_type:${MemberTypes.UniParc}`,
          }}
          className={getBEMClassName({ b: 'member-icons', m: 'uniparc' })}
          title={`${uniParcCount} UniParc ${pluralise('member', uniParcCount)}`}
        >
          <UniParcIcon />
        </Link>
      )}
    </>
  );
};

export const Seed: FC<{ seedId: string }> = ({ seedId }) => (
  <strong>
    Built on seed sequence <MemberLink accession={seedId} />
  </strong>
);

export const Updated: FC<{ updated: string }> = ({ updated }) => (
  <>
    Updated:&nbsp;
    <time dateTime={parseDate(updated)?.toISOString()}>{updated}</time>
  </>
);

export const Overview: FC<{
  transformedData: UniRefUIModel;
}> = ({ transformedData }) => (
  <section>
    {transformedData.name} · <MemberIcons id={transformedData.id} /> ·{' '}
    <Updated updated={transformedData.updated} /> ·{' '}
    <Seed seedId={transformedData.seedId} />
  </section>
);

export default Overview;
