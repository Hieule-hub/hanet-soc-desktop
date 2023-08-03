import { Icon } from '@/components/Icon/Icon';
import { Row, Col, Space } from 'antd';
import React from 'react';

interface Props {
    status: number | string;
}

export const Status: React.FC<Props> = ({ status }) => {
    const statusCode: number = +status;
    if (statusCode === 1) {
        return (
            <Space>
                <Space style={{ color: '#52C41A', display: 'flex' }}>
                    <Icon name="dot-status" />
                </Space>
                <div>Hoạt động</div>
            </Space>
        );
    }
    return (
        <Space>
            <Space style={{ color: '#FF4D4F', display: 'flex' }}>
                <Icon name="dot-status" />
            </Space>
            <div>Không hoạt động</div>
        </Space>
    );
};
