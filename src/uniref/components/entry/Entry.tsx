import { useState } from 'react';
import { useParams } from 'react-router';
import { Loader } from 'franklin-sites';
import { partition } from 'lodash-es';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import Overview from '../data-views/Overview';
import EntryMain from './EntryMain';
import MembersFacets from './MembersFacets';
import BasketStatus from '../../../basket/BasketStatus';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import ToolsDropdown from '../../../shared/components/action-buttons/ToolsDropdown';
import { MapToDropdownBasic } from '../../../shared/components/MapTo';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';

import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import useDataApi from '../../../shared/hooks/useDataApi';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';

import { addMessage } from '../../../messages/state/messagesActions';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import uniRefConverter, {
  UniRefLiteAPIModel,
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

const Entry = () => {
  const { accession } = useParams<{ accession: string }>();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const dispatch = useMessagesDispatch();

  const baseURL = `${apiUrls.entry.entry(accession, Namespace.uniref)}/light`;
  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniRefLiteAPIModel>(baseURL);

  if (error) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  if (redirectedTo) {
    const message: MessageType = {
      id: 'redirect',
      content: `You are seeing the results from: ${redirectedTo}.`,
      format: MessageFormat.IN_PAGE,
      level: MessageLevel.SUCCESS,
      tag: MessageTag.REDIRECT,
    };

    dispatch(addMessage(message));
  }

  const transformedData = uniRefConverter(data);

  const [uniParcMembers, uniProtKBMembers] = partition(
    transformedData.members,
    (member) => member.startsWith('UPI')
  );

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SidebarLayout
      sidebar={<MembersFacets accession={accession} />}
      noOverflow
      className="entry-page"
    >
      <HTMLHead
        title={[
          `${transformedData.name} - ${transformedData.id} (${transformedData.identity}%)`,
          searchableNamespaceLabels[Namespace.uniref],
        ]}
      />
      <ErrorBoundary>
        <h1>
          <EntryTitle
            mainTitle="UniRef"
            optionalTitle={`${transformedData.id} (${transformedData.identity}%)`}
          />
          <BasketStatus id={accession} className="small" />
        </h1>
        <Overview transformedData={transformedData} />
        {/* TODO: evenutally remove nResults prop (see note in EntryDownload) */}
        {displayDownloadPanel && (
          <EntryDownloadPanel
            handleToggle={handleToggleDownload}
            nResults={transformedData.memberCount}
          />
        )}
        <div className="button-group">
          <ToolsDropdown selectedEntries={[accession]} blast mapID />
          <EntryDownloadButton handleToggle={handleToggleDownload} />
          <AddToBasketButton selectedEntries={accession} />
          <MapToDropdownBasic
            config={[
              {
                key: 'proteinCount',
                count: uniProtKBMembers.length,
                label: 'UniProtKB',
                to: {
                  pathname: LocationToPath[Location.IDMapping],
                  state: {
                    parameters: {
                      ids: uniProtKBMembers,
                      name: `${accession} UniProtKB members`,
                    },
                  },
                },
              },
              {
                key: 'uniparcCount',
                count: uniParcMembers.length,
                label: 'UniParc',
                to: {
                  pathname: LocationToPath[Location.IDMapping],
                  state: {
                    parameters: {
                      ids: uniParcMembers,
                      from: 'UniParc',
                      to: 'UniParc',
                      name: `${accession} UniParc members`,
                    },
                  },
                },
              },
            ]}
          >
            Map to proteins
          </MapToDropdownBasic>
        </div>
      </ErrorBoundary>
      <EntryMain transformedData={transformedData} />
    </SidebarLayout>
  );
};

export default Entry;
