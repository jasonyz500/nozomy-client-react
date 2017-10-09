import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem } from 'react-bootstrap'
import moment from 'moment';
import _ from 'lodash';
import QuestionContainer from './question-container';
import { fetchWeek, updateResponse } from '../../actions';

import './home.css';

const queryString = require('query-string');

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
  constructor(props) {
    super(props);
    const parsedQuery = queryString.parse(props.location.search);
    this.state = { 
      weekStr: props.match.params.weekStr || getCurrentWeekStr(),
      selectedDay: parsedQuery.day || (moment().format('d')+6)%7
    };
  }

  componentDidMount() {
    this.populate(this.state.weekStr);
  }

  populate(weekStr) {
    this.props.fetchWeek(weekStr);
  }

  drawDayOfWeekTabs() {
    return _.map(_.range(7), i => {
      return (
        <NavItem key={days[i]} eventKey={i}>{days[i]}</NavItem>
      );
    });
  }

  handleSelectDay(selectedDay) {
    this.props.history.push({
      pathname: this.props.match.params.weekStr || getCurrentWeekStr(),
      search: `?day=${selectedDay}`
    });
    this.setState({ selectedDay });
  }

  drawQuestionContainers(responses) {
    const autosave = _.debounce((response, body) => {this.autosave(response, body)}, 300);

    return _.map(responses, response => {
      return (
        <QuestionContainer 
          key={response._id} 
          body={response.body}
          question={response.question}
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
    console.log(week);
    if (!week) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <Panel>
          <h5>Daily</h5>
          <Nav 
            bsStyle="tabs" 
            activeKey={this.state.selectedDay}
            justified 
            onSelect={this.handleSelectDay.bind(this)}
          >
            {this.drawDayOfWeekTabs()}
          </Nav>
          {this.drawQuestionContainers(week.daily_responses[this.state.selectedDay])}
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