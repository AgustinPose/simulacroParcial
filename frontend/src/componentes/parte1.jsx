import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../parte1.css';

const Parte1 = () => {
    const [games, setGames] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
    const [newGame, setNewGame] = useState({
        title: '',
        description: '',
        players: '',
        categories: ''
    });

    const navigate = useNavigate();

    const getGame = async () => {
        const gameFetch = await fetch("http://localhost:3000/api/games");
        const games = await gameFetch.json();
        return games;
    };

    useEffect(() => {
        getGame().then((games) => setGames(games));
    }, []);

    const handleDetails = (gameId) => {
        navigate(`/games/${gameId}`);
    };

    const handleDelete = (gameId) => {
        fetch(`http://localhost:3000/api/games/${gameId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setGames(games.filter((game) => game.id !== gameId));
                } else {
                    console.error('Error al eliminar el juego');
                }
            })
            .catch((error) => {
                console.error('Error al eliminar el juego:', error);
            });
    };

    // Maneja la apertura del modal
    const handleAdd = () => {
        setIsModalOpen(true);
    };

    // Maneja el cierre del modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewGame({ title: '', description: '', players: '', categories: '' }); // Resetea el formulario
    };

    // Maneja el envío del formulario para añadir un nuevo juego
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (response.ok) {
                // Refrescar la lista de juegos o recargar la página
                window.location.reload();  // Refresca la página para mostrar el nuevo juego
            } else {
                console.error('Error al añadir el juego');
            }

            const addedGame = await response.json();

            // Añadir el nuevo juego a la lista de juegos
            setGames([...games, addedGame]);
            handleCloseModal(); // Cerrar el modal después de añadir el juego
        } catch (error) {
            console.error('Error al añadir el juego:', error);
        }
    };

    // Maneja los cambios en los inputs del formulario
    const handleChange = (e) => {
        setNewGame({
            ...newGame,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Juegos Olimpicos 2024</h1>
            <button onClick={handleAdd}>Agregar Deporte</button>
            
            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Agregar Nuevo Deporte</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="title"
                                    value={newGame.title}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Descripción:
                                <input
                                    type="text"
                                    name="description"
                                    value={newGame.description}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Cantidad de Jugadores:
                                <input
                                    type="number"
                                    name="players"
                                    value={newGame.players}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Categoría:
                                <input
                                    type="text"
                                    name="categories"
                                    value={newGame.categories}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit">Agregar</button>
                                <button type="button" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Listado de Juegos */}
            <div className="game-card-container">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <h2>{game.title}</h2>
                        <div>
                            <button onClick={() => handleDetails(game.id)}>Detalles</button>
                            <button onClick={() => handleDelete(game.id)}>Borrar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parte1;
