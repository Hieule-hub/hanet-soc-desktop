import React, { FC } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface Props extends React.ComponentProps<typeof Row> {
    onClose: () => void;
    title: string;
}

const { Title } = Typography;

const Extra: FC<Props> = ({ onClose, title = '', ...props }) => {
    return (
        <Row justify="space-between" gutter={[10, 10]} align="middle" {...props}>
            <Title level={4} style={{ margin: 0 }}>
                {title}
            </Title>
            <Col>
                <Button icon={<CloseOutlined />} type="text" onClick={onClose} />
            </Col>
        </Row>
    );
};

export { Extra };
