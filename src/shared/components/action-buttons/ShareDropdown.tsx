import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { DropdownButton, Button, CopyIcon } from 'franklin-sites';
import { createPath } from 'history';

import useNS from '../../hooks/useNS';
import useColumnNames from '../../hooks/useColumnNames';
import useViewMode from '../../hooks/useViewMode';
import { useMessagesReducer } from '../../hooks/useGlobalReducer';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { Namespace } from '../../types/namespaces';

const isCopySupported =
  'clipboard' in navigator && 'writeText' in navigator.clipboard;

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
  const [, dispatch] = useMessagesReducer();
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { columnNames } = useColumnNames(namespaceOverride);
  const { viewMode } = useViewMode(namespace, disableCardToggle);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  if (viewMode === 'table') {
    searchParams.set('fields', columnNames.join(','));
  } else {
    searchParams.delete('fields');
  }
  if (!disableCardToggle) {
    searchParams.set('view', `${viewMode}`);
  }
  const url =
    document.location.origin +
    createPath({ ...location, search: searchParams.toString() });

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

const ShareDropdown = ({
  setDisplayDownloadPanel,
  namespaceOverride,
  disableCardToggle = false,
}: {
  setDisplayDownloadPanel: Dispatch<SetStateAction<boolean>>;
  namespaceOverride?: Namespace | undefined;
  disableCardToggle?: boolean;
}) => {
  if (!isCopySupported) {
    return null;
  }

  return (
    <DropdownButton variant="tertiary" label="Share">
      <div className="dropdown-menu__content">
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
              }}
            >
              Generate URL for API
            </Button>
          </li>
        </ul>
      </div>
    </DropdownButton>
  );
};

export default ShareDropdown;
