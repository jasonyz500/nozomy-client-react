import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import './visualize.css';

class WeekDot extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  // componentDidMount() {
  //   const { weekStr } = this.props;
  // }

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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
      <div>
        <span 
          className={classNames}
          onClick={this.handleShow}
        >
        </span>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ week }, ownProps) {
  return {};
}

export default connect(mapStateToProps)(WeekDot);