import { History } from 'history';
import { Redirect, Route, Router, useLocation } from 'react-router-dom';
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
    return <Redirect to={{ ...location, pathname: newPathname }} />;
  }

  // Reinject the global history context to redirect in the navigator
  return (
    <Router history={globalHistory}>
      <Route render={() => <Redirect to={location} />} />
    </Router>
  );
};

export default CatchAll;
