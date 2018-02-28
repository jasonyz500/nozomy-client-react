import axios from 'axios';

export const LOGIN = 'login';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function login(email, password, callback) {
  const request = axios.post(`${ROOT_URL}/login`, { email, password }, CONFIG).then((resp) => callback(resp));

  return {
    type: LOGIN,
    payload: request
  }
}