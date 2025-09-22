import { LongNumber } from 'franklin-sites';
import { Link, LinkProps } from 'react-router';

type CountLinkOrNothingProps = {
  condition?: boolean;
  children: number;
} & Omit<LinkProps, 'children'>;

const CountLinkOrNothing = ({
  condition = true,
  children,
  ...props
}: CountLinkOrNothingProps) => {
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
