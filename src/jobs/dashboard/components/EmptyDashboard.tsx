import { Message } from 'franklin-sites';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import ErrorComponent from '../../../shared/components/error-pages/ErrorComponent';
import ArtWork from './svg/empty-dashboard.img.svg';

const ErrorMessage = () => (
  <Message
    noIcon
    level="warning"
    heading={
      <h3>
        No results available. Your UniProt tool results will be shown here
      </h3>
    }
    subtitle={
      <>
        Try using <Link to={LocationToPath[Location.Blast]}>BLAST</Link>,{' '}
        <Link to={LocationToPath[Location.Align]}>Align</Link>,{' '}
        <Link to={LocationToPath[Location.IDMapping]}>Retrieve/ID Mapping</Link>{' '}
        or{' '}
        <Link to={LocationToPath[Location.PeptideSearch]}>Peptide Search</Link>{' '}
        to begin
      </>
    }
  />
);

const EmptyDashboard = () => (
  <ErrorComponent
    artwork={<img src={ArtWork} width="400" height="400" alt="" />}
  >
    <ErrorMessage />
  </ErrorComponent>
);

export default EmptyDashboard;
