import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap'

import { EntryModel } from './entry-model';
import { createEntry, updateEntry } from '../../actions';

class Entry extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    // this.props.fetchEntry(id);
  }

  onTextChange(fieldName, newContent) {
    const { entry } = this.props;
    entry[fieldName] = newContent;
  }

  handleSave() {
    const { entry } = this.props;
    if (entry._id) {
      this.props.updateEntry(entry);
      console.log('successfully saved entry with id ' + entry._id);
    } else {
      this.props.createEntry(entry, (_id) => {
        entry._id = _id;
        console.log('successfully created entry with id ', _id);
      });
    }
  }

  render() {
    let { entry } = this.props;
    return (
      <div className="form-group">
        <textarea
          rows="2"
          className="form-control"
          placeholder="headline"
          onChange={event => this.onTextChange("headline", event.target.value)}
        >
          {entry.headline}
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
          {entry.body}
        </textarea>
        <Button type="submit" className="btn btn-success" onClick={this.handleSave.bind(this)}>Save</Button>
      </div>
    );
  }
}

function mapStateToProps({ entries }, ownProps) {
  return { entry: entries[ownProps.match.params.id] || new EntryModel({}) };
}

export default connect(mapStateToProps, { createEntry, updateEntry })(Entry);