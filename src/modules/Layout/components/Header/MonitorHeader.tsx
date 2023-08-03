import React, { FC } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { startAddMonitor } from '@/stores/redux/reducers/monitor.slice';

const MonitorHeader: FC = () => {
    const dispatch = useDispatch();

    const onStartAddMonitor = () => {
        dispatch(startAddMonitor());
    };

    return (
        <div className="header-content">
            <div className="title">Quản lý màn hình</div>
            <div className="body">
                {/* <Notifications /> */}
                {/* <AvatarDropDown /> */}

                <Button onClick={onStartAddMonitor}>Thêm màn hình</Button>
            </div>
        </div>
    );
};

export default MonitorHeader;
