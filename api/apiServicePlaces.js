import api from './apiClient';

export const getPlaces = async () => {
  try {
    const response = await api.get('/places');
    return response.data;
  } catch (error) {
    console.error('Failed to get places:', error.response?.data || error.message);
    throw error;
  }
};

export const getSinglePlace = async (id) => {
  try {
    const response = await api.get(`/places/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get place:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePlace = async (id) => {
  try {
    const response = await api.delete(`/places/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete place:', error.response?.data || error.message);
    throw error;
  }
};

export const createPlace = async (formData) => {
  try {
    const response = await api.post('/places', formData, {
      headers: { 'Content-Type': null },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create place:', error.response?.data || error.message);
    throw error;
  }
};
