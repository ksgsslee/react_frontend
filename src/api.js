import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { API_HOST } from 'Constant';

const API_BASE_URL = API_HOST + '/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const useAxios = makeUseAxios({
  axios: axiosInstance,
});

export { axiosInstance, useAxios };
