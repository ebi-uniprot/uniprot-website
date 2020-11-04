import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  InPageNav,
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

import UniRefEntryConfig from '../../config/UniRefEntryConfig';

import { addMessage } from '../../../messages/state/messagesActions';

// check if we need it here too and move it to a shared folder if needed
import { hasContent } from '../../../shared/utils/utils';
import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniRefConverter, {
  UniRefAPIModel,
} from '../../adapters/uniRefConverter';
import { Facet } from '../../../uniprotkb/types/responseTypes';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const baseURL = apiUrls.uniref.entry(match?.params.accession);
  const { loading, data, status, error, redirectedTo } = useDataApi<
    UniRefAPIModel
  >(baseURL);
  const facetsDataObject = useDataApi<Facet>(`${baseURL}/facets`);

  console.log(facetsDataObject.data);

  if (error || !match?.params.accession) {
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

  const sections = UniRefEntryConfig.map((section) => ({
    label: section.name,
    id: section.id,
    disabled: !hasContent(transformedData[section.name]),
  }));

  return (
    <SideBarLayout
      sidebar={
        <InPageNav sections={sections} rootElement=".sidebar-layout__content" />
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
          <Overview transformedData={transformedData} />
        </ErrorBoundary>
      }
    >
      <EntryMain transformedData={transformedData} />
    </SideBarLayout>
  );
};

export default Entry;
