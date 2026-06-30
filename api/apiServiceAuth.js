import api from './apiClient';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

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

export const googleLoginBackend = async (idToken) => {
  try {
    const response = await api.post('/google-login', { id_token: idToken });
    const token = response.data.access_token;
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    console.error('Backend Google Auth matching failed:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await api.post('/register', credentials);
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
    if (GoogleSignin && typeof GoogleSignin.signOut === 'function') {
      const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();
      if (hasPreviousSignIn) {
        await GoogleSignin.signOut();
      }
    }
  } catch (error) {
    console.error('Error during logout execution sequence:', error);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error during getUser:', error);
    throw error;
  }
};