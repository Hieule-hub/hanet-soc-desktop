import React from 'react';
import { Dropdown, Badge, Spin, Empty } from 'antd';
// import { IoMdNotificationsOutline } from 'react-icons/io';

import { NotificationOutlined } from '@ant-design/icons';

const Notifications: React.FC = () => {
    const menu = (
        <div className="hanet-notifications">
            <Spin spinning={false}>
                <div className="d-flex align-items-center justify-content-between px-3 py-1 border-bottom">
                    <strong className="fs-lg">Notification</strong>
                </div>
                <div className="list">
                    <Empty className="mt-5" />
                </div>
            </Spin>
        </div>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div
                style={{ height: '50px', display: 'flex' }}
                className="px-3 cursor-pointer align-items-center"
            >
                <Badge count={0} dot className="fs-md">
                    <NotificationOutlined />
                </Badge>
            </div>
        </Dropdown>
    );
};

export default Notifications;
