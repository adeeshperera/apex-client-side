import api from './api';
import { AuthUser, RegisterData, LoginData, Service, Build } from '../types';

export const tokenService = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  isTokenValid: (): boolean => {
    const token = tokenService.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  },
};

export const authApi = {
  register: async (userData: RegisterData): Promise<AuthUser> => {
    const { data } = await api.post('/auth/register', userData);
    if (data.token) {
      tokenService.setToken(data.token);
    }
    return data;
  },

  login: async (credentials: LoginData): Promise<AuthUser> => {
    const { data } = await api.post('/auth/login', credentials);
    if (data.token) {
      tokenService.setToken(data.token);
    }
    return data;
  },

  logout: (): void => {
    tokenService.removeToken();
  },

  getProfile: async (): Promise<AuthUser> => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};

export const serviceApi = {
  getServices: async (): Promise<Service[]> => {
    const { data } = await api.get('/services');
    return data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },
};

export const buildApi = {
  getUserBuilds: async (userId: string): Promise<Build[]> => {
    const { data } = await api.get(`/builds/user/${userId}`);
    return data;
  },

  createBuild: async (buildData: Partial<Build>): Promise<Build> => {
    const { data } = await api.post('/builds', buildData);
    return data;
  },

  updateBuild: async (id: string, buildData: Partial<Build>): Promise<Build> => {
    const { data } = await api.put(`/builds/${id}`, buildData);
    return data;
  },

  deleteBuild: async (id: string): Promise<void> => {
    await api.delete(`/builds/${id}`);
  },

  getBuildById: async (id: string): Promise<Build> => {
    const { data } = await api.get(`/builds/${id}`);
    return data;
  },
};