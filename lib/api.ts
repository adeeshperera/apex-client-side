import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BuildData {
  carModel: string;
  color: string;
  selectedParts: Array<{
    partId: string;
    partName: string;
    price: number;
  }>;
  totalPrice: number;
}

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred';
    
    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

export const apiService = {
  auth: {
    login: (email: string, password: string) =>
      api.post('/auth/login', { email, password }),
    
    register: (name: string, email: string, password: string) =>
      api.post('/auth/register', { name, email, password }),
    
    getProfile: () => api.get('/auth/profile'),
  },
  
  services: {
    getAll: () => api.get('/services'),
    getById: (id: string) => api.get(`/services/${id}`),
  },
  
  builds: {
    getUserBuilds: (userId: string) => api.get(`/builds/user/${userId}`),
    create: (buildData: BuildData) => api.post('/builds', buildData),
    update: (id: string, buildData: Partial<BuildData>) => api.put(`/builds/${id}`, buildData),
    delete: (id: string) => api.delete(`/builds/${id}`),
    getById: (id: string) => api.get(`/builds/${id}`),
  },
};

export default api;