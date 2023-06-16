import axios, { type AxiosRequestConfig } from 'axios';

import { API_URL } from 'src/config';

export const api = axios.create({ baseURL: API_URL });
