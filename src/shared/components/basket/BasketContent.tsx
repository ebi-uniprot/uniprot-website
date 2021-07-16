import {
  useMemo,
  useRef,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Tabs, Tab, BinIcon, Button, FullViewIcon } from 'franklin-sites';

import ResultsData from '../results/ResultsData';
import EmptyBasket from './EmptyBasket';

import useBasket, { Basket } from '../../hooks/useBasket';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';
import useNSQuery from '../../hooks/useNSQuery';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';
import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';
import { ColumnDescriptor, getColumnsToDisplay } from '../../hooks/useColumns';
import { APIModel } from '../../types/apiModel';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { UniParcColumn } from '../../../uniparc/config/UniParcColumnConfiguration';

import styles from './styles/basket-content.module.scss';

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

const MiniResultTable = ({
  accessions,
  namespace,
  columnNames,
  setBasket,
}: {
  accessions: string[];
  namespace: Namespace;
  columnNames?: Array<UniProtKBColumn | UniRefColumn | UniParcColumn>;
  setBasket: Dispatch<SetStateAction<Basket>>;
}) => {
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const initialApiUrl = useNSQuery({
    accessions,
    overrideNS: namespace,
    withFacets: false,
    withColumns: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);

  const columns = useMemo<undefined | Array<ColumnDescriptor<APIModel>>>(
    () =>
      columnNames && [
        ...getColumnsToDisplay(namespace, columnNames),
        {
          name: 'remove',
          label: null,
          render: (datum) => (
            <Button
              variant="tertiary"
              onClick={() =>
                setBasket((currentBasket) => {
                  const basketSubset = new Set(currentBasket.get(namespace));
                  basketSubset?.delete(getIdKeyFor(namespace)(datum));
                  return new Map([
                    // other namespaces, untouched
                    ...currentBasket,
                    [namespace, basketSubset],
                  ]);
                })
              }
            >
              <BinIcon width="1.5em" />
            </Button>
          ),
        },
      ],
    [namespace, columnNames, setBasket]
  );

  return (
    <span className={styles['basket-content']}>
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceFallback={namespace}
        columnsFallback={columns}
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
          to={LocationToPath[Location.Basket]}
        >
          <FullViewIcon height="1em" width="1em" />
          Full view
        </Button>
      </div>
    </span>
  );
};

const BasketContent = ({ closePanel }: { closePanel?: () => void }) => {
  const [basket, setBasket] = useBasket();

  // All of this should probably part of the sliding panel logic
  // See https://www.ebi.ac.uk/panda/jira/browse/TRM-26294
  const { pathname } = useLocation();
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      closePanel?.();
    }
    // keep pathname below, this is to trigger the effect when it changes
  }, [closePanel, pathname]);

  const uniprotkbIds = basket.get(Namespace.uniprotkb);
  const unirefIds = basket.get(Namespace.uniref);
  const uniparcIds = basket.get(Namespace.uniparc);

  if (!uniprotkbIds?.size && !unirefIds?.size && !uniparcIds?.size) {
    return <EmptyBasket />;
  }

  // TODO
  // Wire in buttons
  return (
    <Tabs>
      <Tab
        title={`UniProtKB${
          uniprotkbIds?.size ? ` (${uniprotkbIds.size})` : ''
        }`}
        className={cn({ [styles.disabled]: !uniprotkbIds?.size })}
      >
        {uniprotkbIds?.size ? (
          <MiniResultTable
            accessions={Array.from(uniprotkbIds)}
            namespace={Namespace.uniprotkb}
            columnNames={closePanel ? uniProtKBColumns : undefined}
            setBasket={setBasket}
          />
        ) : (
          <Fragment />
        )}
      </Tab>
      <Tab
        title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
        className={cn({ [styles.disabled]: !unirefIds?.size })}
        // If the previous doesn't have content, select this one
        defaultSelected={!uniprotkbIds?.size}
      >
        {unirefIds?.size ? (
          <MiniResultTable
            accessions={Array.from(unirefIds)}
            namespace={Namespace.uniref}
            columnNames={closePanel ? uniRefColumns : undefined}
            setBasket={setBasket}
          />
        ) : (
          <Fragment />
        )}
      </Tab>
      <Tab
        title={`UniParc${uniparcIds?.size ? ` (${uniparcIds.size})` : ''}`}
        className={cn({ [styles.disabled]: !uniparcIds?.size })}
        // If none of the previous has content, select this one
        defaultSelected={!(uniprotkbIds?.size || unirefIds?.size)}
      >
        {uniparcIds?.size ? (
          <MiniResultTable
            accessions={Array.from(uniparcIds)}
            namespace={Namespace.uniparc}
            columnNames={closePanel ? uniParcColumns : undefined}
            setBasket={setBasket}
          />
        ) : (
          <Fragment />
        )}
      </Tab>
    </Tabs>
  );
};

export default BasketContent;
