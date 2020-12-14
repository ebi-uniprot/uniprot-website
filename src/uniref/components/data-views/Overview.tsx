import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SpinnerIcon,
  TremblIcon,
  SwissProtIcon,
  UniParcIcon,
} from 'franklin-sites';

import MemberLink from '../entry/MemberLink';

import { UseDataAPIState } from '../../../shared/hooks/useDataApi';

import { getBEMClassName } from '../../../shared/utils/utils';

import { UniRefUIModel } from '../../adapters/uniRefConverter';
import { Facet } from '../../../uniprotkb/types/responseTypes';

import './styles/overview.scss';

enum MemberTypes {
  Reviewed = 'uniprotkb_reviewed_swissprot',
  Unreviewed = 'uniprotkb_unreviewed_trembl',
  UniParc = 'uniparc',
}

type MemberIconsProps = { facetData: UseDataAPIState<Facet[]> };

export const MemberIcons: FC<MemberIconsProps> = ({ facetData }) => {
  const location = useLocation();

  if (facetData.loading) {
    return (
      <span className="member-icons">
        <SpinnerIcon className="member-icons" />
      </span>
    );
  }

  const uniProtKBFacetValues = facetData.data?.find(
    (f) => f?.name === 'uniprot_member_id_type'
  )?.values;
  const uniProtReviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Reviewed
  )?.count;
  const uniProtUnreviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === MemberTypes.Unreviewed
  )?.count;
  const uniParcCount = facetData.data
    ?.find((f) => f?.name === 'member_id_type')
    ?.values.find((fv) => fv.value === MemberTypes.UniParc)?.count;

  return (
    <>
      {uniProtReviewedCount && (
        <Link
          to={`${location.pathname}?filter=uniprot_member_id_type:${MemberTypes.Reviewed}`}
          className={getBEMClassName({
            b: 'member-icons',
            m: 'uniprotkb-reviewed',
          })}
          title={`${uniProtReviewedCount} UniProtKB reviewed member${
            uniProtReviewedCount === 1 ? '' : 's'
          }`}
        >
          <SwissProtIcon />
        </Link>
      )}
      {uniProtUnreviewedCount && (
        <Link
          to={`${location.pathname}?filter=uniprot_member_id_type:${MemberTypes.Unreviewed}`}
          className={getBEMClassName({
            b: 'member-icons',
            m: 'uniprotkb-unreviewed',
          })}
          title={`${uniProtUnreviewedCount} UniProtKB unreviewed member${
            uniProtUnreviewedCount === 1 ? '' : 's'
          }`}
        >
          <TremblIcon />
        </Link>
      )}
      {uniParcCount && (
        <Link
          to={`${location.pathname}?filter=member_id_type:${MemberTypes.UniParc}`}
          className={getBEMClassName({ b: 'member-icons', m: 'uniparc' })}
          title={`${uniParcCount} UniParc member${
            uniParcCount === 1 ? '' : 's'
          }`}
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

export const Updated: FC<{ updated: string }> = ({ updated }) => {
  const date = new Date(updated);
  return (
    <>
      Updated:&nbsp;<time dateTime={date.toISOString()}>{updated}</time>
    </>
  );
};

export const Overview: FC<
  MemberIconsProps & {
    transformedData: UniRefUIModel;
  }
> = ({ transformedData, facetData }) => (
  <section>
    {transformedData.name} · <MemberIcons facetData={facetData} /> ·{' '}
    <Updated updated={transformedData.updated} /> ·{' '}
    <Seed seedId={transformedData.seedId} />
  </section>
);

export default Overview;
