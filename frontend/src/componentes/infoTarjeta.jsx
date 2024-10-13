import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/games/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del juego');
        }
        const gameArray = await response.json();
        if (gameArray.length > 0) {
          setGameDetails(gameArray[0]);
        } else {
          setError('Juego no encontrado');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={handleBack}>Atrás</button>
      <h1>Detalles del Juego</h1>
      <div>
        <p>ID del Juego: {gameDetails.id}</p>
        <p>Nombre: {gameDetails.title}</p>
        <p>Descripción: {gameDetails.description}</p>
        <p>Cantidad de Jugadores: {gameDetails.players}</p>
        <p>Categorías: {gameDetails.categories}</p>
      </div>
    </div>
  );
};

export default GameDetails;