// @flow
import React, { Fragment, Component } from 'react';
import withData from '../hoc/withData';

class ResultsTable extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    if (!data.results) {
      return null;
    }
    return (
      <Fragment>
        {data.results.map(d => (
          <div key={d.accession}>{d.accession}</div>
        ))}
      </Fragment>
    );
  }
}

export default withData(props => props.url)(ResultsTable);
