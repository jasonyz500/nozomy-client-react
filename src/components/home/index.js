import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem } from 'react-bootstrap'
import moment from 'moment';
import _ from 'lodash';
import { fetchWeek } from '../../actions';

import './home.css';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

class Home extends Component {
  componentDidMount() {
    const weekStr = this.props.match.params.weekStr || getCurrentWeekStr();
    this.populate(weekStr);
  }

  populate(weekStr) {
    this.props.fetchWeek(weekStr);
  }

  drawDayOfWeekTabs() {
    return _.map(_.range(7), i => {
      return (
        <NavItem key={days[i]}>{days[i]}</NavItem>
      );
    });
  }

  handleSelectDay() {

  }

  render() {
    const { week } = this.props;
    if (!week) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <Panel>
          <h5>Daily</h5>
          <Nav bsStyle="tabs" onSelect={this.handleSelectDay}>
            {this.drawDayOfWeekTabs()}
          </Nav>
        </Panel>
        <Panel>
          <h5>Weekly</h5>
          <textarea rows="7"></textarea>
        </Panel>
      </div>
    );
  }
}

function getCurrentWeekStr() {
  return moment().startOf('isoWeek').format('YYYY-MM-DD');
}

function mapStateToProps({ weeks }, ownProps) {
  const weekStr = ownProps.match.params.weekStr || getCurrentWeekStr();
  return { week: weeks[weekStr] };
}

export default connect(mapStateToProps, { fetchWeek })(Home);