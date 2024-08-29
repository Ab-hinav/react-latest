import { createContext, useState, useCallback } from 'react';
import { getAllBooksDb, createBookDb, deleteBookDb, editBookDb } from '../utils';

const BooksContext = createContext();


function Provider({ children }) {

    const [books, setBooks] = useState([]);

    const createBook = (title) => {
        const id = Math.floor(Math.random(5) * 1000);

        createBookDb(title, id).then((data) => {
            console.log(data);
            const updatedBooks = [...books, { id: id, title }];
            setBooks(updatedBooks);
        });
    };

    const fetchBooks = useCallback(async () => {
        const data = await getAllBooksDb();
        setBooks(data);
    }, []);

    const deleteBookById = (id) => {

        deleteBookDb(id).then((data) => {

            const updatedBooks = books.filter((book) => book.id !== id);
            setBooks(updatedBooks);
            console.log(id);
        });
    };

    const editBookById = (id, title) => {
        editBookDb(id, title).then((data) => {
            console.log(data);

            const updatedBooks = books.map((book) => {
                if (book.id === id) {
                    return { ...data };
                }
                return book;
            });
            setBooks(updatedBooks);
        });
    };

    let value = { books, fetchBooks, createBook, deleteBookById, editBookById };

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    )


}


export { Provider };
export default BooksContext;