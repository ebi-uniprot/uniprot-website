import { LongNumber } from 'franklin-sites';
import { Link, LinkProps } from 'react-router-dom';

type CountLinkOrNothingProps<T> = {
  condition?: boolean;
  children: number;
} & Omit<LinkProps<T>, 'children'>;

export const CountLinkOrNothing = <T,>({
  condition = true,
  children,
  ...props
}: CountLinkOrNothingProps<T>) => {
  if (children && condition) {
    return (
      <Link {...props}>
        <LongNumber>{children}</LongNumber>
      </Link>
    );
  }
  return <LongNumber>{children}</LongNumber>;
};

export default CountLinkOrNothing;
