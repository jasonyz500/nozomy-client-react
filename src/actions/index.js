import axios from 'axios';

export const SELECT_WEEK = 'select_week';
export const FETCH_WEEK = 'fetch_week';
export const UPDATE_RESPONSE = 'update_response';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function selectWeek(weekStr) {
  return {
    type: SELECT_WEEK,
    payload: weekStr
  }
}

export function fetchWeek(weekStr) {
  const request = axios.get(`${ROOT_URL}/week/${weekStr}`);

  return {
    type: FETCH_WEEK,
    payload: request
  }
}

export function updateResponse(response) {
  const request = axios.patch(`${ROOT_URL}/responses/${response._id}`, JSON.stringify(response), CONFIG);

  return {
    type: UPDATE_RESPONSE,
    payload: request
  }
}