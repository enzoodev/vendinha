import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://modeloproxyapi.interfocus.com.br:4443/api/',
});
