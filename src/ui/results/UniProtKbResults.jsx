// @flow
import React, { Component } from 'react';

import ResultsTable from './ResultsTable';
import urls from '../apiUrls';

class UniProtKbResults extends Component {
  render() {
    const { query } = this.props;
    console.log(query);
    return <ResultsTable url={`${urls.uniprot_kb_search}?query=${query}`} />;
  }
}

export default UniProtKbResults;
