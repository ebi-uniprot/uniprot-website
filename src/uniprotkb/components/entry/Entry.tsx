import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
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

import { RootAction } from '../../../app/state/rootInitialState';
import * as messagesActions from '../../../messages/state/messagesActions';

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

import { hasContent, hasExternalLinks } from '../../utils';
import apiUrls from '../../config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

type MatchParams = {
  accession: string;
  path: string;
};

type EntryProps = {
  addMessage: (message: MessageType) => void;
} & RouteComponentProps<MatchParams>;

const Entry: React.FC<EntryProps> = ({ addMessage, match }) => {
  const { path, params } = match;
  const { accession } = params;

  const { loading, data, status, error, redirectedTo } = useDataApi<
    UniProtkbAPIModel
  >(apiUrls.entry(accession));

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  if (data && data.entryType === EntryType.INACTIVE) {
    // TODO: check models, because I have no idea what I'm doing here 🤷🏽‍♂️
    const inactiveEntryData = (data as unknown) as UniProtkbInactiveEntryModel;

    return (
      <ObsoleteEntryPage
        accession={accession}
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

    addMessage(message);
  }

  const transformedData = uniProtKbConverter(data);

  const sections = UniProtKBEntryConfig.map((section) => ({
    label: section.name,
    id: section.name,

    disabled:
      section.name === EntrySection.ExternalLinks
        ? !hasExternalLinks(transformedData)
        : !hasContent(transformedData[section.name]),
  }));

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
          <BlastButton selectedEntries={[accession]} />
          <AlignButton
            selectedEntries={[accession, ...listOfIsoformAccessions]}
          />
          <DropdownButton
            label={
              <Fragment>
                <DownloadIcon />
                Download
              </Fragment>
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
          <AddToBasketButton selectedEntries={[accession]} />
        </div>
      ),
      mainContent: <EntryMain transformedData={transformedData} />,
    },
    {
      name: 'Feature viewer',
      path: 'feature-viewer',
      icon: <ProtVistaIcon />,
      mainContent: <FeatureViewer accession={accession} />,
    },
    {
      name: 'Publications',
      path: 'publications',
      icon: <PublicationIcon />,
      itemContent: <EntryPublicationsFacets accession={accession} />,
      mainContent: <EntryPublications accession={accession} />,
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
          title={`Publications for ${accession}`}
        />
      }
      actionButtons={
        <Switch>
          {displayMenuData.map((displayItem) => (
            <Route
              path={`${path}/${displayItem.path}`}
              render={() => <Fragment>{displayItem.actionButtons}</Fragment>}
              key={displayItem.name}
            />
          ))}
        </Switch>
      }
    >
      <Switch>
        {displayMenuData.map((displayItem) => (
          <Route
            path={`${path}/${displayItem.path}`}
            render={() => <Fragment>{displayItem.mainContent}</Fragment>}
            key={displayItem.name}
            exact={displayItem.exact}
          />
        ))}
      </Switch>
    </SideBarLayout>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      addMessage: (message: MessageType) => messagesActions.addMessage(message),
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));
