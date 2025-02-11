import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NOCODB_BACKEND_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOCODB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL + "/api/v2/tables",
  headers: {
    'xc-token': TOKEN
  }
});

export default api;