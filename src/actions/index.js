import axios from 'axios';

export const FETCH_ALL = 'fetch_all';
export const FETCH_ENTRY = 'fetch_entry';
export const CREATE_ENTRY = 'create_entry';
export const UPDATE_ENTRY = 'update_entry';
export const DELETE_ENTRY = 'delete_entry';
// export const FETCH_WEEK = 'fetch_week';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function fetchAll() {
  const request = axios.get(`${ROOT_URL}/entries/all`);

  return {
    type: FETCH_ALL,
    payload: request
  }
}

export function fetchEntry(_id) {
  const request = axios.get(`${ROOT_URL}/entries/${_id}`);

  return {
    type: FETCH_ENTRY,
    payload: request
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

// export function fetchWeek(weekStr) {
//   const request = axios.get(`${ROOT_URL}/entries/week/${weekStr}`);

//   return {
//     type: FETCH_WEEK,
//     payload: request
//   }
// }
