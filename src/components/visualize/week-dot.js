import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import './visualize.css';

class WeekDot extends Component {
  componentDidMount() {
    const { weekStr } = this.props;
  }

  getTitleFromWeekStr(weekStr) {
    const m = moment(weekStr);
    const startDate = `${m.month()} ${m.date()}`;
    const n = m.endOf('isoWeek');
    const endDate = `${m.month() === n.month() ? '' : n.month() + ' '}${n.date()}`;
    return {
      year: m.year(),
      weekNo: m.isoWeekYear(),
      displayWeek: `${startDate} - ${endDate}`
    }
  }

  render() {
    let weekClassName;
    const m = moment(this.props.weekStr);

    if (m.isBefore(moment().startOf('isoWeek'))) {
      weekClassName = 'past-week';
    } else if (m.isSame(moment().startOf('isoWeek'))) {
      weekClassName = 'current-week';
    } else {
      weekClassName = 'future-week';
    }

    const classNames = `dot ${weekClassName}`;
    return (
      <span 
        className={classNames}
      >  
      </span>
    );
  }
}

function mapStateToProps({ week }, ownProps) {
  return {};
}

export default connect(mapStateToProps)(WeekDot);