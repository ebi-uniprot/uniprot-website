import cn from 'classnames';
import { BinIcon, Button, FullViewIcon, Tab, Tabs } from 'franklin-sites';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { generatePath, Link } from 'react-router';

import { Location, LocationToPath } from '../app/config/urls';
import { reIds } from '../jobs/utils/urls';
import ResultsButtons from '../shared/components/results/ResultsButtons';
import ResultsData from '../shared/components/results/ResultsData';
import useBasket, { Basket } from '../shared/hooks/useBasket';
import {
  ColumnDescriptor,
  getColumnsToDisplay,
} from '../shared/hooks/useColumns';
import useDatabaseInfoMaps from '../shared/hooks/useDatabaseInfoMaps';
import useItemSelect from '../shared/hooks/useItemSelect';
import useNSQuery from '../shared/hooks/useNSQuery';
import usePagination from '../shared/hooks/usePagination';
import { APIModel } from '../shared/types/apiModel';
import { Namespace } from '../shared/types/namespaces';
import { getIdKeyForData } from '../shared/utils/getIdKey';
import { UniParcColumn } from '../uniparc/config/UniParcColumnConfiguration';
import { UniProtkbAPIModel } from '../uniprotkb/adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../uniprotkb/types/columnTypes';
import { UniRefColumn } from '../uniref/config/UniRefColumnConfiguration';
import EmptyBasket from './EmptyBasket';
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
  onFullView: () => void;
};

export const updateResultsWithAccessionSubsets = (
  results: APIModel[],
  namespace: Namespace,
  accessions: string[]
): APIModel[] => {
  if (!results.length) {
    return [];
  }
  const getIdKey = getIdKeyForData(results[0]);
  // for all the accessions in the basket
  return accessions
    .map((accession) => {
      let accessionToFind = accession;
      if (namespace === Namespace.uniprotkb) {
        // just find according to the part before the modifications
        [accessionToFind] = accession.split('[');
      }
      // find the entry data in the API payload
      let entry = results.find(
        (result) => getIdKey(result) === accessionToFind
      );
      if (namespace === Namespace.uniprotkb && entry) {
        entry = { ...entry }; // shallow copy
        // change its accession
        (entry as UniProtkbAPIModel).primaryAccession = accession;
      }
      return entry;
    })
    .filter((entryOrNot: APIModel | undefined): entryOrNot is APIModel =>
      Boolean(entryOrNot)
    );
};

const BasketMiniViewTab = ({
  accessions,
  namespace,
  columnNames,
  setBasket,
  onFullView,
}: BasketMiniViewTabProps) => {
  const subsetsMap = new Map(
    accessions.map((accession) => {
      const { id } = accession.match(reIds)?.groups || { id: accession };
      return [accession, id];
    })
  );

  const initialApiUrl = useNSQuery({
    // Passing accessions without modifications in case of subsets
    accessions: Array.from(new Set(subsetsMap.values())),
    overrideNS: namespace,
    withFacets: false,
    withColumns: false,
    withQuery: false,
    facetsNotApplied: true,
  });
  const resultsDataObject = usePagination(initialApiUrl);

  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect(resultsDataObject.initialLoading);

  // reset the selection every time the namespace changes
  useEffect(() => {
    setSelectedEntries([]);
  }, [namespace, setSelectedEntries]);

  const databaseInfoMaps = useDatabaseInfoMaps();

  const columns = useMemo<Array<ColumnDescriptor<APIModel>>>(
    () =>
      columnNames &&
      getColumnsToDisplay(
        namespace,
        columnNames,
        undefined,
        undefined,
        undefined,
        databaseInfoMaps
      ),
    [namespace, columnNames, databaseInfoMaps]
  );

  // Replacing the full accession including subsets in the resultsData
  resultsDataObject.allResults = updateResultsWithAccessionSubsets(
    resultsDataObject.allResults,
    namespace,
    accessions
  );

  return (
    <>
      <ResultsButtons
        total={accessions.length}
        loadedTotal={accessions.length}
        selectedEntries={selectedEntries}
        setSelectedEntries={setSelectedEntries}
        accessions={accessions}
        namespaceOverride={namespace}
        subsetsMap={subsetsMap}
        inBasket
        inBasketMini
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        setSelectedEntries={setSelectedEntries}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        namespaceOverride={namespace}
        columnsOverride={columns}
        basketSetter={setBasket}
      />
      {/* both classnames from Franklin */}
      <div className="button-group sliding-panel__button-row">
        {' '}
        <Button
          variant="secondary"
          onClick={() => {
            setBasket((basket) => {
              if (selectedEntries.length) {
                // remove specific entries from basket
                const nextSet = new Set(basket.get(namespace));
                for (const entry of selectedEntries) {
                  nextSet.delete(entry);
                }
                return new Map([...basket, [namespace, nextSet]]);
              }
              // else, clear whole basket
              return new Map([...basket, [namespace, new Set()]]);
            });
            setSelectedEntries([]);
          }}
        >
          <BinIcon height="1em" width="1em" />
          {selectedEntries.length
            ? `Remove (${selectedEntries.length})`
            : `Clear all (${accessions.length})`}
        </Button>
        <Link
          className="button secondary"
          to={generatePath(LocationToPath[Location.Basket], { namespace })}
          onClick={onFullView}
        >
          <FullViewIcon height="1em" width="1em" />
          Full view
        </Link>
      </div>
    </>
  );
};

const BasketMiniView = ({ onFullView }: { onFullView: () => void }) => {
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
        disabled={!uniprotkbIds?.size}
      >
        {uniprotkbIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(uniprotkbIds)}
            namespace={Namespace.uniprotkb}
            columnNames={uniProtKBColumns}
            setBasket={setBasket}
            onFullView={onFullView}
          />
        ) : null}
      </Tab>
      <Tab
        title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
        disabled={!unirefIds?.size}
        // If the previous doesn't have content, select this one
        defaultSelected={!uniprotkbIds?.size && !!unirefIds?.size}
      >
        {unirefIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(unirefIds)}
            namespace={Namespace.uniref}
            columnNames={uniRefColumns}
            setBasket={setBasket}
            onFullView={onFullView}
          />
        ) : null}
      </Tab>
      <Tab
        title={`UniParc${uniparcIds?.size ? ` (${uniparcIds.size})` : ''}`}
        disabled={!uniparcIds?.size}
        // If none of the previous has content, select this one
        defaultSelected={!(uniprotkbIds?.size || unirefIds?.size)}
      >
        {uniparcIds?.size ? (
          <BasketMiniViewTab
            accessions={Array.from(uniparcIds)}
            namespace={Namespace.uniparc}
            columnNames={uniParcColumns}
            setBasket={setBasket}
            onFullView={onFullView}
          />
        ) : null}
      </Tab>
    </Tabs>
  );
};

export default BasketMiniView;
