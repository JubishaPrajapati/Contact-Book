import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Headercss.css';
import logo from "./logo.png";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className='navbar'>
            <div className='logo'>
                <img src={logo} alt='logo' className='image' />
                <Link to="/dashboard">ContactBook</Link>
            </div>
            <button onClick={handleLogout} className='auth-button'>Logout</button>
        </header>
    )
}
export default Header;
