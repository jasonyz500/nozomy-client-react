import axios from 'axios';

export const FETCH_ALL = 'fetch_all';
export const FETCH_ENTRY = 'fetch_entry';
export const CREATE_ENTRY = 'create_entry';
export const UPDATE_ENTRY = 'update_entry';
export const DELETE_ENTRY = 'delete_entry';
// export const FETCH_WEEK = 'fetch_week';

const ROOT_URL = 'http://localhost:3000';

function getConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${localStorage.getItem('auth_token')}`
    }
  }
}

export function fetchAll() {
  const request = axios.get(`${ROOT_URL}/entries/all`, getConfig());

  return {
    type: FETCH_ALL,
    payload: request
  }
}

export function fetchEntry(_id) {
  const request = axios.get(`${ROOT_URL}/entries/${_id}`, getConfig());

  return {
    type: FETCH_ENTRY,
    payload: request
  }
}

export function createEntry(entry, callback) {
  const request = axios.post(`${ROOT_URL}/entries/new`, JSON.stringify(entry), getConfig()).then((resp) => callback(resp.data));

  return {
    type: CREATE_ENTRY,
    payload: request
  }
}

export function updateEntry(entry, callback) {
  const request = axios.patch(`${ROOT_URL}/entries/${entry._id}`, JSON.stringify(entry), getConfig()).then((resp) => callback());

  return {
    type: UPDATE_ENTRY,
    payload: request
  }
}

export function deleteEntry(_id, callback) {
  const request = axios.delete(`${ROOT_URL}/entries/${_id}`, getConfig()).then(() => callback());

  return {
    type: DELETE_ENTRY,
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
