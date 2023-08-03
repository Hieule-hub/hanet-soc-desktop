import React, { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';

import { Layout, FloatButton } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import socketConnection from '@/utils/socketConnection';

import { RootState, useAppDispatch } from '@/stores/redux';
import {
    finishDetailBox,
    startDetailBox,
    updateBox,
    updateListCamLive
} from '@/stores/redux/reducers/monitor.slice';
import { getMonitorsList } from '@/stores/redux/thunks/monitor.thunk';
import { getSchemesList } from '@/stores/redux/thunks/scheme.thunk';
import { useSelector } from 'react-redux';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const { Content } = Layout;

interface Props {
    children: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();

    const [isShowDrawer, setIsShowDrawer] = useState(false);
    const monitorsList = useSelector((state: RootState) => state.monitor.monitorsList);

    const router = useRouter();

    const { schemeId, boxId } = router.query;
    const { socket } = socketConnection;

    useEffect(() => {
        if (boxId) {
            dispatch(startDetailBox(+boxId as number));
        } else {
            dispatch(finishDetailBox());
        }
    }, [boxId, dispatch, monitorsList]);

    useEffect(() => {
        if (socket && socket.connected) {
            socket.on('server-message', (action, data) => {
                console.log('server-message', action, data);
                switch (action) {
                    case 'init-data':
                    case 'box-join':
                    case 'box-leave':
                        if (data?.online) {
                            dispatch(updateBox(data?.online));
                        }
                        break;
                    case 'get-task':
                        if (data) {
                            dispatch(updateListCamLive(data));
                        }
                        break;

                    default:
                        break;
                }
            });
        }
        return () => {
            socket?.off('server-message');
        };
    }, [socket?.connected]);

    useEffect(() => {
        const promise1 = dispatch(getMonitorsList());
        const promise2 = dispatch(getSchemesList());

        Promise.all([promise1, promise2]).catch((error) => {
            console.log('error promise all:', error);
        });

        // return () => {
        //     promiseAll;
        // };
    }, []);

    const showDrawer = () => {
        setIsShowDrawer(true);
    };

    const onClose = () => {
        setIsShowDrawer(false);
    };

    return (
        <Layout className="hanet-main-layout">
            <Sidebar isOpen={isShowDrawer} onClose={onClose} />
            <Layout className="site-layout">
                <Header>
                    <MenuUnfoldOutlined className="trigger" onClick={showDrawer} />
                </Header>
                <Content
                    style={{
                        margin: 20
                    }}
                >
                    {children}
                </Content>
                {/* <Footer /> */}
            </Layout>
            <FloatButton.BackTop />
        </Layout>
    );
};

export default MainLayout;
