import cn from 'classnames';
import { BasketIcon } from 'franklin-sites';

import useBasket from '../shared/hooks/useBasket';
import accessionToNamespace from '../shared/utils/accessionToNamespace';
import styles from './styles/basket-status.module.scss';

type Props = { id?: string; className?: string };

const BasketStatus = ({ id, className, ...props }: Props) => {
  const [basket] = useBasket();

  if (!id) {
    return null;
  }

  const namespace = accessionToNamespace(id);

  const inBasket = Boolean(basket.get(namespace)?.has(id));

  if (!inBasket) {
    return null;
  }

  return (
    <span
      className={cn(className, styles['basket-status'])}
      title="In the basket"
      {...props}
    >
      <BasketIcon width="1ch" height="1ch" />
    </span>
  );
};

export default BasketStatus;
