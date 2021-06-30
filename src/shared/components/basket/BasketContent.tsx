import cn from 'classnames';
import { Tabs, Tab } from 'franklin-sites';

import ResultsData from '../results/ResultsData';

import useBasket from '../../hooks/useBasket';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';
import useNSQuery from '../../hooks/useNSQuery';

import { Namespace } from '../../types/namespaces';

import styles from './styles/basket.module.scss';

const MiniResultTable = ({
  accessions,
  namespace,
}: {
  accessions: string[];
  namespace: Namespace;
}) => {
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const { url: initialApiUrl, direct } = useNSQuery({
    accessions,
    overrideNS: namespace,
    withFacets: false,
    withColumns: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);

  return (
    <ResultsData
      resultsDataObject={resultsDataObject}
      direct={direct}
      selectedEntries={selectedEntries}
      handleEntrySelection={handleEntrySelection}
    />
  );
};

const BasketContent = () => {
  const [basket] = useBasket();

  const uniprotkbIds = basket.get(Namespace.uniprotkb);
  const unirefIds = basket.get(Namespace.uniref);
  const uniparcIds = basket.get(Namespace.uniparc);
  // TODO
  // Create query for the accessions endpoint
  // Wire in datatables
  // Wire in buttons
  return (
    <Tabs>
      <Tab
        title={`UniProtKB${
          uniprotkbIds?.size ? ` (${uniprotkbIds.size})` : ''
        }`}
        className={cn({ [styles.disabled]: !uniprotkbIds?.size })}
      >
        {uniprotkbIds && (
          <MiniResultTable
            accessions={Array.from(uniprotkbIds)}
            namespace={Namespace.uniprotkb}
          />
        )}
      </Tab>
      <Tab
        title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
        className={cn({ [styles.disabled]: !unirefIds?.size })}
      >
        {unirefIds && (
          <MiniResultTable
            accessions={Array.from(unirefIds)}
            namespace={Namespace.uniref}
          />
        )}
      </Tab>
      <Tab
        title={`UniParc${uniparcIds?.size ? ` (${uniparcIds.size})` : ''}`}
        className={cn({ [styles.disabled]: !uniparcIds?.size })}
      >
        {uniparcIds && (
          <MiniResultTable
            accessions={Array.from(uniparcIds)}
            namespace={Namespace.uniparc}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default BasketContent;
