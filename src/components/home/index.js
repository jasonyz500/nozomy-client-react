import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Nav, NavItem, Button, Glyphicon } from 'react-bootstrap'
import moment from 'moment';
import _ from 'lodash';
import EntryContainer from './entry-container';
import { fetchWeek, addEntry } from '../../actions';

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
      weekStr: parsedQuery.week || getCurrentWeekStr(),
      selectedDay: parsedQuery.day || (moment().format('d')+6)%7
    };
  }

  componentDidMount() {
    this.props.fetchWeek(this.state.weekStr);
  }

  componentWillReceiveProps(props) {
    const parsedQuery = queryString.parse(props.location.search);
    this.setState({
      weekStr: parsedQuery.week || getCurrentWeekStr(),
      selectedDay: parsedQuery.day || (moment().format('d')+6)%7
    });
  }

  // componentDidUpdate(prevProps, prevState, prevContext) {
  //   this.populate(this.state.weekStr);
  // }

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

  drawEntryContainers(entries) {
    return _.map(entries, entry => {
      return (
        <EntryContainer 
          key={entry._id} 
          entry={entry}
        />
      );
    });
  }

  handleAddEntry(is_weekly, week_string, date_string, day_of_week_iso) {
    const entry = {
      user_id: 1,
      is_weekly: is_weekly,
      week_string: week_string,
      date_string: date_string,
      day_of_week_iso: day_of_week_iso
    };
    this.props.addEntry(entry);
  }

  handleSelectDay(selectedDay) {
    this.props.history.push({
      search: `?week=${this.state.weekStr}&day=${selectedDay}`
    });
    // this.setState({ selectedDay });
  }

  handleArrow(diff) {
    const newWeekStr = moment(this.state.weekStr).add(diff, 'days').format('YYYY-MM-DD');
    this.props.history.push({
      search: `?week=${newWeekStr}&day=${this.state.selectedDay}`
    });
    // this.setState({
    //   weekStr: moment(this.state.weekStr).add(diff, 'days').format('YYYY-MM-DD')
    // });
    this.props.fetchWeek(this.state.weekStr);
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
          {this.drawEntryContainers(week.daily[this.state.selectedDay])}
          <Button 
            onClick={() => this.handleAddEntry(false, this.state.weekStr, this.state.weekStr, this.state.selectedDay)}
          >
            Add New Entry <Glyphicon glyph="plus" />
          </Button>
          {this.drawEntryContainers(week.weekly)}
          <Button
            onClick={() => this.handleAddEntry(false, this.state.weekStr, null, null)}
          >
            Add New Entry <Glyphicon glyph="plus" />
          </Button>
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

export default connect(mapStateToProps, { fetchWeek, addEntry })(Home);