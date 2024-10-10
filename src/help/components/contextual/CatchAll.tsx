import { History } from 'history';
import { Redirect, RouteChildrenProps, Router } from 'react-router-dom';
import {
  misspeltHelpTuple,
  redirectFromTo,
} from '../../../shared/components/error-pages/ResourceNotFound';

type Props = RouteChildrenProps & { globalHistory: History };

const CatchAll = ({ location, globalHistory }: Props) => {
  const newPathname = redirectFromTo(location.pathname, [misspeltHelpTuple]);

  if (newPathname) {
    // Redirect in the panel's context
    return <Redirect to={{ ...location, pathname: newPathname }} />;
  }

  // Reinject the global history context to redirect in the navigator
  return (
    <Router history={globalHistory}>
      <Redirect to={location} />
    </Router>
  );
};

export default CatchAll;
