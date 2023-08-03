import axios, { AxiosInstance } from 'axios';

const URL_SOC_SERVER = process.env.NEXT_PUBLIC_SOC_SERVER_URL;

class Http {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: URL_SOC_SERVER,
            timeout: 5000
        });
    }
}

const http = new Http().instance;

export default http;
