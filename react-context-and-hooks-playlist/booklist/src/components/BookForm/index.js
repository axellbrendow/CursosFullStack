import React, { useContext, useState } from 'react'
import { BookContext } from '../../contexts/BookContext'

const BookForm = () => {
    const { addBook } = useContext(BookContext);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && author)
        {
            addBook(title, author);
            setTitle('');
            setAuthor('');
        }
    };

    return (
        <div className="BookForm">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="book title" value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                
                <input type="text" placeholder="author" value={author}
                        onChange={(e) => setAuthor(e.target.value)}/>

                <input type="submit" value="add book"/>
            </form>
        </div>
    )
}

export default BookForm
