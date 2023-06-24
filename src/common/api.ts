import axios from "axios";

const baseUrl = `http:localhosl:9200/api`;

export const api = axios.create({
  baseURL: baseUrl,
});
