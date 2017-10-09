import React, { Component } from 'react';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.body
    }
  }

  onInputChange(body) {
    this.setState({body});
    this.props.onChange(body);
  }

  render() {
    return (
      <div className="form-group">
        <label></label>
        <textarea rows="7" className="form-control" onChange={event => this.onInputChange(event.target.value)}>
          {this.state.body}
        </textarea>
      </div>
    );
  }
}

export default QuestionContainer;