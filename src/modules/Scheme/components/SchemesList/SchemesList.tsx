/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Space, Table, Input } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

import type { MonitorConfig, Scheme } from '@/types/scheme.type';

//redux
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/stores/redux';
import { applyScheme } from '@/stores/redux/thunks/box.thunk';

import MonitorItem from '@/modules/Monitor/components/MonitorItem';
import MonitorConfigModal from '../MonitorConfigModal';

export const SchemesList: React.FC = () => {
    // const { data: schemesList, error, isFetching } = useGetSchemesListQuery();
    const { schemesList, loading } = useSelector((state: RootState) => state.scheme);
    const [isOpenModalAddMonitor, setIsOpenModalAddMonitor] = useState(false);
    const [isApply, setIsApply] = useState<boolean>(false);

    const [schemeIdApply, setSchemeIdApply] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const openModalAddMonitor = () => {
        setIsOpenModalAddMonitor(true);
    };
    const closeModalAddMonitor = () => {
        setIsOpenModalAddMonitor(false);
        if (schemeIdApply) setSchemeIdApply(null);
    };

    const onApplyScheme = (scheme: Scheme) => {
        if (scheme.detail.monitorConfigList.length === 0) {
            openModalAddMonitor();
            setSchemeIdApply(scheme.id);
        } else {
            setIsApply(true);
            setTimeout(() => {
                dispatch(applyScheme({ id: scheme.id }))
                    .unwrap()
                    .then((res) => {
                        router.push('/');
                    })
                    .finally(() => {
                        setIsApply(false);
                    });
            }, 2000);
        }
    };

    const handleSubmit = (list: MonitorConfig[]) => {
        setIsApply(true);
        setTimeout(() => {
            dispatch(applyScheme({ id: schemeIdApply, monitorConfigList: list }))
                .unwrap()
                .then(() => {
                    closeModalAddMonitor();
                    router.push('/');
                })
                .finally(() => {
                    setIsApply(false);
                });
        }, 2000);
    };

    const columns: ColumnsType<Scheme> = [
        {
            title: 'Danh sách kịch bản',
            dataIndex: 'name',
            key: 'name',
            // align: 'center'
            width: 500,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div className="hanet-search" onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        onBlur={() => confirm()}
                    />
                </div>
            ),
            filterIcon: <SearchOutlined />,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
            onFilter: (value, record) =>
                record.name
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase())
        },
        {
            title: 'Thời gian tạo',
            key: 'createAt',
            dataIndex: 'createAt',
            width: 150,
            sorter: (a, b) => {
                const tmpA = new Date(a.createdAt).getTime();
                const tmpB = new Date(b.createdAt).getTime();

                return tmpA - tmpB;
            },
            render(value, record, index) {
                const date = new Date(record.createdAt).toLocaleDateString('en-GB');

                return <div>{date}</div>;
            }
        },
        {
            title: 'TV áp dụng',
            dataIndex: 'monitorsList',
            key: 'monitorsList',
            // width: 180
            render: (value, record, index) => (
                <Space>
                    {record.detail.monitorConfigList?.map((item) => (
                        <MonitorItem key={item.id} label={item.name} />
                    ))}
                </Space>
            )
        },
        {
            title: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Space size="middle" className="hanet-table-action">
                    <Link href={`/scheme/${record.id}`}>
                        <Button icon={<EditOutlined />} type="text" />
                    </Link>
                    <Button
                        type="primary"
                        onClick={() => onApplyScheme(record)}
                        disabled={isApply}
                        loading={isApply}
                    >
                        Áp dụng
                    </Button>
                </Space>
            )
        }
    ];
    return (
        <>
            <Table
                showSorterTooltip={false}
                loading={loading}
                className="hanet-table"
                columns={columns}
                dataSource={schemesList}
                pagination={{ position: ['bottomCenter'], pageSize: 16 }}
                rowKey="id"
            />
            <MonitorConfigModal
                open={isOpenModalAddMonitor}
                onClose={closeModalAddMonitor}
                onSubmit={handleSubmit}
                loadingSubmit={isApply}
                listSelected={[]}
            />
        </>
    );
};
