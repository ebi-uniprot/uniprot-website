/* global BASE_URL */
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import BaseLayout from './layout/BaseLayout';
import HomePage from './pages/HomePage';
import AdvancedSearch from './search/AdvancedSearch';
import UniProtKbResults from './results/UniProtKbResults';

class App extends Component {
  /** WARNING
  Only storing the query in the state for now while we're working
  on adding Redux. This will have to be removed once it's done
  */
  state = {
    query: '',
  };

  setQuery = async (query) => {
    this.setState({ query });
  };

  render() {
    return (
      <Fragment>
        <Router>
          <BaseLayout>
            <Route path={BASE_URL} exact component={HomePage} />
            <Route
              path="/advanced-search"
              render={() => <AdvancedSearch {...this.state} setQuery={this.setQuery} />}
            />
            <Route path="/results" render={() => <UniProtKbResults {...this.state} />} />
          </BaseLayout>
        </Router>
      </Fragment>
    );
  }
}

export default App;
