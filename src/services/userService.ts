 
import api from './api';

export const Login = async (username: string, password: string) => {
  try {
    const response = await api.post('/jwt-auth/v1/token', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

