import api from '../api';

export const getFavorites = async () => {
  const response = await api.get('/favorites/');
  return response.data;
};

export const addFavorite = async (movieId) => {
  const response = await api.post('/favorites/', { movie_id: movieId });
  return response.data;
};

export const removeFavorite = async (favoriteId) => {
  const response = await api.delete(`/favorites/${favoriteId}/`);
  return response.data;
};

