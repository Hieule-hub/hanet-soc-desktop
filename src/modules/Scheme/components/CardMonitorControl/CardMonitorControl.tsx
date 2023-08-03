import { ColumnsType } from 'antd/lib/table';
import { MonitorConfig } from '@/types/scheme.type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Table } from 'antd';
import React, { useState } from 'react';
import MonitorConfigModal from '../MonitorConfigModal';

import { LayoutCPN } from './LayoutCPN';

interface Props {
    listMonitorsConfig: MonitorConfig[];
    setListMonitorsConfig: React.Dispatch<React.SetStateAction<MonitorConfig[]>>;
}

export const CardMonitorControl: React.FC<Props> = ({
    listMonitorsConfig,
    setListMonitorsConfig
}) => {
    const [editingMonitorConfig, setEditingMonitorConfig] = useState<MonitorConfig>(null);

    const [isModalMonitorConfigOpen, setIsModalMonitorConfigOpen] = useState(false);

    const showMonitorConfigModal = () => {
        setIsModalMonitorConfigOpen(true);
    };
    const closeMonitorConfigModal = () => {
        if (editingMonitorConfig) {
            setEditingMonitorConfig(null);
        }
        setIsModalMonitorConfigOpen(false);
    };

    const handleOkMonitorConfigModal = (list: MonitorConfig[]) => {
        if (!editingMonitorConfig) {
            setListMonitorsConfig((pre) => [...pre, ...list]);
        } else {
            const [newMonitorConfig] = list;
            const newList = listMonitorsConfig.map((item) => {
                if (item.serial === editingMonitorConfig.serial) {
                    return {
                        ...newMonitorConfig
                    };
                }
                return item;
            });
            setListMonitorsConfig(newList);
            setEditingMonitorConfig(null);
        }
        closeMonitorConfigModal();
    };

    const startEditingMonitorConfig = (item: MonitorConfig) => {
        setEditingMonitorConfig(item);
        showMonitorConfigModal();
    };

    const removeMonitorConfig = (serial: string) => {
        const newList = listMonitorsConfig.filter((item) => item.serial !== serial);
        setListMonitorsConfig(newList);
    };

    const columns: ColumnsType<MonitorConfig> = [
        {
            title: 'TV',
            dataIndex: 'layout',
            key: 'layout',
            align: 'center',
            width: 85,
            render: (value, record, index) => <LayoutCPN layout={record.layout} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 270
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: 180
        // },

        {
            title: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Space size="middle" className="hanet-table-action">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => startEditingMonitorConfig(record)}
                        type="text"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={() => removeMonitorConfig(record.serial)}
                    />
                </Space>
            )
        }
    ];

    return (
        <Card
            bordered={false}
            className="hanet-ant-card"
            title={<div className="title">Chọn kiểu màn hình</div>}
            extra={<Button onClick={showMonitorConfigModal}>Thêm</Button>}
        >
            <Table
                className="hanet-table"
                columns={columns}
                rowKey="id"
                dataSource={listMonitorsConfig}
                pagination={false}
                showHeader={false}
                locale={{}}
            />

            <MonitorConfigModal
                open={isModalMonitorConfigOpen}
                onClose={closeMonitorConfigModal}
                onSubmit={handleOkMonitorConfigModal}
                listSelected={listMonitorsConfig}
                editingMonitor={editingMonitorConfig}
            />
        </Card>
    );
};
