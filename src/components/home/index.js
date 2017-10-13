import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'
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

  componentWillReceiveProps(props) {
    const parsedQuery = queryString.parse(props.location.search);
    this.setState({
      weekStr: props.match.params.weekStr || getCurrentWeekStr(),
      selectedDay: parsedQuery.day || (moment().format('d')+6)%7
    });
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    this.populate(this.state.weekStr);
  }

  populate(weekStr) {
    this.props.fetchWeek(weekStr);
  }

  getPageTitle() {
    const { weekStr } = this.state;
    const endMonth = moment(weekStr).endOf('isoWeek').month();
    const suffix = endMonth === moment(weekStr).month() ? '' : moment().month(endMonth).format('MMMM');
    const prefix = moment().startOf('isoWeek').format('YYYY-MM-DD') === weekStr ? 'This Week: ' : '';
    const weekNo = moment(weekStr).startOf('isoWeek').week();
    const year = weekStr.slice(0,4);
    return `${prefix}${moment(weekStr).format('MMMM Do')} - ${suffix} ${moment(weekStr).endOf('isoWeek').format('Do')} (${year} Week ${weekNo})`;
  }

  drawDayOfWeekTabs() {
    return _.map(_.range(7), i => {
      return (
        <NavItem key={days[i]} eventKey={i}>{days[i]}</NavItem>
      );
    });
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

  handleSelectDay(selectedDay) {
    this.props.history.push({
      pathname: this.props.match.params.weekStr || getCurrentWeekStr(),
      search: `?day=${selectedDay}`
    });
    this.setState({ selectedDay });
  }

  handleArrow(diff) {
    this.props.history.push({
      pathname: moment(this.state.weekStr).add(diff, 'days').format('YYYY-MM-DD'),
      search: `?day=${this.state.selectedDay}`
    });
    this.setState({
      weekStr: moment(this.state.weekStr).add(diff, 'days').format('YYYY-MM-DD')
    })
    this.populate(this.state.weekStr)
  }

  autosave(response, body) {
    response.body = body;
    response.last_save_time = moment().unix();
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
          <Button onClick={() => {this.handleArrow(-7)}}><Glyphicon glyph="arrow-left" /> Previous Week</Button>
          <h1>{this.getPageTitle()}</h1>
          <Button onClick={() => {this.handleArrow(7)}}>Next Week <Glyphicon glyph="arrow-right" /></Button>
        </Panel>
        <Panel>
          <Nav 
            bsStyle="tabs" 
            activeKey={this.state.selectedDay}
            justified 
            onSelect={this.handleSelectDay.bind(this)}
          >
            {this.drawDayOfWeekTabs()}
          </Nav>
          {this.drawQuestionContainers(week.daily_responses[this.state.selectedDay])}
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