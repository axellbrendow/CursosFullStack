import React, { useContext } from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);
    const { isLightTheme, light, dark, toggleTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const navStyle = {
        background: theme.navBg,
        color: theme.textColor
    };
    
    return (
        <nav className="Navbar" style={navStyle}>
            <h1>Context App</h1>
            <div onClick={toggleAuth}>
                {isAuthenticated ? 'Logged in' : 'Logged out'}
            </div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li onClick={toggleTheme}>Change Theme</li>
            </ul>
        </nav>
    );
};

export default Navbar;
