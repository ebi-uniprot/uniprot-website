import {
  FC,
  useState,
  Suspense,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  DownloadIcon,
  // StatisticsIcon,
  TableIcon,
  ListIcon,
  Button,
  SlidingPanel,
} from 'franklin-sites';

import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import MapIDButton from '../action-buttons/MapID';
import AddToBasketButton from '../action-buttons/AddToBasket';
import CustomiseButton from '../action-buttons/CustomiseButton';
import ShareDropdown from '../action-buttons/ShareDropdown';
import ItemCount from '../ItemCount';
import ErrorBoundary from '../error-component/ErrorBoundary';

import useNS from '../../hooks/useNS';

import { addMessage } from '../../../messages/state/messagesActions';
import lazy from '../../utils/lazy';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { Namespace, mainNamespaces } from '../../types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import './styles/results-buttons.scss';
import useViewMode from '../../hooks/useViewMode';
import useColumnNames from '../../hooks/useColumnNames';

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
  notCustomisable?: boolean;
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
  notCustomisable = false,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const [viewMode, setViewMode, invalidViewMode] = useViewMode();
  const [, , , invalidColumns] = useColumnNames();
  const history = useHistory();
  const dispatch = useDispatch();

  const invalidParamValues = [invalidViewMode, invalidColumns].filter(Boolean);
  const [, unknownParams] = getParamsFromURL(history.location.search);
  if (invalidParamValues.length || unknownParams.length) {
    const content = (
      <>
        {invalidParamValues.length > 0 && (
          <>
            Ignoring invalid URL values:
            <ul>
              {invalidParamValues.map(({ parameter, value }) => (
                <li>
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
                <li>
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

  const isMain = mainNamespaces.has(namespace);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            // Meaning, in basket mini view, slide from the right
            position={notCustomisable && inBasket ? 'right' : 'left'}
            onClose={() => setDisplayDownloadPanel(false)}
          >
            <ErrorBoundary>
              <DownloadComponent
                selectedEntries={selectedEntries}
                accessions={accessions}
                totalNumberResults={total}
                onClose={() => setDisplayDownloadPanel(false)}
                namespace={namespace}
                base={base}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group results-buttons">
        {isMain && namespace !== Namespace.proteomes && (
          <BlastButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <AlignButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <MapIDButton
            selectedEntries={selectedEntries}
            namespace={namespace}
          />
        )}
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel((value) => !value)}
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
        <Button
          variant="tertiary"
          className="large-icon"
          onClick={() => setViewMode(viewMode === 'card' ? 'table' : 'card')}
          data-testid="table-card-toggle"
          title={`Switch to "${viewMode === 'card' ? 'table' : 'card'}" view`}
          disabled={disableCardToggle}
        >
          <TableIcon
            className={cn('results-buttons__toggle', {
              'results-buttons__toggle--active': viewMode === 'table',
            })}
          />
          <ListIcon
            className={cn('results-buttons__toggle', {
              'results-buttons__toggle--active': viewMode === 'card',
            })}
          />
        </Button>
        {!notCustomisable &&
          // Exception for ID mapping results!
          (viewMode === 'table' || disableCardToggle) && (
            <CustomiseButton namespace={namespace} />
          )}
        {!notCustomisable && (
          <ShareDropdown setDisplayDownloadPanel={setDisplayDownloadPanel} />
        )}
        <ItemCount selected={selectedEntries.length} loaded={loadedTotal} />
      </div>
    </>
  );
};

export default ResultsButtons;
