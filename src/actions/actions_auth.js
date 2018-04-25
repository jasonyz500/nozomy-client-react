import axios from 'axios';

export const LOGIN = 'login';
export const AUTH_ERROR = 'auth_error';

const ROOT_URL = 'http://localhost:3000';
const CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export async function login(email, password) {
  try {
    const request = await axios.post(`${ROOT_URL}/login`, { email, password }, CONFIG);
    return {
      type: LOGIN,
      payload: request
    }
  } catch (error) {
    return {
      type: AUTH_ERROR,
      payload: 'Invalid email or password'
    }
  }
}