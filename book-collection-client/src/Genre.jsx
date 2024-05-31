import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [name, setName] = useState('');
    const [editingGenre, setEditingGenre] = useState(null);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/genres/');
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleCreateOrUpdateGenre = async (e) => {
        e.preventDefault();
        if (editingGenre) {
            await handleUpdateGenre();
        } else {
            await handleCreateGenre();
        }
    };

    const handleCreateGenre = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/genres/', { name });
            setGenres([...genres, response.data]);
            resetForm();
        } catch (error) {
            console.error('Error creating genre:', error);
        }
    };

    const handleUpdateGenre = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/genres/${editingGenre.id}/`, { name });
            setGenres(genres.map((genre) => (genre.id === editingGenre.id ? response.data : genre)));
            resetForm();
        } catch (error) {
            console.error('Error updating genre:', error);
        }
    };

    const handleDeleteGenre = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/genres/${id}/`);
            setGenres(genres.filter((genre) => genre.id !== id));
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    const handleEditGenre = (genre) => {
        setName(genre.name);
        setEditingGenre(genre);
    };

    const resetForm = () => {
        setName('');
        setEditingGenre(null);
    };

    return (
        <div>
            <h2>Genres</h2>
            <form onSubmit={handleCreateOrUpdateGenre}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit">{editingGenre ? 'Update' : 'Create'} Genre</button>
                {editingGenre && <button onClick={resetForm}>Cancel</button>}
            </form>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>
                        {genre.name}
                        <button onClick={() => handleEditGenre(genre)}>Edit</button>
                        <button onClick={() => handleDeleteGenre(genre.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Genres;
