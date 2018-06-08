import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import WeekDot from './week-dot';

import './visualize.css';

class Visualize extends Component {

  getWeekStringsOfYear() {
    const weeks = [];
    let i = moment().startOf('year').startOf('isoWeek');
    const endOfYear = moment().endOf('year');
    while(i.isBefore(endOfYear)) {
      weeks.push(i.format('YYYY-MM-DD'));
      i.add(1, 'week');
    }
    return weeks;
  }

  drawCurrentYearInQuarters() {
    const weeks = this.getWeekStringsOfYear();
    const chunkedWeeks = _.chunk(weeks, 13);
    return _.map(chunkedWeeks, quarter => {
      return (
        <div key={quarter} className="week-row">
          {
            _.map(quarter, weekStr => {
              return (
                <WeekDot
                  key={weekStr}
                  weekStr={weekStr}
                >
                </WeekDot>
              );
            })
          }
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>We are <span className="title-accent">here</span></h2>
        <div>
          {this.drawCurrentYearInQuarters()}
        </div>
      </div>
    );
  }
}

export default Visualize;