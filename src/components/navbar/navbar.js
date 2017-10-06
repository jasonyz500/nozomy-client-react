import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css';

const Navbar = () => (
  <header>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/visualize'>Visualize</Link>
      <Link to='/root'>Root</Link>
    </nav>
  </header>
)

export default Navbar