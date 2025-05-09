import { Button, Dropdown, ShareNodesIcon } from 'franklin-sites';
import { createPath } from 'history';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';

import useColumnNames from '../../hooks/useColumnNames';
import useNS from '../../hooks/useNS';
import useViewMode from '../../hooks/useViewMode';
import { Namespace } from '../../types/namespaces';
import { sendGtagEventUrlCopy } from '../../utils/gtagEvents';
import { stringifyQuery } from '../../utils/url';
import { ExtraContent } from '../download/downloadReducer';
import CopyButton from './Copy';

const isCopySupported = Boolean(
  'clipboard' in navigator &&
    'writeText' in navigator.clipboard &&
    navigator.clipboard.writeText
);

type CopyLinkWebsiteProps = {
  namespaceOverride: Namespace | undefined;
  disableCardToggle: boolean;
  postCopy: () => unknown;
};

const CopyLinkWebsite = ({
  namespaceOverride,
  disableCardToggle = false,
  postCopy,
}: CopyLinkWebsiteProps) => {
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

  return (
    <CopyButton
      textToCopy={url}
      postCopy={(textCopied) => {
        if (textCopied) {
          sendGtagEventUrlCopy('share_results', textCopied);
        }
        postCopy();
      }}
    >
      Copy link to your results
    </CopyButton>
  );
};

const visibleElement = (onClick: () => unknown) => (
  <Button variant="tertiary" onClick={onClick}>
    <ShareNodesIcon />
    Share
  </Button>
);

const ShareDropdown = ({
  setDisplayDownloadPanel,
  namespaceOverride,
  disableCardToggle = false,
  setDownloadExtraContent,
}: {
  setDisplayDownloadPanel: Dispatch<SetStateAction<boolean>>;
  namespaceOverride?: Namespace | undefined;
  disableCardToggle?: boolean;
  setDownloadExtraContent: Dispatch<SetStateAction<ExtraContent>>;
}) => {
  if (!isCopySupported) {
    return null;
  }

  return (
    <Dropdown visibleElement={visibleElement}>
      {(closeDropdown: () => unknown) => (
        <ul>
          <li>
            <CopyLinkWebsite
              namespaceOverride={namespaceOverride}
              disableCardToggle={disableCardToggle}
              postCopy={closeDropdown}
            />
          </li>
          <li>
            <Button
              variant="tertiary"
              onClick={() => {
                setDisplayDownloadPanel(true);
                setDownloadExtraContent('url');
                closeDropdown();
              }}
            >
              Generate URL for API
            </Button>
          </li>
        </ul>
      )}
    </Dropdown>
  );
};

export default ShareDropdown;
