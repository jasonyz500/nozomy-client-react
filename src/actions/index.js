import axios from 'axios';

export const FETCH_WEEK = 'fetch_week';

const ROOT_URL = 'http://localhost:3000';

export function fetchWeek(weekStr) {
  const request = axios.get(`${ROOT_URL}/week/${weekStr}`);

  return {
    type: FETCH_WEEK,
    payload: request
  }
}