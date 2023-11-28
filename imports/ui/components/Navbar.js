import React from 'react'
import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';


const Navbar = () => {
  return (
    <div>
      <Link to="/">PETSHOP</Link>
      <Link to="/breeds">
        Breeds
      </Link>
      <LogoutButton/>
    </div>
  )
}

export default Navbar