import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { partition } from 'lodash-es';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import Overview from '../data-views/Overview';
import EntryMain from './EntryMain';
import MembersFacets from './MembersFacets';
import BasketStatus from '../../../basket/BasketStatus';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryDownload from '../../../shared/components/entry/EntryDownload';
import { MapToDropdownBasic } from '../../../shared/components/MapTo';

import { SidebarLayout } from '../../../shared/components/layouts/SidebarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import useDataApi from '../../../shared/hooks/useDataApi';
import { useMessagesDispatch } from '../../../shared/contexts/Messages';

import { addMessage } from '../../../messages/state/messagesActions';

import apiUrls from '../../../shared/config/apiUrls';

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
  const dispatch = useMessagesDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const accession = match?.params.accession;

  const baseURL = `${apiUrls.entry(accession, Namespace.uniref)}/light`;
  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniRefLiteAPIModel>(baseURL);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
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
        <div className="button-group">
          <BlastButton selectedEntries={[accession]} />
          {
            // TODO: evenutally remove nResults prop (see note in EntryDownload)
          }
          <EntryDownload nResults={transformedData.memberCount} />
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
