import React, { FC } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import THEME from 'src/constants/theme';

interface Props {
    fullScreen: boolean;
    loading: boolean;
}

const Loading: FC<Props> = (props) => {
    const { fullScreen = false, loading = false } = props;

    if (!loading) {
        return null;
    }

    if (!fullScreen) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 99,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LoadingOutlined style={{ fontSize: 40 }} />
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100vh',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LoadingOutlined style={{ fontSize: 40 }} />
        </div>
    );
};

export default Loading;
