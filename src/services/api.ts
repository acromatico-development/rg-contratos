import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NOCODB_BACKEND_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOCODB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL + "/api/v2/tables",
  headers: {
    'xc-token': TOKEN
  }
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.data.token) {
      config.headers.Authorization = `Bearer ${user.data.token}`;
    }
  }
  return config;
});

export default api;