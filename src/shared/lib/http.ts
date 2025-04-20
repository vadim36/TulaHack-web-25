import axios from "axios";

export const $api = axios.create({ baseURL: "http://45.155.207.23:4000/api", withCredentials: true });