import React from 'react'
import './Navbar.css'
import logo from '../../assets/images/logo.png'
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
        ShetNiyojan
      </div>
      <nav className="links">
        <ul>
          <li><a href="#"><IoMdHome />
          </a></li>
          <li><a href="#"><FaUser /></a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar