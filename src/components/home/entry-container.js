import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEntry } from '../../actions';

class EntryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry
    }
  }

  onTextChange(fieldName, newContent) {
    const entry = this.state.entry;
    entry[fieldName] = newContent;
    this.setState({ entry });
  }

  render() {
    return (
      <div className="form-group">
        <textarea
          rows="2"
          className="form-control"
          placeholder="headline"
          onChange={event => this.onTextChange("headline", event.target.value)}
        >
          {this.state.entry.headline}
        </textarea>
        <input
          placeholder="add some tags..."
        />
        <textarea
          rows="7"
          className="form-control"
          placeholder="why was it significant? how did it make you feel?"
          onChange={event => this.onTextChange("body", event.target.value)}
        >
          {this.state.entry.body}
        </textarea>
      </div>
    );
  }
}

export default connect(null, { updateEntry })(EntryContainer);