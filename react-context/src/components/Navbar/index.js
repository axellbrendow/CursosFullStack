import React, { Component } from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

export default class Navbar extends Component {
    // static contextType = ThemeContext;

    render() {
        return (
            <AuthContext.Consumer>{ (authContext) => (
                <ThemeContext.Consumer>{ (themeContext) => {
                    const { isAuthenticated, toggleAuth } = authContext;
                    const { isLightTheme, light, dark, toggleTheme } = themeContext;
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
                }}
                </ThemeContext.Consumer>
            )}
            </AuthContext.Consumer>
        );
    }
}
