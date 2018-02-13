import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

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
                <span key={weekStr} className="dot">
                </span>
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
        <h3>We are here</h3>
        <div>
          {this.drawCurrentYearInQuarters()}
        </div>
      </div>
    );
  }
}

export default Visualize;