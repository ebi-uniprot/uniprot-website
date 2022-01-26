import { Link, Router } from 'react-router-dom';
import { History } from 'history';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';

// All of those exit the panel, so put them in the global history context
const Shortcuts = ({ globalHistory }: { globalHistory: History }) => (
  <Router history={globalHistory}>
    <Link to={LocationToPath[Location.HelpResults]}>Help center</Link>
    {/* eslint-disable-next-line */}
    <Link to="#">Contact us</Link>
    <Link to={getLocationEntryPath(Location.HelpEntry, 'publications')}>
      Cite us
    </Link>
  </Router>
);

export default Shortcuts;
