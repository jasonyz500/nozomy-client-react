import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateResponse } from '../actions';

class QuestionContainer extends Component {

  render() {
    return (
      <div className="form-group">
        <label></label>
        <textarea rows="7" className="form-control"></textarea>
      </div>
    );
  }
}

export default connect(null, { updateResponse } )(QuestionContainer);