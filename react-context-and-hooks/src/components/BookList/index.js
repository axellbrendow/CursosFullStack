import React, { useContext } from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';

const BookList = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const bookListStyle = {
        background: theme.bookListBg,
        color: theme.textColor
    };
    const itemsStyle = { background: theme.navBg }
    
    return (
        <div className="BookList" style={bookListStyle}>
            <ul>
                <li style={itemsStyle}>The way of kings</li>
                <li style={itemsStyle}>The name of the wind</li>
                <li style={itemsStyle}>The final empire</li>
            </ul>
        </div>
    );
}

export default BookList;
