import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    config.headers['x-user-data'] = user;
  }
  return config;
});

export const authAPI = {
  login: async (credentials) => {
    // Expected { staffId, password }
    const response = await api.post('/authenticate', credentials);
    return response.data;
  }
};

export const adminAPI = {
  getOnHoldPapers: async () => {
    const response = await api.get('/admin/OnHoldPapers');
    return response.data;
  },
  getOnHoldPatents: async () => {
    const response = await api.get('/admin/OnHoldPatents');
    return response.data;
  },
  changePaperStatus: async (paperId, status) => {
    const response = await api.post('/admin/statusPaper', { paperId, status });
    return response.data;
  },
  changePatentStatus: async (patentId, status) => {
    const response = await api.post('/admin/statusPatent', { patentId, status });
    return response.data;
  }
};

export const paperAPI = {
  getAll: async () => {
    const response = await api.get('/paper/allPapers');
    return response.data;
  },
  getByStaffName: async (name) => {
    const response = await api.get(`/paper/paperByStaffName?name=${name}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/paper/newPaper', data);
    return response.data;
  }
};

export const patentAPI = {
  getAll: async () => {
    const response = await api.get('/patent/allPatents');
    return response.data;
  },
  create: async (data) => {
    // Assume route based on similar structure
    const response = await api.post('/patent/newPatent', data);
    return response.data;
  }
};

export const fdpAPI = {
  getAll: async () => {
    const response = await api.get('/fdp/allFdps');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/fdp/newFdp', data);
    return response.data;
  }
};

export const socialAPI = {
  getAll: async () => {
    const response = await api.get('/socialservice/allSocialServices');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/socialservice/newSocialService', data);
    return response.data;
  }
};

export const profileAPI = {
  getByStaffId: async (staffId) => {
    const response = await api.get(`/profile/${staffId}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/profile/newProfile', data);
    return response.data;
  }
};

export default api;
