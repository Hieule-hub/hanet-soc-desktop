import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Col, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/redux';

const BoxDetailHeader: FC = () => {
    const { boxDetail } = useSelector((state: RootState) => state.monitor);
    const router = useRouter();

    return (
        <div className="header-content">
            <Row justify="space-between">
                <Col>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        type="text"
                        onClick={() => router.push('/')}
                    />
                </Col>
                <div>{boxDetail?.name}</div>
            </Row>
            <div> </div>
        </div>
    );
};

export default BoxDetailHeader;
