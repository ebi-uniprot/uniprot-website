import { FC } from 'react';
import { Link } from 'react-router-dom';

type SimpleViewProps = {
  termValue: string;
  linkTo?: string;
  className?: string;
  title?: string;
};

// Note: linkTo should be replaced by a Location object
const SimpleView: FC<SimpleViewProps> = ({
  termValue,
  linkTo,
  className,
  title,
}) => {
  if (typeof linkTo !== 'undefined') {
    return (
      // eslint-disable-next-line uniprot-website/use-config-location
      <Link to={linkTo} className={className} title={title}>
        {termValue}
      </Link>
    );
  }
  return <span className={className}>{termValue}</span>;
};

export default SimpleView;
