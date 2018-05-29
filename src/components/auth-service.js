import decode from 'jwt-decode';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class AuthService {

  isLoggedIn() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login(authToken, path) {
    localStorage.setItem('auth_token', authToken);
    history.replace(`/${path}`);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
    history.replace('/login');
  }
}