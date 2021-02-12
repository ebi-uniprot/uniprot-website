import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  Facets,
  Loader,
  // DropdownButton,
} from 'franklin-sites';

import {
  MessageLevel,
  MessageFormat,
  MessageType,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import Overview from '../data-views/Overview';
import EntryMain from './EntryMain';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { addMessage } from '../../../messages/state/messagesActions';

import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniRefConverter, {
  UniRefAPIModel,
  UniRefMember,
} from '../../adapters/uniRefConverter';
import { FacetObject } from '../../../uniprotkb/types/responseTypes';

import '../../../shared/components/entry/styles/entry-page.scss';
import apiUrls from '../../config/apiUrls';

export type UnirefMembersResults = {
  facets: FacetObject[];
  results: UniRefMember[];
};

enum UniRefFacets {
  MEMBER_ID_TYPE = 'member_id_type',
  UNIPROT_MEMBER_ID_TYPE = 'uniprot_member_id_type',
}

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.entry(accession);
  const {
    loading,
    data,
    status,
    error,
    redirectedTo,
  } = useDataApi<UniRefAPIModel>(baseURL);

  const membersUrl = apiUrls.members(accession, Object.values(UniRefFacets));
  const membersData = useDataApi<UnirefMembersResults>(membersUrl);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  if (redirectedTo) {
    const message: MessageType = {
      id: 'job-id',
      content: `You are seeing the results from: ${redirectedTo}.`,
      format: MessageFormat.IN_PAGE,
      level: MessageLevel.SUCCESS,
      dateActive: Date.now(),
      dateExpired: Date.now(),
      tag: MessageTag.REDIRECT,
    };

    dispatch(addMessage(message));
  }

  const transformedData = uniRefConverter(data);

  return (
    <SideBarLayout
      sidebar={
        membersData.loading ? (
          <Loader />
        ) : (
          membersData.data && (
            <Facets data={membersData.data.facets} queryStringKey="filter" />
          )
        )
      }
      className="entry-page"
      title={
        <ErrorBoundary>
          <h2>
            <EntryTitle
              mainTitle="UniRef"
              optionalTitle={`${transformedData.id} (${transformedData.identity}%)`}
            />
          </h2>
          <Overview
            transformedData={transformedData}
            membersData={membersData}
          />
        </ErrorBoundary>
      }
    >
      <EntryMain transformedData={transformedData} />
    </SideBarLayout>
  );
};

export default Entry;
