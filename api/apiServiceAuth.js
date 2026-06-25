import api from './apiClient';

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const token = response.data.access_token;
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post('/register', credentials)
    const token = response.data.access_token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Register failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    delete api.defaults.headers.common['Authorization'];
    console.log('Logged out');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error during getUser:', error);
  }
};