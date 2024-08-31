import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onEdit }) {
    const [title, setTitle] = useState(book.title);

    const { editBookById } = useBooksContext();

    const handleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onEdit();
        editBookById(book.id, title);
        setTitle('');
    };

    return (

        <form className="book-edit" onSubmit={handleSubmit}>
            <h3 className="title">Edit book</h3>
            <input className="input" value={title} onChange={handleChange}></input>
            <button className="button" type="submit">Save</button>
        </form>

    );
}

export default BookEdit;
