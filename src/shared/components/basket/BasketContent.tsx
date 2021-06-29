import cn from 'classnames';
import { Tabs, Tab } from 'franklin-sites';

import useBasket from '../../hooks/useBasket';

import { Namespace } from '../../types/namespaces';

import styles from './styles/basket.module.scss';

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
    <div className={styles.basket}>
      <Tabs>
        <Tab
          title={`UniProtKB${
            uniprotkbIds?.size ? ` (${uniprotkbIds.size})` : ''
          }`}
          className={cn({ [styles.disabled]: !uniprotkbIds?.size })}
        >
          <ul>
            {uniprotkbIds &&
              Array.from(uniprotkbIds).map((id) => <li key={id}>{id}</li>)}
          </ul>
        </Tab>
        <Tab
          title={`UniRef${unirefIds?.size ? ` (${unirefIds.size})` : ''}`}
          className={cn({ [styles.disabled]: !unirefIds?.size })}
        >
          <ul>
            {unirefIds &&
              Array.from(unirefIds).map((id) => <li key={id}>{id}</li>)}
          </ul>
        </Tab>
        <Tab
          title={`UniParc${uniparcIds?.size ? ` (${uniparcIds.size})` : ''}`}
          className={cn({ [styles.disabled]: !uniparcIds?.size })}
        >
          <ul>
            {uniparcIds &&
              Array.from(uniparcIds).map((id) => <li key={id}>{id}</li>)}
          </ul>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BasketContent;
