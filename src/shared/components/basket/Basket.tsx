import { Tabs, Tab } from 'franklin-sites';

import styles from './styles/basket.module.scss';

const Basket = () => (
  <div className={styles.basket}>
    <div className={styles['basket__header']}>
      <h1 className="medium">My Basket</h1>
    </div>
    <Tabs>
      <Tab title="UniProtKB">
        Results component with custom column config and override useNS?
      </Tab>
      <Tab title="UniRef">
        Results component with custom column config and override useNS?
      </Tab>
      <Tab title="UniParc">
        Results component with custom column config and override useNS?
      </Tab>
    </Tabs>
  </div>
);

export default Basket;
