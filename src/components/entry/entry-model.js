export class EntryModel {
  constructor(data) {
    this.tags = data.tags || [];
    this.headline = data.headline || '';
    this.body = data.body || '';
    this._id = data._id;
  }
}