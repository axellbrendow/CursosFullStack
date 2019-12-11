import React, { useContext, useReducer } from 'react'
import { BookContext } from '../../contexts/BookContext'

const BookDetails = ({book}) => {
    const {dispatchBooks} = useContext(BookContext);

    return (
        <li onClick={() => dispatchBooks({type: 'REMOVE_BOOK', id: book.id})}>
            <div className="title">{book.title}</div>
            <div className="author">{book.author}</div>
        </li>
    );
    /* const {removeBook} = useContext(BookContext);

    return (
        <li onClick={() => removeBook(book.id)}>
            <div className="title">{book.title}</div>
            <div className="author">{book.author}</div>
        </li>
    ); */
}

export default BookDetails
