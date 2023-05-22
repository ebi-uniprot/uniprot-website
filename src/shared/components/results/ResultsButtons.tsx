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
import { useHistory } from 'react-router-dom';
import {
  DownloadIcon,
  // StatisticsIcon,
  Button,
  SlidingPanel,
} from 'franklin-sites';
import cn from 'classnames';

import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import MapIDButton from '../action-buttons/MapID';
import AddToBasketButton from '../action-buttons/AddToBasket';
import CustomiseButton from '../action-buttons/CustomiseButton';
import ShareDropdown from '../action-buttons/ShareDropdown';
import ItemCount from '../ItemCount';
import ErrorBoundary from '../error-component/ErrorBoundary';
import FirstTimeSelection from './FirstTimeSelection';

import useNS from '../../hooks/useNS';
import useViewMode, { ViewMode } from '../../hooks/useViewMode';
import useColumnNames from '../../hooks/useColumnNames';
import useMessagesDispatch from '../../hooks/useMessagesDispatch';

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
import { FileFormat } from '../../types/resultsDownload';

import styles from './styles/results-buttons.module.scss';

const DownloadComponent = lazy(
  /* istanbul ignore next */
  () => import(/* webpackChunkName: "download" */ '../download/Download')
);

type ResultsButtonsProps = {
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
  supportedFormats?: FileFormat[];
  excludeColumns?: boolean;
};

const ResultsButtons: FC<ResultsButtonsProps> = ({
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
  supportedFormats,
  excludeColumns = false,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
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
  const dispatch = useMessagesDispatch();

  const sharedUrlMode = viewModeIsFromUrl || columnNamesAreFromUrl;

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

  // Download and ID mapping expects accessions without modifications (applicable in Basket views)
  const selectedAccWithoutSubset = subsetsMap
    ? Array.from(new Set(selectedEntries.map((e) => subsetsMap.get(e) || e)))
    : selectedEntries;

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            // Meaning, in basket mini view, slide from the right
            position={notCustomisable && inBasket ? 'right' : 'left'}
            onClose={handleToggleDownload}
          >
            <ErrorBoundary>
              <DownloadComponent
                selectedEntries={selectedAccWithoutSubset}
                accessions={
                  subsetsMap
                    ? Array.from(new Set(subsetsMap?.values()))
                    : accessions
                } // Passing all accessions without modifications to Download
                totalNumberResults={total}
                onClose={handleToggleDownload}
                namespace={namespace}
                base={base}
                notCustomisable={notCustomisable}
                supportedFormats={supportedFormats}
                excludeColumns={excludeColumns}
                inBasketMini={inBasketMini}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className={cn('button-group', styles['results-buttons'])}>
        {isMain && namespace !== Namespace.proteomes && (
          <BlastButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <AlignButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <MapIDButton
            selectedEntries={selectedAccWithoutSubset}
            namespace={namespace}
          />
        )}
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => handleToggleDownload('toggle')}
        >
          <DownloadIcon />
          Download
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
        {!notCustomisable && !inBasket && (
          <ShareDropdown
            setDisplayDownloadPanel={setDisplayDownloadPanel}
            namespaceOverride={namespaceOverride}
            disableCardToggle={disableCardToggle}
          />
        )}
        <ItemCount selected={selectedEntries.length} loaded={loadedTotal} />
      </div>
    </>
  );
};

export default ResultsButtons;
