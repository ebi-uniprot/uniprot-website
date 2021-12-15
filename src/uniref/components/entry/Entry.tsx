import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import Overview from '../data-views/Overview';
import EntryMain from './EntryMain';
import MembersFacets from './MembersFacets';
import BasketStatus from '../../../basket/BasketStatus';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryDownload from '../../../shared/components/entry/EntryDownload';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { addMessage } from '../../../messages/state/messagesActions';

import { LocationToPath, Location } from '../../../app/config/urls';
import apiUrls from '../../../shared/config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniRefConverter, {
  UniRefAPIModel,
} from '../../adapters/uniRefConverter';
import {
  MessageLevel,
  MessageFormat,
  MessageType,
  MessageTag,
} from '../../../messages/types/messagesTypes';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.entry(accession, Namespace.uniref);
  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniRefAPIModel>(baseURL);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
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
      sidebar={<MembersFacets accession={accession} />}
      className="entry-page"
      title={
        <ErrorBoundary>
          <HTMLHead
            title={[
              `${transformedData.name} - ${transformedData.id} (${transformedData.identity}%)`,
              searchableNamespaceLabels[Namespace.uniref],
            ]}
          />
          <h1>
            <EntryTitle
              mainTitle="UniRef"
              optionalTitle={`${transformedData.id} (${transformedData.identity}%)`}
            />
            <BasketStatus id={accession} className="small" />
          </h1>
          <Overview transformedData={transformedData} />
          <div className="button-group">
            <BlastButton selectedEntries={[accession]} />
            <EntryDownload />
            <AddToBasketButton selectedEntries={accession} />
          </div>
        </ErrorBoundary>
      }
    >
      <EntryMain transformedData={transformedData} />
    </SideBarLayout>
  );
};

export default Entry;
