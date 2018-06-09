import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll } from '../../actions';

class Home extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  renderEntries() {
    return _.map(this.props.entries, entry => {
      return (
        <li key={entry._id}>
          <Link to={`/entries/${entry._id}`}>{entry.headline}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <Link className="btn btn-primary" to="/entries/new">
          Add an entry
        </Link>
        <h3>Entries</h3>
        <ul>
          {this.renderEntries()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ entries }) {
  return { entries };
}

export default connect(mapStateToProps, { fetchAll })(Home);