import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <NavLink to="/"><h1>Good To Go</h1></NavLink>
        </header>
    )
}

export default Header;