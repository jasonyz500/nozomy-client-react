import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'
import { createEntry, updateEntry } from '../../actions';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: props.entry
    }
  }

  onTextChange(fieldName, newContent) {
    const { entry } = this.state;
    entry[fieldName] = newContent;
    this.setState({ entry });
  }

  handleSave() {
    const { entry } = this.state;
    if (entry._id) {
      this.props.updateEntry(entry);
      console.log('successfully saved entry with id ' + entry._id);
    } else {
      this.props.createEntry(entry, (_id) => {
        entry._id = _id;
        this.setState({ entry });
        console.log('successfully created entry with id ', _id);
      });
    }
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
          placeholder="body"
          onChange={event => this.onTextChange("body", event.target.value)}
        >
          {this.state.entry.body}
        </textarea>
        <Button type="submit" className="btn btn-success" onClick={this.handleSave.bind(this)}>Save</Button>
      </div>
    );
  }
}

export default connect(null, { createEntry, updateEntry })(Entry);