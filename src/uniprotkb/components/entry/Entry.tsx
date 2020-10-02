import React, { useMemo, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  InPageNav,
  Loader,
  DisplayMenu,
  PublicationIcon,
  ExternalLinkIcon,
  TremblIcon,
  DownloadIcon,
  DropdownButton,
  ProtVistaIcon,
} from 'franklin-sites';

import { fileFormatEntryDownload } from '../../types/resultsTypes';
import EntrySection from '../../types/entrySection';
import {
  MessageLevel,
  MessageFormat,
  MessageType,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import FeatureViewer from './FeatureViewer';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryPublications from './EntryPublications';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ObsoleteEntryPage from '../../../shared/components/error-pages/ObsoleteEntryPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniProtKbConverter, {
  EntryType,
  UniProtkbInactiveEntryModel,
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import {
  CommentType,
  AlternativeProductsComment,
  Isoform,
} from '../../types/commentTypes';

import './styles/entry-page.scss';

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniProtKBEntry]
  );

  const { loading, data, status, error, redirectedTo } = useDataApi<
    UniProtkbAPIModel | UniProtkbInactiveEntryModel
  >(apiUrls.entry(match?.params.accession || ''));

  const transformedData = useMemo(() => data && uniProtKbConverter(data), [
    data,
  ]);

  const sections = useMemo(
    () =>
      transformedData &&
      UniProtKBEntryConfig.map((section) => ({
        label: section.name,
        id: section.id,
        disabled:
          section.name === EntrySection.ExternalLinks
            ? !hasExternalLinks(transformedData)
            : !hasContent(transformedData[section.name]),
      })),
    [transformedData]
  );

  if (loading || !data) {
    return <Loader />;
  }

  if (error || !match?.params.accession) {
    return <ErrorHandler status={status} />;
  }

  if (data && data.entryType === EntryType.INACTIVE) {
    const inactiveEntryData = data;

    return (
      <ObsoleteEntryPage
        accession={match.params.accession}
        details={inactiveEntryData.inactiveReason}
      />
    );
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

  const listOfIsoformAccessions =
    data.comments
      ?.filter(
        (comment) => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
      )
      ?.map((comment) =>
        (comment as AlternativeProductsComment).isoforms.map(
          (isoform) => (isoform as Isoform).isoformIds
        )
      )
      ?.flat(2)
      ?.filter(
        (maybeAccession: string | undefined): maybeAccession is string =>
          typeof maybeAccession === 'string'
      ) || [];

  const displayMenuData = [
    {
      name: 'Entry',
      icon: <TremblIcon />,
      itemContent: (
        <InPageNav sections={sections} rootElement=".sidebar-layout__content" />
      ),
      path: '',
      exact: true,
      actionButtons: (
        <div className="button-group">
          <BlastButton selectedEntries={[match.params.accession]} />
          <AlignButton
            selectedEntries={[
              match.params.accession,
              ...listOfIsoformAccessions,
            ]}
          />
          <DropdownButton
            label={
              <>
                <DownloadIcon />
                Download
              </>
            }
            className="tertiary"
            // onSelect={action('onSelect')}
          >
            <div className="dropdown-menu__content">
              <ul>
                {fileFormatEntryDownload.map((fileFormat) => (
                  <li key={fileFormat}>
                    <a
                      href={apiUrls.entryDownload(
                        transformedData.primaryAccession,
                        fileFormat
                      )}
                    >
                      {fileFormat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </DropdownButton>
          <AddToBasketButton selectedEntries={[match.params.accession]} />
        </div>
      ),
      mainContent: <EntryMain transformedData={transformedData} />,
    },
    {
      name: 'Feature viewer',
      path: 'feature-viewer',
      icon: <ProtVistaIcon />,
      mainContent: <FeatureViewer accession={match.params.accession} />,
    },
    {
      name: 'Publications',
      path: 'publications',
      icon: <PublicationIcon />,
      itemContent: (
        <EntryPublicationsFacets accession={match.params.accession} />
      ),
      mainContent: <EntryPublications accession={match.params.accession} />,
    },
    {
      name: 'External links',
      path: 'external-links',
      icon: <ExternalLinkIcon />,
      mainContent: <EntryExternalLinks transformedData={transformedData} />,
    },
  ];

  return (
    <SideBarLayout
      sidebar={
        <DisplayMenu
          data={displayMenuData}
          title={`Publications for ${match.params.accession}`}
        />
      }
      actionButtons={
        <Switch>
          {displayMenuData.map((displayItem) => (
            <Route
              path={`${match.path}/${displayItem.path}`}
              key={displayItem.name}
            >
              {displayItem.actionButtons}
            </Route>
          ))}
        </Switch>
      }
      className="entry-page"
    >
      <Switch>
        {displayMenuData.map((displayItem) => (
          <Route
            path={`${match.path}/${displayItem.path}`}
            key={displayItem.name}
            exact={displayItem.exact}
          >
            {displayItem.mainContent}
          </Route>
        ))}
      </Switch>
    </SideBarLayout>
  );
};

export default Entry;
