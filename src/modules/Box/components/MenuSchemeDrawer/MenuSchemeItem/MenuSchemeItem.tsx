import React, { FC, useState } from 'react';
import { Space, Button } from 'antd';
import { Scheme } from '@/types/scheme.type';

interface Props {
    data: Scheme;
    active: boolean;
    isLoading: boolean;
    onApply: (scheme: Scheme) => void;
}

export const MenuSchemeItem: FC<Props> = ({ data, active, isLoading, onApply }) => {
    return (
        <Space
            direction="vertical"
            className={active ? 'scheme-item scheme-item-active' : 'scheme-item'}
            size={8}
        >
            <div className="title">{data.name}</div>
            <div>{data.name}</div>
            <Space wrap size={6}>
                <div>Áp dụng TV</div>
                {data.detail?.monitorConfigList.map((monitor) => (
                    <div key={monitor.id} className="monitor-item">
                        {monitor.name}
                    </div>
                ))}
            </Space>
            {/* <div>Số lượng cam: {data.count_device}</div> */}
            <Button
                type="primary"
                hidden={!active}
                loading={isLoading}
                disabled={isLoading}
                onClick={() => onApply(data)}
            >
                Áp dụng
            </Button>
        </Space>
    );
};
