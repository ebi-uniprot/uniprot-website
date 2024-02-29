import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, Button, CopyIcon, ShareNodesIcon } from 'franklin-sites';
import { createPath } from 'history';

import useNS from '../../hooks/useNS';
import useColumnNames from '../../hooks/useColumnNames';
import useViewMode from '../../hooks/useViewMode';
import useMessagesDispatch from '../../hooks/useMessagesDispatch';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { sendGtagEventUrlCopy } from '../../utils/gtagEvents';
import { stringifyQuery } from '../../utils/url';

import { Namespace } from '../../types/namespaces';
import { ExtraContent } from '../download/downloadReducer';

const isCopySupported = Boolean(
  'clipboard' in navigator &&
    'writeText' in navigator.clipboard &&
    navigator.clipboard.writeText
);

// TODO: expose way to close dropdown (in Franklin)
const clickOnDropdown = (element: HTMLElement) => {
  (
    element.closest('.dropdown-container')?.firstElementChild as
      | HTMLElement
      | null
      | undefined
  )?.click();
};

const CopyLinkWebsite = ({
  namespaceOverride,
  disableCardToggle = false,
}: {
  namespaceOverride: Namespace | undefined;
  disableCardToggle: boolean;
}) => {
  const dispatch = useMessagesDispatch();
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { columnNames } = useColumnNames({ namespaceOverride });
  const { viewMode } = useViewMode(namespace, disableCardToggle);
  const location = useLocation();
  const url =
    document.location.origin +
    createPath({
      ...location,
      search: stringifyQuery(location.search, {
        fields: viewMode === 'table' ? columnNames.join(',') : null,
        view: !disableCardToggle ? viewMode : null,
      }),
    });

  const handleClick = async ({ target }: MouseEvent) => {
    try {
      await navigator.clipboard.writeText(url);
      // Success with Clipboard API, display message
      dispatch(copySuccessMessage());
    } catch {
      // Issue with Clipboard API too, bail with error message
      dispatch(copyFailureMessage());
    } finally {
      // In any case, close the dropdown
      // TODO: expose way to close dropdown (in Franklin)
      clickOnDropdown(target as HTMLElement);
    }
  };

  return (
    <Button variant="tertiary" onClick={handleClick}>
      <CopyIcon width="1em" />
      Copy link to your results
    </Button>
  );
};

const ToolsDropdown = () => {
  if (!isCopySupported) {
    return null;
  }

  return (
    <Dropdown
      visibleElement={
        <Button variant="tertiary">
          <ShareNodesIcon />
          Share
        </Button>
      }
    >
      <ul>
        <li>
          <CopyLinkWebsite
            namespaceOverride={namespaceOverride}
            disableCardToggle={disableCardToggle}
          />
        </li>
        <li>
          <Button
            variant="tertiary"
            onClick={(event: MouseEvent<HTMLElement>) => {
              setDisplayDownloadPanel(true);
              // TODO: expose way to close dropdown (in Franklin)
              clickOnDropdown(event.target as HTMLElement);
              setDownloadExtraContent('url');
            }}
          >
            Generate URL for API
          </Button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default ToolsDropdown;
