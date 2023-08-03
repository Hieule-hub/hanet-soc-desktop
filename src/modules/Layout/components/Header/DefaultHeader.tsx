import { startChooseScheme } from '@/stores/redux/reducers/monitor.slice';
import { Button } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

const DefaultHeader: FC = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(startChooseScheme());
    };
    return (
        <div className="header-content">
            <div className="title">Trung tâm quản lý</div>
            <div className="body">
                <Button onClick={handleClick}>Chọn kịch bản</Button>
            </div>
        </div>
    );
};

export default DefaultHeader;
