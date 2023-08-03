import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import io, { type Socket, type SocketOptions } from 'socket.io-client';

export const WebsocketContext = createContext<Socket | null>(null);
interface Props {
    children: ReactNode;
}

const options = {
    query: { serial: 'HIEU17', deviceType: 'app', ts: '1231231232', token: 'token' },
    transports: ['websocket', 'polling']
};

const WebsocketProvider: FC<Props> = ({ children }) => {
    const [connection, setConnection] = useState<Socket | null>(null);

    // const options = useMemo(() => ({ transports: ['websocket', 'polling'] }), []);

    useEffect(() => {
        try {
            console.log('connect socket...');
            const socketConnection = io(
                process.env.NEXT_PUBLIC_SOC_SERVER_URL || '127.0.0.1',
                options
            );
            // const socketConnection = io('https://0487-14-241-243-124.ap.ngrok.io', options);

            setConnection(socketConnection);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return <WebsocketContext.Provider value={connection}>{children}</WebsocketContext.Provider>;
};

export const useWebsocket = (): Socket | null => {
    const ctx = useContext(WebsocketContext);
    if (ctx === undefined) {
        throw new Error('useWebsocket can only be used inside WebsocketContext');
    }
    return ctx;
};

export default WebsocketProvider;
