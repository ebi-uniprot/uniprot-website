import {
  useMemo,
  useRef,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Tabs, Tab, BinIcon, Button, FullViewIcon } from 'franklin-sites';

import ResultsData from '../results/ResultsData';
import EmptyBasket from './EmptyBasket';
import ResultsButtons from '../results/ResultsButtons';

import useBasket, { Basket } from '../../hooks/useBasket';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';
import useNSQuery from '../../hooks/useNSQuery';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { ColumnDescriptor, getColumnsToDisplay } from '../../hooks/useColumns';
import { APIModel } from '../../types/apiModel';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { UniParcColumn } from '../../../uniparc/config/UniParcColumnConfiguration';

import helper from '../../styles/helper.module.scss';
import styles from './styles/basket-mini-view.module.scss';

const uniProtKBColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.id,
  UniProtKBColumn.organismName,
];

const uniRefColumns = [
  UniRefColumn.id,
  UniRefColumn.name,
  UniRefColumn.organism,
];

const uniParcColumns = [
  UniParcColumn.upi,
  UniParcColumn.organism,
  UniParcColumn.accession,
];

type BasketMiniViewTabProps = {
  accessions: string[];
  namespace: Namespace;
  columnNames: Array<UniProtKBColumn | UniRefColumn | UniParcColumn>;
  setBasket: Dispatch<SetStateAction<Basket>>;
  closePanel: () => void;
};

const BasketMiniViewTab = ({
  accessions,
  namespace,
  columnNames,
  setBasket,
  closePanel,
}: BasketMiniViewTabProps) => {
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const initialApiUrl = useNSQuery({
    accessions,
    overrideNS: namespace,
    withFacets: false,
    withColumns: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);

  const columns = useMemo<Array<ColumnDescriptor<APIModel>>>(
    () => columnNames && getColumnsToDisplay(namespace, columnNames),
    [namespace, columnNames]
  );

  return (
    <>
      <ResultsButtons
        total={accessions.length}
        selectedEntries={selectedEntries}
        accessions={accessions}
        namespaceFallback={namespace}
        inBasket
        notCustomisable
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceFallback={namespace}
        columnsFallback={columns}
        basketSetter={setBasket}
      />
      {/* both classnames from Franklin */}
      <div className="button-group sliding-panel__button-row">
        <Button
          variant="secondary"
          onClick={() => {
            setBasket((basket) => new Map([...basket, [namespace, new Set()]]));
          }}
        >
          <BinIcon height="1em" width="1em" />
          {selectedEntries.length
            ? `Remove (${selectedEntries.length})`
            : `Clear all (${accessions.length})`}
        </Button>
        <Button
          element={Link}
          variant="secondary"
          to={generatePath(LocationToPath[Location.Basket], { namespace })}
          onClick={closePanel}
        >
          <FullViewIcon height="1em" width="1em" />
          Full view
        </Button>
      </div>
    </>
  );
};

const BasketMiniView = ({ closePanel }: { closePanel: () => void }) => {
  const [basket, setBasket] = useBasket();

  const uniprotkbIds = basket.get(Namespace.uniprotkb);
  const unirefIds = basket.get(Namespace.uniref);
  const uniparcIds = basket.get(Namespace.uniparc);

  // All of this should probably part of the sliding panel logic
  // See https://www.ebi.ac.uk/panda/jira/browse/TRM-26294
  const { pathname } = useLocation();
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      closePanel();
    }
    // keep pathname below, this is to trigger the effect when it changes
  }, [closePanel, pathname]);

  if (!uniprotkbIds?.size && !unirefIds?.size && !uniparcIds?.size) {
    return <EmptyBasket />;
  }

  // TODO: logic to choose default tab depending on which URL we're at

  return (
    <Tabs className={styles['basket-content']}>
      <Tab
        title={`UniProtKB${
          uniprotkbIds?.size ? ` (${uniprotkbIds.size})` : ''
        }`}
        className={cn({ [helper.disabled]: !uniprotkbIds?.size })}
      >
        {uniprotkbIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(uniprotkbIds)}
            namespace={Namespace.uniprotkb}
            columnNames={uniProtKBColumns}
            setBasket={setBasket}
            closePanel={closePanel}
          />
        ) : (
          // Fragment instead of null because Franklin's Tab is not happy
          <Fragment />
        )}
      </Tab>
      <Tab
        title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
        className={cn({ [helper.disabled]: !unirefIds?.size })}
        // If the previous doesn't have content, select this one
        defaultSelected={!uniprotkbIds?.size}
      >
        {unirefIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(unirefIds)}
            namespace={Namespace.uniref}
            columnNames={uniRefColumns}
            setBasket={setBasket}
            closePanel={closePanel}
          />
        ) : (
          // Fragment instead of null because Franklin's Tab is not happy
          <Fragment />
        )}
      </Tab>
      <Tab
        title={`UniParc${uniparcIds?.size ? ` (${uniparcIds.size})` : ''}`}
        className={cn({ [helper.disabled]: !uniparcIds?.size })}
        // If none of the previous has content, select this one
        defaultSelected={!(uniprotkbIds?.size || unirefIds?.size)}
      >
        {uniparcIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(uniparcIds)}
            namespace={Namespace.uniparc}
            columnNames={uniParcColumns}
            setBasket={setBasket}
            closePanel={closePanel}
          />
        ) : (
          // Fragment instead of null because Franklin's Tab is not happy
          <Fragment />
        )}
      </Tab>
    </Tabs>
  );
};

export default BasketMiniView;
