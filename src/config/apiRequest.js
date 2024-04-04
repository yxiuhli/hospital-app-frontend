import axios from 'axios';

const baseURL = process.env.PROD ? process.env.API_URL : "http://localhost:9000/";

const apiRequest = axios.create({ baseURL });

export default apiRequest;