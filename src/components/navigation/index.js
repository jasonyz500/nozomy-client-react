import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// import './navigation.css';

const Navigation = () => (
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
  </Navbar>
)

export default Navigation