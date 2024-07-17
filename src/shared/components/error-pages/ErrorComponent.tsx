import { ReactElement, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles/error-component.module.scss';

type Props = {
  artwork: ReactElement;
} & HTMLAttributes<HTMLDivElement>;

const ErrorComponent = ({ artwork, children, className, ...props }: Props) => (
  <div className={cn(styles.container, className)} {...props}>
    {artwork}
    {children}
  </div>
);

export default ErrorComponent;
