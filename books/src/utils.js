
import axios from 'axios';

export const getAllBooksDb = async () =>{
    const response = await axios.get('http://localhost:3001/books');
    const data = response.data;
    return data;
}

export const createBookDb = async (title,id) => {
    const response = await axios.post('http://localhost:3001/books', {id,title});
    const data = response.data;
    return data;
}

export const deleteBookDb = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`);
    const data = response.data;
    return data;
}

export const editBookDb = async (id,title) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {id,title});
    const data = response.data;
    return data;
}



