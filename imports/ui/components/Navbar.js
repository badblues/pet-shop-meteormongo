import React from 'react'
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css'


const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Link to="/">PETSHOP</Link>
      <Link to="/breeds">
        BREEDS
      </Link>
      <Link to="/clients">
        CLIENTS
      </Link>
      <LogoutButton/>
    </div>
  )
}

export default Navbar