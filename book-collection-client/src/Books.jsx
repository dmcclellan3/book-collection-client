import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [editingBook, setEditingBook] = useState(null);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:8000/books/',
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleCreateOrUpdateBook = async (e) => {
        e.preventDefault();
        if (editingBook) {
            await handleUpdateBook();
        } else {
            await handleCreateBook();
        }
    };

    const handleCreateBook = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/books/', {
                title,
                author,
                description,
                published_date: publishedDate,
            });
            setBooks([...books, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleUpdateBook = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/books/${editingBook.id}/`, {
                title,
                author,
                description,
                published_date: publishedDate,
            });
            setBooks(books.map((book) => (book.id === editingBook.id ? response.data : book)));
            resetForm();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/books/${id}/`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleEditBook = (book) => {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setPublishedDate(book.published_date);
        setEditingBook(book);
    };

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublishedDate('');
        setEditingBook(null);
    };

    return (
        <div className="container">
            <h2>Books</h2>
            <form onSubmit={handleCreateOrUpdateBook} className="form-container">
                <div className="input-container">
                    <label className="label">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input" />
                </div>
                <div className="input-container">
                    <label className="label">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="input" />
                </div>
                <div className="input-container">
                    <label className="label">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea" />
                </div>
                <div className="input-container">
                    <label className="label">Published Date</label>
                    <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required className="input" />
                </div>
                <div className="button-container">
                    <button type="submit" className="button">{editingBook ? 'Update' : 'Create'} Book</button>
                    {editingBook && <button type="button" onClick={resetForm} className="button">Cancel</button>}
                </div>
            </form>
            <ul className="list">
                {books.map((book) => (
                    <li key={book.id} className="list-item">
                        {book.title} by {book.author}
                        <div>
                            <button onClick={() => handleEditBook(book)} className="button">Edit</button>
                            <button onClick={() => handleDeleteBook(book.id)} className="button delete-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
