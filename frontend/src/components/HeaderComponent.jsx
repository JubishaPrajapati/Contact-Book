import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Headercss.css';
import logo from "./logo.png";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    }
    const userName = localStorage.getItem('userName');
    return (
        <header className='navbar'>
            <div className='logo'>
                <img src={logo} alt='logo' className='image' />
                <Link to="/dashboard">ContactBook</Link>
            </div>
            {userName && <span className="user-name">Hello, {userName}</span>}
            <button onClick={handleLogout} className='auth-button'>Logout</button>
        </header>
    )
}
export default Header;
