import { FC } from 'react';
import { Link, generatePath } from 'react-router-dom';
import {
  SpinnerIcon,
  TremblIcon,
  SwissProtIcon,
  UniParcIcon,
} from 'franklin-sites';

import MemberLink from '../entry/MemberLink';

import { UseDataAPIState } from '../../../shared/hooks/useDataApi';

import { getBEMClassName } from '../../../shared/utils/utils';
import { Location, LocationToPath } from '../../../app/config/urls';

import { UniRefUIModel } from '../../adapters/uniRefConverter';
import { Facet } from '../../../uniprotkb/types/responseTypes';

import './styles/overview.scss';

enum MemberTypes {
  Reviewed = 'uniprotkb_reviewed_swissprot',
  Unreviewed = 'uniprotkb_unreviewed_trembl',
  UniParc = 'uniparc',
}

type FacetData = UseDataAPIState<Facet[]>;
type MemberIconsProps = { facetData: FacetData; id: string };

export const MemberIcons: FC<MemberIconsProps> = ({ facetData, id }) => {
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

  const pathname = generatePath(LocationToPath[Location.UniRefEntry], {
    accession: id,
  });

  return (
    <>
      {uniProtReviewedCount && (
        <Link
          to={{
            pathname,
            search: `filter=uniprot_member_id_type:${MemberTypes.Reviewed}`,
          }}
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
          to={{
            pathname,
            search: `filter=uniprot_member_id_type:${MemberTypes.Unreviewed}`,
          }}
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
          to={{
            pathname,
            search: `filter=member_id_type:${MemberTypes.UniParc}`,
          }}
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

export const Overview: FC<{
  facetData: FacetData;
  transformedData: UniRefUIModel;
}> = ({ transformedData, facetData }) => (
  <section>
    {transformedData.name} ·{' '}
    <MemberIcons facetData={facetData} id={transformedData.id} /> ·{' '}
    <Updated updated={transformedData.updated} /> ·{' '}
    <Seed seedId={transformedData.seedId} />
  </section>
);

export default Overview;
