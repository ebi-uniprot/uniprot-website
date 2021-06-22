import { Button, BasketIcon } from 'franklin-sites';

import useBasket from '../hooks/useBasket';

import accessionToNamespace from '../utils/accessionToNamespace';

import styles from './styles/basket-status.module.scss';

type Props = { id?: string };

const BasketStatus = ({ id }: Props) => {
  const [basket /* , setBasket */] = useBasket();

  if (!id) {
    return null;
  }

  const namespace = accessionToNamespace(id);

  const inBasket = Boolean(basket.get(namespace)?.has(id));

  if (!inBasket) {
    return null;
  }

  // TODO: for Xavier to replace with "open basket" logic
  // const removeEntry = () => {
  //   setBasket((currentBasket) => {
  //     const newSet = new Set(currentBasket.get(namespace));
  //     newSet.delete(id);
  //     return new Map([...currentBasket, [namespace, newSet]]);
  //   });
  // }

  return (
    <Button
      className={styles['basket-status']}
      // onClick={removeEntry}
      variant="tertiary"
      title={`Remove ${id} from basket`}
    >
      <BasketIcon width="1ch" height="1ch" />
    </Button>
  );
};

export default BasketStatus;
