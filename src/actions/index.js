import axios from 'axios';

export const FETCH_WEEK = 'fetch_week';
export const ADD_ENTRY = 'add_entry';
export const CREATE_ENTRY = 'create_entry';
export const UPDATE_ENTRY = 'update_entry';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function fetchWeek(weekStr) {
  const request = axios.get(`${ROOT_URL}/entries/week/${weekStr}`);

  return {
    type: FETCH_WEEK,
    payload: request
  }
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry: entry
  }
}

export function createEntry(entry, callback) {
  const request = axios.post(`${ROOT_URL}/entries/new`, JSON.stringify(entry), CONFIG).then((resp) => callback(resp.data));

  return {
    type: CREATE_ENTRY,
    payload: request
  }
}

export function updateEntry(entry) {
  const request = axios.patch(`${ROOT_URL}/entries/${entry._id}`, JSON.stringify(entry), CONFIG);

  return {
    type: UPDATE_ENTRY,
    payload: request
  }
}