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

import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniRefConverter, {
  UniRefAPIModel,
  UniRefMember,
} from '../../adapters/uniRefConverter';
import { FacetObject } from '../../../uniprotkb/types/responseTypes';

import '../../../shared/components/entry/styles/entry-page.scss';

export type UnirefMembersResults = {
  facets: FacetObject[];
  results: UniRefMember[];
};

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.uniref.entry(accession);
  const {
    loading,
    data,
    status,
    error,
    redirectedTo,
    headers,
  } = useDataApi<UniRefAPIModel>(baseURL);
  const membersData = useDataApi<UnirefMembersResults>(
    `${baseURL}/members?facets=member_id_type,uniprot_member_id_type`
  );

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
