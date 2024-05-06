import axios from 'axios';

const baseURL = process.env.PROD ? process.env.API_URL : "http://localhost:8080/api/v1";

const apiRequest = axios.create({ baseURL });

export default apiRequest;