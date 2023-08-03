import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/stores/redux';
import { finishDeleteScheme } from '@/stores/redux/reducers/scheme.slice';
import { deleteScheme, getSchemesList } from '@/stores/redux/thunks/scheme.thunk';

export const ModalConfirmDeleteScheme: React.FC = () => {
    const dispatch = useAppDispatch();
    const { deleteSchemeId } = useSelector((state: RootState) => state.scheme);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const router = useRouter();

    const handleOk = async () => {
        setConfirmLoading(true);

        dispatch(deleteScheme(deleteSchemeId))
            .unwrap()
            .then(() => {
                dispatch(getSchemesList());
                router.push('/scheme');
            });
        setConfirmLoading(false);
        dispatch(finishDeleteScheme());
    };

    const handleCancel = () => {
        dispatch(finishDeleteScheme());
    };
    return (
        <Modal
            title="Bạn có chắc muốn xóa kịch bản này ?"
            open={Boolean(deleteSchemeId)}
            onOk={handleOk}
            okText="Đồng ý"
            cancelText="Hủy"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        />
    );
};
