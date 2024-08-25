import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookCreate() {

    const [title, setTitle] = useState('');
    const { createBook } = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        setTitle('');
    };

    return (
        <div className="book-create">
            <h3>Add A book</h3>
            <form onSubmit={handleSubmit}>
                <input className="input" value={title} onChange={handleChange}></input>
                <button className="button">Create!</button>
            </form>
        </div>
    );
}

export default BookCreate;
