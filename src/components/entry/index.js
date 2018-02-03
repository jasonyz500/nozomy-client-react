import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';
import './react-tags.css';

import { EntryModel } from './entry-model';
import { fetchEntry, createEntry, updateEntry, deleteEntry } from '../../actions';

class Entry extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchEntry(id);
    }
  }

  onTextChange(fieldName, newContent) {
    const { entry } = this.props;
    entry[fieldName] = newContent;
    this.setState({});
  }

  handleSave() {
    const { entry } = this.props;
    if (entry._id) {
      this.props.updateEntry(entry, () => {
        console.log('successfully saved entry with id ' + entry._id);
        this.props.history.push('/');
      });
    } else {
      this.props.createEntry(entry, (_id) => {
        entry._id = _id;
        console.log('successfully created entry with id ', _id);
        this.props.history.push('/');
      });
    }
  }

  handleDelete() {
    const { entry } = this.props;
    if (entry._id) {
      this.props.deleteEntry(entry._id, () => {
          this.props.history.push('/');
        }
      )
    } else {
      this.props.history.push('/');
    }
  }

  handleDateSelect(date) {
    let { entry } = this.props;
    entry.date_string = date.format('YYYY-MM-DD');
    console.log(entry);
    this.setState({});
  }

  handleDeleteTag(i) {
    let { entry } = this.props;
    let tags = entry.tags;
    tags.splice(i, 1);
    entry.tags = tags;
    this.setState({});
  }

  handleAdditionTag(tag) {
    let { entry } = this.props;
    entry.tags.push(tag)
    this.setState({});
  }

  render() {
    let { entry } = this.props;
    return (
      <div className="form-group">
        <DatePicker
          selected={moment(entry.date_string) || moment()}
          onChange={this.handleDateSelect.bind(this)}
        />
        <textarea
          rows="2"
          className="form-control"
          placeholder="headline"
          onChange={event => this.onTextChange("headline", event.target.value)}
          value={entry.headline}
        >
        </textarea>
        <ReactTags
          tags={_.map(entry.tags, (tag, idx)=>{return {id:idx, text:tag}})}
          handleDelete={this.handleDeleteTag.bind(this)}
          handleAddition={this.handleAdditionTag.bind(this)}
        />
        <textarea
          rows="7"
          className="form-control"
          placeholder="body"
          onChange={event => this.onTextChange("body", event.target.value)}
          value={entry.body}
        >
        </textarea>
        <Button type="submit" className="btn btn-success" onClick={this.handleSave.bind(this)}>Save</Button>
        <Button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</Button>
      </div>
    );
  }
}

function mapStateToProps({ entries }, ownProps) {
  return { entry: entries[ownProps.match.params.id] || new EntryModel({}) };
}

export default connect(mapStateToProps, { fetchEntry, createEntry, updateEntry, deleteEntry })(Entry);