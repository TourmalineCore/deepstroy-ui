import axios from "axios";

const baseUrl = `http://localhost:9200/api`;

export const api = axios.create({
  baseURL: baseUrl,
});
