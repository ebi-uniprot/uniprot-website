import {
  FC,
  useState,
  Suspense,
  Dispatch,
  SetStateAction,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  DownloadIcon,
  // StatisticsIcon,
  Button,
  SlidingPanel,
} from 'franklin-sites';
import cn from 'classnames';

import ToolsDropdown from '../action-buttons/ToolsDropdown';
import AddToBasketButton from '../action-buttons/AddToBasket';
import CustomiseButton from '../action-buttons/CustomiseButton';
import ShareDropdown from '../action-buttons/ShareDropdown';
import ItemCount from '../ItemCount';
import ErrorBoundary from '../error-component/ErrorBoundary';
import FirstTimeSelection from './FirstTimeSelection';
import { ResubmitButton } from '../../../tools/components/ResultButtons';

import useNS from '../../hooks/useNS';
import useViewMode, { ViewMode } from '../../hooks/useViewMode';
import useColumnNames from '../../hooks/useColumnNames';
import useMessagesDispatch from '../../hooks/useMessagesDispatch';

import { roundNumber } from '../../utils/roundNumber';
import { addMessage } from '../../../messages/state/messagesActions';
import lazy from '../../utils/lazy';
import {
  getParamsFromURL,
  InvalidParamValue,
} from '../../../uniprotkb/utils/resultsUtils';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
  sendGtagEventPanelOpen,
  sendGtagEventPanelResultsDownloadClose,
  sendGtagEventViewMode,
} from '../../utils/gtagEvents';

import { Namespace, mainNamespaces } from '../../types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';
import { ExtraContent } from '../download/downloadReducer';

import styles from './styles/results-buttons.module.scss';

const DownloadComponent = lazy(
  /* istanbul ignore next */
  () => import(/* webpackChunkName: "download" */ '../download/Download')
);

