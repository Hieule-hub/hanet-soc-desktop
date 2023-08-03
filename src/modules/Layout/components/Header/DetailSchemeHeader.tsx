import React, { FC, useCallback } from 'react';
import { Button, Space } from 'antd';
import { RootState } from '@/stores/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { startDeleteScheme } from '@/stores/redux/reducers/scheme.slice';

const DetailSchemeHeader: FC = () => {
    const { loading } = useSelector((state: RootState) => state.scheme);
    const router = useRouter();
    const dispatch = useDispatch();

    const { schemeId } = router.query;

    const onDeleteScheme = useCallback(() => {
        if (schemeId) {
            dispatch(startDeleteScheme(schemeId as string));
        }
    }, [dispatch, schemeId]);

    //action create scheme
    return (
        <div className="header-content">
            <div className="title">Chi tiết kịch bản</div>
            <div className="body">
                <Space>
                    <Button danger loading={loading} disabled={loading} onClick={onDeleteScheme}>
                        Xóa
                    </Button>
                    <Button
                        form="form-test"
                        key="submit"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Lưu
                    </Button>
                </Space>
            </div>
        </div>
    );
};

export default DetailSchemeHeader;
