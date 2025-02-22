import React from 'react'
import './Footer.css'
import logo from '../../assets/images/logo.png'
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
            <div className="col">
                <div className="name">
                    <img src={logo} alt="" />
                    ShetNiyojan</div>
                <p className="desc">
                </p>
                <div className="links">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Home</a></li>
                    </ul>
                </div>

            </div>
            <div className="credits">
            &copy; 2025 KrushYantra. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer