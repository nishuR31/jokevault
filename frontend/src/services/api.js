import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for consistent data extraction
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response?.data || {
      success: false,
      message: error.message || "Network error. Please check backend connection.",
    };
    return Promise.reject(errorData);
  }
);

// Jokes API
export const jokeApi = {
  // Fetch a random joke (optionally filtered by tags)
  getRandomJoke: (tags) => {
    const params = tags ? { tags } : {};
    return apiClient.get("/j/joke", { params });
  },

  // Fetch multiple jokes (optionally filtered by tags and count)
  getJokes: (tags, count = 5) => {
    const params = { count };
    if (tags) params.tags = tags;
    return apiClient.get("/j/jokes", { params });
  },

  // Get all unique joke tags
  getTags: () => apiClient.get("/j/tags"),

  // Paginated jokes
  getPaginatedJokes: (page = 1, limit = 10) => {
    return apiClient.get("/j/page", { params: { page, limit } });
  },

  // Get joke by ID (Public / User)
  getJokeById: (id) => apiClient.get(`/j/${id}`),

  // Submit a new joke (Admin only)
  createJoke: (jokeData) => apiClient.post("/j", jokeData),

  // Full update joke by ID (Admin only)
  editJoke: (id, updateData) => apiClient.put(`/j/${id}`, updateData),

  // Partial update joke by ID (Admin only)
  patchJoke: (id, patchData) => apiClient.patch(`/j/${id}`, patchData),

  // Delete joke by ID (Admin only)
  deleteJoke: (id) => apiClient.delete(`/j/${id}`),
};

// User & Auth API
export const userApi = {
  register: (userData) => {
    const payload = {
      ...userData,
      userName: userData.userName || userData.username,
    };
    return apiClient.post("/u/register", payload);
  },
  login: (credentials) => {
    const payload = {
      ...credentials,
      emailUser: credentials.emailUser || credentials.email || credentials.username || credentials.userName,
    };
    return apiClient.post("/u/login", payload);
  },
  logout: () => apiClient.post("/u/logout"),
  getMe: () => apiClient.get("/u/me"),
  getProfile: (id) => apiClient.get(`/u/profile/${id}`),
  updateProfile: (profileData) => apiClient.patch("/u/profile/update", profileData),
  getAllUsers: () => apiClient.get("/u/all-users"),
  updateUserRole: (id, role) => apiClient.patch(`/u/role/${id}`, { role }),
};

// System Health API
export const systemApi = {
  getHealth: () => apiClient.get("/health"),
  getHelp: () => apiClient.get("/help"),
};

export default apiClient;
