import axios from 'axios';

const BASE_URL = 'http://localhost:8081/rest/auth'; // Adaptez avec votre URL backend

export const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de connexion');
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: credentials.email,
        password: credentials.password
      });
      
      // Stocker le token dans le localStorage
      if (response.data.token) {
        localStorage.setItem('user-token', response.data.token);
        localStorage.setItem('user-email', response.data.email);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de connexion');
    }
  },

  logout: () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-email');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user-token');
  }
};