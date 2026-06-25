import axios from 'axios';

const BASE_URL = 'https://expenses-tracker-api-laravel.benova.com.my/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;