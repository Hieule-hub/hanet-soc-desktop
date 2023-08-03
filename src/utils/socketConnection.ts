import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import authStorage from '@/stores/cookies/auth-storage';
import { Box } from '@/types/box.type';

const TIMEOUT_REQUEST_SOCKET = 10000;

const URL_SOCKET_SERVER = process.env.NEXT_PUBLIC_SOC_SERVER_URL + '/';

const initBoxsList: Box[] = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    label: `TV ${(i + 1).toString()}`,
    serial: `BOX${i + 1}`,
    layout: null,
    camsList: []
}));

class SocketConnection {
    _socket: Socket = null;

    constructor() {
        if (!this._socket) {
            this.connection();
        }
    }

    public connection() {
        const { token } = authStorage;
        if (!token) {
            console.log("CAN'T GET TOKEN");
        } else {
            const options = {
                query: {
                    serial: 'HIEU17',
                    deviceType: 'app',
                    ts: new Date().getTime(),
                    token
                },
                transports: ['polling', 'websocket'],
                extraHeaders: {
                    Authorization: 'Bearer app123123'
                }
            };
            console.log('connecting...', URL_SOCKET_SERVER);
            this._socket = io(URL_SOCKET_SERVER, options);
            this._socket.on('connect', () => {
                console.log(`CONNECT SOCKET SUCCESS WITH ID :${this._socket.id}`);
            });
            return this._socket;
        }
    }

    get socket() {
        if (!this._socket) {
            return this.connection();
        }
        return this._socket;
    }

    callSocketApi = (key: string, fn: string, query: any) => {
        return new Promise((resolve, reject) => {
            this._socket.timeout(TIMEOUT_REQUEST_SOCKET).emit(key, fn, query, (err, res) => {
                if (err) {
                    console.error(`${fn} [ERROR]:`, err);
                    reject(err);
                }
                if (res) {
                    if (res.socCode !== 0) {
                        console.error(`${fn} [ERROR]:`, res);
                        reject(res);
                    } else {
                        console.log(`${fn} [INFO]:`, res);
                        resolve(res.socData);
                    }
                }
            });
        });
    };
}

const connection = new SocketConnection();
export default connection;
