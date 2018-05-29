import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AuthService from '../auth-service';
// import './navigation.css';

class Navigation extends Component {
  handleLogout() {
    AuthService.logout();
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>nozomy</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills">
          <NavItem href='/'>Home</NavItem>
          <NavItem href='/visualize'>Visualize</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title={(localStorage.getItem('name') || '').split(' ')[0]} id="user-dropdown">
            <MenuItem>Profile</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
export default Navigation