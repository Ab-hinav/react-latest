import {useState} from 'react';
import BookEdit from './BookEdit';
import useBooksContext from '../hooks/use-books-context';



function BookShow({book}){

    const {deleteBookById} = useBooksContext()
    const [isEditing,setIsEditing] = useState(false);

    const handleDelete = () => {
        deleteBookById(book.id);
    }

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleSubmit = (id, title) => {
        
        setIsEditing(false);
    };

    return <div className="book-show">
       
        <div className="actions">
            <button className="edit" onClick={handleEdit}></button>
            <button className="delete" onClick={handleDelete}></button>
        </div>
        
        <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="book cover"/>
        {isEditing && <BookEdit book={book} onEdit={handleSubmit} ></BookEdit>}
        {!isEditing &&  <h3>{book.title}</h3>}
        <button className="button is-primary" >Add to cart</button>
    </div>

}

export default BookShow;