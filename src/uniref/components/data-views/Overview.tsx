import React, { FC } from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import {
  SpinnerIcon,
  TremblIcon,
  SwissProtIcon,
  UniParcIcon,
} from 'franklin-sites';

import { UseDataAPIState } from '../../../shared/hooks/useDataApi';

import { Location, LocationToPath } from '../../../app/config/urls';

import { UniRefUIModel } from '../../adapters/uniRefConverter';
import { Facet } from '../../../uniprotkb/types/responseTypes';

import './styles/overview.scss';

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
    (fv) => fv.value === 'uniprotkb_reviewed_swissprot'
  )?.count;
  const uniProtUnreviewedCount = uniProtKBFacetValues?.find(
    (fv) => fv.value === 'uniprotkb_unreviewed_trembl'
  )?.count;
  const uniParcCount = facetData.data
    ?.find((f) => f?.name === 'member_id_type')
    ?.values.find((fv) => fv.value === 'uniparc')?.count;

  return (
    <>
      {uniProtReviewedCount && (
        <Link
          to={`${location.pathname}?filter=uniprot_member_id_type:uniprotkb_reviewed_swissprot`}
          className="member-icons uniprotkb reviewed"
          title={`${uniProtReviewedCount} UniProtKB reviewed member${
            uniProtReviewedCount === 1 ? '' : 's'
          }`}
        >
          <SwissProtIcon />
        </Link>
      )}
      {uniProtUnreviewedCount && (
        <Link
          to={`${location.pathname}?filter=uniprot_member_id_type:uniprotkb_unreviewed_trembl`}
          className="member-icons uniprotkb unreviewed"
          title={`${uniProtUnreviewedCount} UniProtKB unreviewed member${
            uniProtUnreviewedCount === 1 ? '' : 's'
          }`}
        >
          <TremblIcon />
        </Link>
      )}
      {uniParcCount && (
        <Link
          to={`${location.pathname}?filter=member_id_type:uniparc`}
          className="member-icons uniparc"
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

export const Seed: FC<{ seed: string }> = ({ seed }) => {
  const path = generatePath(
    LocationToPath[
      seed.startsWith('UPI') ? Location.UniParcEntry : Location.UniProtKBEntry
    ],
    { accession: seed }
  );

  return (
    <strong>
      Built on seed sequence <Link to={path}>{seed}</Link>
    </strong>
  );
};

export const Overview: FC<
  MemberIconsProps & {
    transformedData: UniRefUIModel;
  }
> = ({ transformedData, facetData }) => {
  const { name } = transformedData;
  const updated = (
    <>
      Updated:&nbsp;
      <time dateTime={new Date(transformedData.updated).toISOString()}>
        {transformedData.updated}
      </time>
    </>
  );

  return (
    <section>
      {name} · <MemberIcons facetData={facetData} /> · {updated} ·{' '}
      <Seed seed={transformedData.seed || 'temporary placeholder'} />
    </section>
  );
};

export default Overview;
