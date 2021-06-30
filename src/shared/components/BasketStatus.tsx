import { Button, BasketIcon } from 'franklin-sites';
import cn from 'classnames';

import useBasket from '../hooks/useBasket';

import accessionToNamespace from '../utils/accessionToNamespace';
import { findAndOpenBasket } from './layouts/SecondaryItems';

import styles from './styles/basket-status.module.scss';

type Props = { id?: string; className?: string };

const BasketStatus = ({ id, className, ...props }: Props) => {
  const [basket /* , setBasket */] = useBasket();

  if (!id) {
    return null;
  }

  const namespace = accessionToNamespace(id);

  const inBasket = Boolean(basket.get(namespace)?.has(id));

  if (!inBasket) {
    return null;
  }

  return (
    <Button
      className={cn(className, styles['basket-status'])}
      onClick={findAndOpenBasket}
      variant="tertiary"
      title="Open basket"
      {...props}
    >
      <BasketIcon width="1ch" height="1ch" />
    </Button>
  );
};

export default BasketStatus;
