import React, { FC } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/redux';

const CreateSchemeHeader: FC = () => {
    const { loading } = useSelector((state: RootState) => state.scheme);
    //action create scheme
    return (
        <div className="header-content">
            <div className="title">Tạo kịch bản</div>
            <div className="body">
                <Button
                    form="form-test"
                    key="submit"
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                >
                    Tạo
                </Button>
            </div>
        </div>
    );
};

export default CreateSchemeHeader;
