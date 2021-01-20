import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  // Facets,
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
import EntryMain from './EntryMain';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { addMessage } from '../../../messages/state/messagesActions';

import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
// import { FacetObject } from '../../../uniprotkb/types/responseTypes';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniParcEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.uniparc.entry(accession);
  const {
    loading,
    data,
    status,
    error,
    redirectedTo,
    headers,
  } = useDataApi<UniParcAPIModel>(baseURL);
  // const facetData = useDataApi<FacetObject[]>(`${baseURL}/facets`);

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

  const transformedData = uniParcConverter(data);

  return (
    <SideBarLayout
      sidebar={<></>}
      // sidebar={
      //   facetData.loading ? (
      //     <Loader />
      //   ) : (
      //     <Facets data={facetData.data} queryStringKey="filter" />
      //   )
      // }
      className="entry-page"
      title={
        <ErrorBoundary>
          <h2>
            <EntryTitle
              mainTitle="UniParc"
              optionalTitle={transformedData.uniParcId}
            />
          </h2>
        </ErrorBoundary>
      }
    >
      <EntryMain transformedData={transformedData} metadata={headers} />
    </SideBarLayout>
  );
};

export default Entry;
