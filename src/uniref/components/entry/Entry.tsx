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

import EntryMain from './EntryMain';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

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

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniRefEntry]
  );

  const { loading, data, status, error, redirectedTo } = useDataApi<
    UniRefAPIModel
  >(apiUrls.uniref.entry(match?.params.accession || ''));

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
      actionButtons={
        <div className="button-group">
          <BlastButton selectedEntries={[match.params.accession]} />
          <AlignButton selectedEntries={[]} />
          {/* <DropdownButton
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
          </DropdownButton> */}
          <AddToBasketButton selectedEntries={[match.params.accession]} />
        </div>
      }
      className="entry-page"
    >
      <EntryMain transformedData={transformedData} />
    </SideBarLayout>
  );
};

export default Entry;
