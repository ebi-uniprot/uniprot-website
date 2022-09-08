import { Link } from 'react-router-dom';
import { Message } from 'franklin-sites';

import ErrorPage from '../../../shared/components/error-pages/ErrorPage';

import { LocationToPath, Location } from '../../../app/config/urls';

import ArtWork from './svg/empty-dashboard.img.svg';

const ErrorMessage = () => (
  <Message
    forFullPage
    level="warning"
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
  >
    No results available. Your UniProt tool results will be shown here
  </Message>
);

const EmptyDashboard = () => (
  <ErrorPage
    artwork={<img src={ArtWork} width="400" height="400" alt="" />}
    message={<ErrorMessage />}
  />
);

export default EmptyDashboard;
