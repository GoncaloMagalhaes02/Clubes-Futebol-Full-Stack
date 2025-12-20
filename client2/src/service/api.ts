import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/clubes", // Base das tuas rotas
});

export default api;