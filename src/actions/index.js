import axios from 'axios';

export const FETCH_WEEK = 'fetch_week';
export const UPDATE_ENTRY = 'update_entry';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function fetchWeek(weekStr) {
  const request = axios.get(`${ROOT_URL}/week/${weekStr}`);

  return {
    type: FETCH_WEEK,
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