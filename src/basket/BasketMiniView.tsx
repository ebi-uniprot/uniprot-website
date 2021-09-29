import { useMemo, Dispatch, SetStateAction } from 'react';
import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';
import { Tabs, Tab, BinIcon, Button, FullViewIcon } from 'franklin-sites';

import ResultsData from '../shared/components/results/ResultsData';
import EmptyBasket from './EmptyBasket';
import ResultsButtons from '../shared/components/results/ResultsButtons';

import useBasket, { Basket } from '../shared/hooks/useBasket';
import useItemSelect from '../shared/hooks/useItemSelect';
import usePagination from '../shared/hooks/usePagination';
import useNSQuery from '../shared/hooks/useNSQuery';

import { LocationToPath, Location } from '../app/config/urls';

import { Namespace } from '../shared/types/namespaces';
import {
  ColumnDescriptor,
  getColumnsToDisplay,
} from '../shared/hooks/useColumns';
import { APIModel } from '../shared/types/apiModel';
import { UniProtKBColumn } from '../uniprotkb/types/columnTypes';
import { UniRefColumn } from '../uniref/config/UniRefColumnConfiguration';
import { UniParcColumn } from '../uniparc/config/UniParcColumnConfiguration';

import helper from '../shared/styles/helper.module.scss';
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
    facetsNotApplied: true,
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
        namespaceOverride={namespace}
        inBasket
        notCustomisable
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceOverride={namespace}
        columnsOverride={columns}
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
        ) : null}
      </Tab>
      <Tab
        title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
        className={cn({ [helper.disabled]: !unirefIds?.size })}
        // If the previous doesn't have content, select this one
        defaultSelected={!uniprotkbIds?.size && !!unirefIds?.size}
      >
        {unirefIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(unirefIds)}
            namespace={Namespace.uniref}
            columnNames={uniRefColumns}
            setBasket={setBasket}
            closePanel={closePanel}
          />
        ) : null}
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
        ) : null}
      </Tab>
    </Tabs>
  );
};

export default BasketMiniView;
