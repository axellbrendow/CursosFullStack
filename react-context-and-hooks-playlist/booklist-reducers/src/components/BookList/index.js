import React, { useContext } from 'react';
import { BookContext } from '../../contexts/BookContext';
import BookDetails from '../BookDetails/index';

const BookList = () => {
    const { books } = useContext(BookContext);

    return (
        <div className="BookList">
            {
                books.length ?
                <div className="BookList">
                    <ul>
                        { books.map((book) => <BookDetails book={book} key={book.id}/>) }
                    </ul>
                </div> :

                <div className="empty">No books to read. Hello free time :)</div>
            }
        </div>
    )
}

export default BookList
