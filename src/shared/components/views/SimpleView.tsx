import { FC } from 'react';
import { Link } from 'react-router-dom';

type SimpleViewProps = {
  termValue: string;
  linkTo?: string;
  className?: string;
};

// Note: linkTo should be replaced by a Location object
const SimpleView: FC<SimpleViewProps> = ({ termValue, linkTo, className }) => {
  if (typeof linkTo !== 'undefined') {
    return (
      // eslint-disable-next-line uniprot-website/use-config-location
      <Link to={linkTo} className={className}>
        {termValue}
      </Link>
    );
  }
  return <span className={className}>{termValue}</span>;
};

export default SimpleView;
