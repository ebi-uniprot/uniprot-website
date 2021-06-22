import { Tabs, Tab } from 'franklin-sites';

import styles from './styles/basket.module.scss';

const Basket = () => (
  <div className={styles.basket}>
    <Tabs>
      <Tab title="UniProtKB">UniProtKB basket contents</Tab>
      <Tab title="UniRef">UniRef basket contents</Tab>
      <Tab title="UniParc">UniParc basket contents</Tab>
    </Tabs>
  </div>
);

export default Basket;
