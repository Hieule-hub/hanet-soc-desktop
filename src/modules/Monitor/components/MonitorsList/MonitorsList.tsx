import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';

import { RootState, useAppDispatch } from '@/stores/redux';

import type { Monitor } from '@/types/monitor.type';

//redux
import { startEditingMonitor } from '@/stores/redux/reducers/monitor.slice';

import Status from '@/components/Status';

export const MonitorsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { monitorsList, loading } = useSelector((state: RootState) => state.monitor);

    const onEditMonitor = (serial: string) => {
        dispatch(startEditingMonitor(serial));
    };

    const columns: ColumnsType<Monitor> = [
        {
            title: 'TV',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 130
        },
        {
            title: 'Serial',
            dataIndex: 'serial',
            key: 'serial',
            width: 270
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 180,
            render: (value, record, index) => <Status status={record.status} />
        },
        {
            title: 'Thời gian tạo',
            key: 'createAt',
            dataIndex: 'createAt',
            width: 150,
            render(value, record, index) {
                const date = new Date(record.createdAt).toLocaleDateString('en-GB');

                return <div>{date}</div>;
            }
        },
        {
            title: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Space size="middle" className="hanet-table-action">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEditMonitor(record.serial)}
                        type="text"
                    />
                </Space>
            )
        }
    ];

    return (
        <Table
            loading={loading}
            className="hanet-table"
            columns={columns}
            dataSource={monitorsList}
            pagination={false}
            rowKey="serial"
        />
    );
};
