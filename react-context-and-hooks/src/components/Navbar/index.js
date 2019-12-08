import React, { Component } from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';

export default class Navbar extends Component {
    // static contextType = ThemeContext;

    render() {
        return (
            <ThemeContext.Consumer>{ (context) => {
                const { isLightTheme, light, dark, toggleTheme } = context;
                const theme = isLightTheme ? light : dark;
                const navStyle = {
                    background: theme.navBg,
                    color: theme.textColor
                };
                
                return (
                    <nav className="Navbar" style={navStyle}>
                        <h1>Context App</h1>
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Contact</li>
                            <li onClick={toggleTheme}>Change Theme</li>
                        </ul>
                    </nav>
                );
            } }
            </ThemeContext.Consumer>
        );
    }
}
