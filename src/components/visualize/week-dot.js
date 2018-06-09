import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchEntriesWithQuery } from '../../actions';


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

  getModalTitle() {
    const { weekStr } = this.props;
    const m = moment(weekStr);
    const n = moment(weekStr).endOf('isoWeek');
    const startDate = m.format('MMMM D');
    let endDate;
    if (m.month() === n.month()) {
      endDate = n.format('D');
    } else {
      endDate = n.format('MMMM D');
    }
    return `${startDate} - ${endDate} // ${m.year()} week ${m.isoWeek()}`;
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    const startDate = this.props.weekStr;
    const endDate = moment(startDate).endOf('isoWeek').format('YYYY-MM-DD');
    this.props.fetchEntriesWithQuery(startDate, endDate, false);
    this.setState({ show: true });
  }

  render() {
    // calculate class name for dot
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
        <Modal 
          show={this.state.show}
          onHide={this.handleClose}
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.getModalTitle()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Weekly Entries
          </Modal.Body>
          <Modal.Body>
            Daily Entries
          </Modal.Body>
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

export default connect(mapStateToProps, { fetchEntriesWithQuery })(WeekDot);