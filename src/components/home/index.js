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

function mapStateToProps(state) {
    console.log(state);
  return { entries: state.entries };
}

export default connect(mapStateToProps, { fetchAll })(Home);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Panel, Tabs, Tab, Button, Glyphicon } from 'react-bootstrap'
// import moment from 'moment';
// import _ from 'lodash';
// import EntryContainer from './entry-container';
// import { fetchWeek, addEntry } from '../../actions';

// import './home.css';

// const queryString = require('query-string');

// const days = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday'
// ];

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     const parsedQuery = queryString.parse(props.location.search);
//     this.state = {
//       weekStr: parsedQuery.week || getCurrentWeekStr(),
//       selectedDay: parseInt(parsedQuery.day, 10) || moment().isoWeekday()
//     };
//   }

//   componentDidMount() {
//     this.props.fetchWeek(this.state.weekStr);
//   }

//   componentWillReceiveProps(props) {
//     const parsedQuery = queryString.parse(props.location.search);
//     this.setState({
//       weekStr: parsedQuery.week || getCurrentWeekStr(),
//       selectedDay: parseInt(parsedQuery.day, 10) || moment().isoWeekday()
//     });
//   }

//   getPageTitle() {
//     const { weekStr } = this.state;
//     const endMonth = moment(weekStr).endOf('isoWeek').month();
//     const suffix = endMonth === moment(weekStr).month() ? '' : moment().month(endMonth).format('MMMM');
//     const prefix = moment().startOf('isoWeek').format('YYYY-MM-DD') === weekStr ? 'This Week: ' : '';
//     const weekNo = moment(weekStr).startOf('isoWeek').week();
//     const year = weekStr.slice(0,4);
//     return `${prefix}${moment(weekStr).format('MMMM Do')} - ${suffix} ${moment(weekStr).endOf('isoWeek').format('Do')} (${year} Week ${weekNo})`;
//   }

//   drawDayOfWeekTabs() {
//     return _.map(_.range(1, 8), i => {
//       return (
//         <Tab key={i} eventKey={i} title={days[i-1]}></Tab>
//       );
//     });
//   }

//   drawEntryContainers(entries) {
//     return _.map(_.range((entries || []).length), i => {
//       return (
//         <EntryContainer 
//           key={entries[i]._id || i}
//           entry={entries[i]}
//         />
//       );
//     });
//   }

//   handleAddEntry(is_weekly, week_string, date_string, day_of_week_iso) {
//     const entry = {
//       user_id: 1,
//       is_weekly: is_weekly,
//       week_string: week_string,
//       date_string: date_string,
//       day_of_week_iso: day_of_week_iso
//     };
//     this.props.addEntry(entry);
//   }

//   handleSelectDay(selectedDay) {
//     this.props.history.push({
//       search: `?week=${this.state.weekStr}&day=${selectedDay}`
//     });
//   }

//   handleArrow(diff) {
//     const newWeekStr = moment(this.state.weekStr).add(diff, 'days').format('YYYY-MM-DD');
//     this.props.history.push({
//       search: `?week=${newWeekStr}&day=${this.state.selectedDay}`
//     });
//     this.props.fetchWeek(this.state.weekStr);
//   }

//   render() {
//     const { week } = this.props;
//     if (!week) {
//       return (<div>Loading...</div>);
//     }

//     return (
//       <div>
//         <Button onClick={() => this.handleArrow(-7)}><Glyphicon glyph="arrow-left" /> Previous Week</Button>
//         <h1 className='page-title'>{this.getPageTitle()}</h1>
//         <Button onClick={() => {this.handleArrow(7)}}>Next Week <Glyphicon glyph="arrow-right" /></Button>
//         <Panel>
//           <Tabs 
//             id="controlled-tab-example"
//             activeKey={this.state.selectedDay}
//             justified 
//             onSelect={this.handleSelectDay.bind(this)}
//           >
//             {this.drawDayOfWeekTabs()}
//           </Tabs>
//           {this.drawEntryContainers(week.daily[this.state.selectedDay])}
//           <Button 
//             onClick={() => this.handleAddEntry(false, this.state.weekStr, moment(this.state.weekStr).add(this.state.selectedDay-1, 'days').format('YYYY-MM-DD'), this.state.selectedDay)}
//           >
//             Add New Entry For Today <Glyphicon glyph="plus" />
//           </Button>
//           {this.drawEntryContainers(week.weekly)}
//           <Button
//             onClick={() => this.handleAddEntry(true, this.state.weekStr, null, null)}
//           >
//             Add New Entry For This Week <Glyphicon glyph="plus" />
//           </Button>
//         </Panel>
//       </div>
//     );
//   }
// }

// function getCurrentWeekStr() {
//   return moment().startOf('isoWeek').format('YYYY-MM-DD');
// }

// function mapStateToProps({ entries }, ownProps) {
//   const parsedQuery = queryString.parse(ownProps.location.search);
//   const weekStr = parsedQuery.week || getCurrentWeekStr();
//   return { week: entries[weekStr] };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchWeek: fetchWeek, addEntry: addEntry}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);