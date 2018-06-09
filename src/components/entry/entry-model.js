import moment from 'moment';

export class EntryModel {
  constructor(data) {
    this.headline = data.headline || '';
    this.tags = data.tags || [];
    this.body = data.body || '';
    this.date_string = data.date_string || moment().format('YYYY-MM-DD');
    this.week_string = data.week_string || moment().startOf('isoWeek').format('YYYY-MM-DD');
    this.day_of_week_iso = data.day_of_week_iso || moment().isoWeekday();
    this.is_weekly = data.is_weekly || false;
    this._id = data._id;
  }
}