import React from 'react';
import { Row, Col } from 'antd';

import MonitorsList from './components/MonitorsList';
import DrawMonitor from './components/DrawMonitor';
import ModalConfirmDeleteMonitor from './components/ModalConfirmDeleteMonitor';

export const Monitor: React.FC = () => {
    return (
        <div>
            <Row>
                <Col xl={16} xxl={12}>
                    <MonitorsList />
                </Col>
            </Row>
            <DrawMonitor />
            <ModalConfirmDeleteMonitor />
        </div>
    );
};
