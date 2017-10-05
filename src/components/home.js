import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeek } from '../actions';

import moment from 'moment';

class Home extends Component {
  componentDidMount() {
    this.populate(moment());
  }

  populate(dateMoment) {
    let thisWeek = dateMoment.clone().startOf('isoWeek').format('YYYY-MM-DD');
    this.props.fetchWeek(thisWeek);
  }

  render() {
    return (
      <div className="well">
        Home~
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { week: state.week };
}

export default connect(mapStateToProps, { fetchWeek })(Home);