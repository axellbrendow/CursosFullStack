import React, { useContext } from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';
import { BookContext } from '../../contexts/BookContext';

const BookList = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const { books } = useContext(BookContext);
    const theme = isLightTheme ? light : dark;
    const bookListStyle = {
        background: theme.bookListBg,
        color: theme.textColor
    };
    const itemsStyle = { background: theme.navBg }
    
    return (
        <div className="BookList" style={bookListStyle}>
            <ul>
                {books.map((book) => <li key={book.id} style={itemsStyle}>{book.title}</li>)}
            </ul>
        </div>
    );
}

export default BookList;
