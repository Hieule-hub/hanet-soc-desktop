import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/stores/redux';
import { finishDeleteMonitor, finishEditingMonitor } from '@/stores/redux/reducers/monitor.slice';

import { getMonitorsList, deleteMonitor } from '@/stores/redux/thunks/monitor.thunk';

export const ModalConfirmDeleteMonitor: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalConfirmDeleteMonitor, deleteMonitorId } = useSelector(
        (state: RootState) => state.monitor
    );
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = async () => {
        setConfirmLoading(true);

        dispatch(deleteMonitor(deleteMonitorId))
            .unwrap()
            .then(() => {
                dispatch(getMonitorsList());
                dispatch(finishEditingMonitor());
            });
        setConfirmLoading(false);
        dispatch(finishDeleteMonitor());
    };

    const handleCancel = () => {
        dispatch(finishDeleteMonitor());
    };
    return (
        <Modal
            title="Bạn có chắc muốn xóa màn hình tv này ?"
            open={isOpenModalConfirmDeleteMonitor}
            onOk={handleOk}
            okText="Đồng ý"
            cancelText="Hủy"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        />
    );
};
