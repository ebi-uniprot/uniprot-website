import { History } from 'history';
import { Navigate, Route, Router, useLocation } from 'react-router';
import {
  misspeltHelpTuple,
  redirectFromTo,
} from '../../../shared/components/error-pages/ResourceNotFound';

type Props = { globalHistory: History };

const CatchAll = ({ globalHistory }: Props) => {
  const location = useLocation();
  const newPathname = redirectFromTo(location.pathname, [misspeltHelpTuple]);

  if (newPathname) {
    // Redirect in the panel's context
    return <Navigate replace to={{ ...location, pathname: newPathname }} />;
  }

  // Reinject the global history context to redirect in the navigator
  return (
    <Router history={globalHistory}>
      <Route render={() => <Navigate replace to={location} />} />
    </Router>
  );
};

export default CatchAll;
