import React from 'react';

import { Row, Col, Button, Tooltip } from 'antd';

import { Cam } from '@/types/cam.type';
import { CloseCircleOutlined } from '@ant-design/icons';
import { RankType } from '@/types/region.type';

interface Props {
    onRemove: () => void;
    item: any;
    showPlaceName?: boolean;
}

export const CheckItem: React.FC<Props> = ({ item, onRemove, showPlaceName = false }) => {
    return (
        <div className="hanet-checked-item">
            {/* {item.placeName && showPlaceName && <div className="place-name">{item.placeName}</div>} */}
            <Tooltip
                placement="top"
                title={
                    showPlaceName && item.placeName ? (
                        <div className="place-name">{item.placeName}</div>
                    ) : (
                        ''
                    )
                }
            >
                <Row justify="space-between" align="middle" className="body">
                    <Col>{item.deviceName || item.name}</Col>
                    <Col>
                        <Button icon={<CloseCircleOutlined />} onClick={onRemove} />
                    </Col>
                </Row>
            </Tooltip>
        </div>
    );
};