type ResultsButtonsProps<T extends JobTypes> = {
  selectedEntries: string[];
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>;
  total: number;
  loadedTotal: number;
  accessions?: string[];
  namespaceOverride?: Namespace;
  base?: string;
  disableCardToggle?: boolean; // Note: remove if we have card view for id mapping
  inBasket?: boolean;
  inBasketMini?: boolean;
  notCustomisable?: boolean;
  subsetsMap?: Map<string, string>;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

const ResultsButtons: FC<
  React.PropsWithChildren<ResultsButtonsProps<JobTypes>>
> = ({
  selectedEntries,
  setSelectedEntries,
  total,
  loadedTotal,
  accessions,
  namespaceOverride,
  base,
  disableCardToggle = false,
  inBasket = false,
  inBasketMini = false,
  notCustomisable = false,
  subsetsMap,
  jobType,
  inputParamsData,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [downloadPanelExtraContent, setDownloadPanelExtraContent] =
    useState<ExtraContent>(null);
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const {
    viewMode,
    setViewMode,
    invalidUrlViewMode,
    fromUrl: viewModeIsFromUrl,
  } = useViewMode(namespaceOverride, disableCardToggle);
  const { invalidUrlColumnNames, fromUrl: columnNamesAreFromUrl } =
    useColumnNames({ namespaceOverride });
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useMessagesDispatch();

  const sharedUrlMode = viewModeIsFromUrl || columnNamesAreFromUrl;
  const hasResults = total !== 0;

  useEffect(() => {
    const invalidParamValues = [
      invalidUrlViewMode,
      invalidUrlColumnNames,
    ].filter(Boolean) as InvalidParamValue[];
    const [, unknownParams] = getParamsFromURL(history.location.search);
    if (invalidParamValues.length || unknownParams.length) {
      const content = (
        <>
          {invalidParamValues.length > 0 && (
            <>
              Ignoring invalid URL values:
              <ul>
                {invalidParamValues.map(({ parameter, value }) => (
                  <li key={parameter}>
                    <b>{parameter}</b>
                    {`: ${value}`}
                  </li>
                ))}
              </ul>
            </>
          )}
          {unknownParams.length > 0 && (
            <>
              Ignoring invalid URL parameters:
              <ul>
                {unknownParams.map((unknownParam) => (
                  <li key={unknownParam}>
                    <b>{unknownParam}</b>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      );
      dispatch(
        addMessage({
          id: 'invalid url params',
          content,
          format: MessageFormat.POP_UP,
          level: MessageLevel.WARNING,
          displayTime: 15_000,
        })
      );
    }
  }, [
    dispatch,
    history.location.search,
    invalidUrlColumnNames,
    invalidUrlViewMode,
  ]);

  const handleToggleDownload = useCallback(
    (reason: DownloadPanelFormCloseReason, downloadMethod?: DownloadMethod) => {
      setDisplayDownloadPanel((displayDownloadPanel) => {
        if (displayDownloadPanel) {
          sendGtagEventPanelResultsDownloadClose(reason, downloadMethod);
        } else {
          sendGtagEventPanelOpen('results_download');
        }
        return !displayDownloadPanel;
      });
    },
    []
  );

  const handleToggleView = (event: ChangeEvent<HTMLInputElement>) => {
    if (viewMode) {
      sendGtagEventViewMode('mode_click', viewMode);
    }
    setViewMode(event.target.value as ViewMode);
  };

  const isMain = mainNamespaces.has(namespace);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            // Meaning, in basket mini view, slide from the right
            position={inBasketMini ? 'right' : 'left'}
            onClose={handleToggleDownload}
            pathname={pathname}
          >
            <ErrorBoundary>
              <DownloadComponent
                selectedEntries={selectedEntries}
                accessions={accessions}
                accessionSubSequenceMap={subsetsMap}
                totalNumberResults={total}
                onClose={handleToggleDownload}
                namespace={namespace}
                base={base}
                notCustomisable={notCustomisable}
                inBasketMini={inBasketMini}
                inputParamsData={inputParamsData}
                jobType={jobType}
                extraContent={downloadPanelExtraContent}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className={cn('button-group', styles['results-buttons'])}>
        <ToolsDropdown
          selectedEntries={selectedEntries}
          blast={isMain && namespace !== Namespace.proteomes}
          align={isMain && namespace !== Namespace.proteomes}
          mapID={isMain && namespace !== Namespace.proteomes}
        />
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => handleToggleDownload('toggle')}
          disabled={!hasResults}
        >
          <DownloadIcon />
          Download (
          {roundNumber(selectedEntries.length || total)}
          )
        </Button>
        {isMain && namespace !== Namespace.proteomes && (
          <AddToBasketButton
            selectedEntries={selectedEntries}
            setSelectedEntries={setSelectedEntries}
            remove={inBasket}
          />
        )}
        {/* https://www.ebi.ac.uk/panda/jira/browse/TRM-22360 */}
        {/* {!inBasket && isMain && (
          <Button variant="tertiary" disabled>
            <StatisticsIcon />
            Statistics
          </Button>
        )} */}
        {hasResults && (
          <>
            {/* TODO: check if we want to add that to franklin, eventually... */}
            <form aria-label="Result view selector">
              {/* Wrapped in a form so that multiple instances don't interact */}
              <span role="radiogroup">
                {!viewMode && !sharedUrlMode && !inBasket && (
                  <FirstTimeSelection setViewMode={setViewMode} />
                )}
                View:
                <label>
                  Cards{' '}
                  <input
                    type="radio"
                    name="view"
                    value="cards"
                    checked={viewMode === 'cards'}
                    onChange={handleToggleView}
                    disabled={disableCardToggle}
                  />
                </label>
                <label>
                  Table{' '}
                  <input
                    type="radio"
                    name="view"
                    value="table"
                    checked={viewMode === 'table'}
                    onChange={handleToggleView}
                    disabled={disableCardToggle}
                  />
                </label>
              </span>
            </form>
            {!notCustomisable &&
              !sharedUrlMode &&
              // Exception for ID mapping results!
              (viewMode === 'table' || disableCardToggle) && (
                <CustomiseButton namespace={namespace} />
              )}
          </>
        )}

        {jobType && !inBasket && (
          <ResubmitButton jobType={jobType} inputParamsData={inputParamsData} />
        )}
        {!notCustomisable && !inBasket && (
          <ShareDropdown
            setDisplayDownloadPanel={setDisplayDownloadPanel}
            namespaceOverride={namespaceOverride}
            disableCardToggle={disableCardToggle}
            setDownloadExtraContent={setDownloadPanelExtraContent}
          />
        )}
        <ItemCount selected={selectedEntries.length} loaded={loadedTotal} />
      </div>
    </>
  );
};

export default ResultsButtons;
