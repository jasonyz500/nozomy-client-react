import axios from 'axios';

export const LOGIN = 'login';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export async function login(email, password, callback) {
  const request = await axios.post(`${ROOT_URL}/login`, { email, password }, CONFIG);
  callback(request);

  return {
    type: LOGIN,
    payload: request
  }
}