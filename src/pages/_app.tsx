import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import { ConfigProvider, notification } from 'antd';

import NProgress from 'nprogress';

import Head from '@components/Head';
import MainLayout from '@modules/Layout';
import Loading from '@components/Loading';

import wrapperStore, { RootState } from '@stores/redux';
import AuthStorage from '@/stores/cookies/auth-storage';

import themes from '@/constants/theme';

import { urlsIgnore } from '@constants/urls';
// import WebsocketProvider from '@provider/socket.context';

import 'antd/dist/reset.css';
import '@/styles/index.scss';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '@/components/Empty';

notification.config({
    placement: 'bottomLeft',
    className: 'hanet-ant-notification'
});

interface Props {
    Component: any;
    pageProps: any;
}

const MyApp: FC<Props> = (props) => {
    const { Component, pageProps } = props;
    const [awaitLoading, setAwaitLoading] = useState(true);
    const themCurren = useSelector((state: RootState) => state.setting.theme);
    const router = useRouter();
    const dispatch = useDispatch();

    // const dispatch = useDispatch();

    const Layout = Component.Layout || MainLayout;
    const Title = Component.Title || 'HANET DESKTOP';

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            if (!shallow) {
                NProgress.start();
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', () => NProgress.done());
        router.events.on('routeChangeError', () => NProgress.done());

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', () => NProgress.done());
            router.events.off('routeChangeError', () => NProgress.done());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // define a custom handler function
        // for the contextmenu event
        const handleContextMenu = (e) => {
            // prevent the right-click menu from appearing
            e.preventDefault();
        };

        // attach the event listener to
        // the document object
        document.addEventListener('contextmenu', handleContextMenu);

        // clean up the event listener when
        // the component unmounts
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useAsync(async () => {
        if (AuthStorage.loggedIn) {
            // try {
            //     await dispatch(await actionGetUserAuth());
            // } catch (error) {
            //     console.log('error:', error);
            //     if (
            //         (error.status === 403 || error.status === 401) &&
            //         error.code !== 'AUTHORIZATION_REQUIRED'
            //     ) {
            //         AuthStorage.destroy();
            //         dispatch({ type: 'LOGOUT_SUCCESS' });

            //         if (router.pathname !== '/login') {
            //             router.push('/login');
            //         }
            //     }
            // }
            setAwaitLoading(false);
        } else {
            setAwaitLoading(false);
        }
    }, [AuthStorage.loggedIn]);

    useAsync(async () => {
        if (
            !AuthStorage.loggedIn &&
            typeof window !== 'undefined' &&
            !urlsIgnore.includes(router.pathname)
        ) {
            router.push('/login');
        }
    }, [router.pathname]);

    return (
        // <WebsocketProvider>
        <ConfigProvider theme={themes.dark} renderEmpty={Empty}>
            <Layout>
                <Head title={Title} />
                <Component {...pageProps} router={router} />
                <Loading fullScreen loading={awaitLoading} />
            </Layout>
        </ConfigProvider>

        // </WebsocketProvider>
    );
};

export default wrapperStore.withRedux(MyApp);
