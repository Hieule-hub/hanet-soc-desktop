import merge from 'lodash/merge';
import queryString from 'query-string';
import { notification } from 'antd';
import Router from 'next/router';
import CONSTANTS from 'src/constants/urls';
import AuthStorage from '@/stores/cookies/auth-storage';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface IFetchApi {
    (
        url: string,
        options: RequestInit,
        payload?: Record<string, any>,
        dispatch?: any,
        callback?: any
    ): Promise<any>;
}

function request(url: string, config: RequestInit): Promise<any> {
    return fetch(url, config)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            // Handle the error.
        });
}

const { API_URL } = CONSTANTS;

const fetchApi: IFetchApi = async (
    url,
    options,
    payload = {},
    dispatch = (f) => f,
    callback = (f) => f // callback
) => {
    try {
        const defaultOptions: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        const opts = merge(defaultOptions, options);

        if (await AuthStorage.token) {
            opts.headers = new Headers(opts.headers);
            opts.headers.set('Authorization', 'Bearer ' + AuthStorage.token);
        }

        let uri = API_URL + url;

        if (payload && Object.keys(payload).length > 0) {
            if (opts && opts.method === 'GET') {
                uri = queryString.stringifyUrl({ url: uri, query: payload });
            } else {
                if (opts.headers['Content-Type'] === 'multipart/form-data') {
                    delete opts.headers['Content-Type'];

                    const formData = new FormData();
                    Object.entries(payload).forEach(([key, val]) => {
                        if (val) {
                            if (
                                key === 'assetFiles' ||
                                key === 'pdfFiles' ||
                                key === 'images' ||
                                key === 'newImages' ||
                                key === 'newPdfFiles' ||
                                key === 'newMediaFiles' ||
                                key === 'deleteImages' ||
                                key === 'deletePdfFiles' ||
                                key === 'deleteMediaFiles'
                            ) {
                                val.forEach((file: any) => {
                                    formData.append(key, file);
                                });
                            } else {
                                formData.append(key, val);
                            }
                        }
                    });

                    opts.body = formData;
                } else {
                    opts.body = JSON.stringify(payload);
                }
            }
        }

        const data = await request(uri, opts);

        if (data?.data) {
            callback(null, data.data);
            return data.data;
        }
        return null;
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log('Call API Error: ', err);
        }

        if (process.browser) {
            notification.error({
                message: 'Oops!',
                description: err?.error || err.message || err.toString()
            });
        }

        if (err.statusCode === 403 || err.statusCode === 401) {
            AuthStorage.destroy();
            dispatch({ type: 'LOGOUT_SUCCESS' });
            // console.log('---fetchApi---7');
            if (process.browser) {
                Router.replace('/forbidden');
            }
        }

        callback(err);
        throw err;
    }
};

export default fetchApi;
