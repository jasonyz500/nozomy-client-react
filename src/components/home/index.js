import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem } from 'react-bootstrap'
import moment from 'moment';
import _ from 'lodash';
import QuestionContainer from './question-container';
import { fetchWeek, updateResponse } from '../../actions';

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

  drawQuestionContainers(responses) {
    const autosave = _.debounce((response, body) => {this.autosave(response, body)}, 300);

    return _.map(responses, response => {
      return (
        <QuestionContainer 
          key={response._id} 
          body={response.body}
          onChange={ (body) => autosave(response, body) }
        />
      );
    });
  }

  autosave(response, body) {
    response.body = body;
    response.last_save_time = moment().unix();
    console.log(response);
    this.props.updateResponse(response);
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
          {this.drawQuestionContainers(week.weekly_responses)}
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

export default connect(mapStateToProps, { fetchWeek, updateResponse })(Home);