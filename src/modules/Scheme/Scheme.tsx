import React from 'react';
import { Row, Col } from 'antd';
import SchemesList from './components/SchemesList';

export const Scheme: React.FC = () => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <SchemesList />
                </Col>
            </Row>
        </div>
    );
};
