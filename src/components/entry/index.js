import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
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
        this.props.history.push('/');
      });
    } else {
      this.props.createEntry(entry, (_id) => {
        entry._id = _id;
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

  handleTimePeriodSelect(isWeekly) {
    let { entry } = this.props;
    entry.is_weekly = isWeekly;
    this.setState({});
  }

  handleDateSelect(date) {
    let { entry } = this.props;
    entry.date_string = date.format('YYYY-MM-DD');
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
    entry.tags.push(tag.text)
    this.setState({});
  }

  render() {
    let { entry } = this.props;
    return (
      <div>
        <DropdownButton
          bsStyle='primary'
          title={entry.is_weekly ? 'Weekly' : 'Daily'}
          id="timeRangePicker"
        >
          <MenuItem 
            eventKey="1" 
            active={!entry.is_weekly}
            onClick={() => this.handleTimePeriodSelect(false)}
          >
            Daily
          </MenuItem>
          <MenuItem
            eventKey="2"
            active={entry.is_weekly}
            onClick={() => this.handleTimePeriodSelect(true)}
          >
            Weekly
          </MenuItem>
        </DropdownButton>
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
          tags={_.map(entry.tags, (tag, idx)=>{return {id:`${idx}`, text:tag}})}
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
  // todo: new EntryModel() doesn't seem to be populating weekStr by default
  return { entry: entries[ownProps.match.params.id] || new EntryModel({}) };
}

export default connect(mapStateToProps, { fetchEntry, createEntry, updateEntry, deleteEntry })(Entry);