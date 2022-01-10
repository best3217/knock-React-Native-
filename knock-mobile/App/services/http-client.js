import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../consts";
import { baseURL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpClient = axios.create({
  baseURL
});

httpClient.interceptors.request.use(
    async (config) => {        
        const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.JWT_TOKEN);
        config.headers.Authorization = `Bearer ${token || ''}`;
        return config;
    },
    (error) => {
        console.log('http request error', error);
        return Promise.reject(error);
    },
);

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('http response error1', error);
        console.log(error);
        return Promise.reject(error);
    },
);

export default httpClient;
