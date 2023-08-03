import React from 'react';
import { Row, Col, Input, Space, Button, DatePicker, TabsProps, Tabs } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import Empty from '@/components/Empty';

const { Search } = Input;

export const HistoryVideo: React.FC = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Sự kiện',
            children: (
                <div className="event-content">
                    {/* <Empty style={{ height: '600px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
                    <Empty />
                </div>
            )
        },
        {
            key: '2',
            label: 'Video lưu trữ',
            children: 'Danh sách video'
        }
    ];

    return (
        <Row className="hanet-history-video">
            <Col span={20}>
                <Row gutter={[8, 8]}>
                    <Col flex="auto">
                        <Search
                            placeholder="Tìm kiếm"
                            // onSearch={onSearch}
                        />
                    </Col>

                    <Col flex="260px">
                        <DatePicker
                            //  onChange={onChange}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col>
                        <Button type="primary">Áp dụng</Button>
                    </Col>
                </Row>
                {/* <Space style={{ width: '100%', display: 'flex' }}>
                    <Search
                        style={{ width: 420 }}
                        placeholder="Tìm kiếm"
                        // onSearch={onSearch}
                        // style={{ width: 200 }}
                    />
                    <DatePicker
                    //  onChange={onChange}
                    />
                    <Button type="primary">Áp dụng</Button>
                </Space> */}
                <div className="body">
                    <div className="filter-button">
                        <Button icon={<FilterFilled />}>Lọc</Button>
                    </div>
                    <Tabs defaultActiveKey="1" items={items} style={{ marginTop: 18 }} />
                </div>
            </Col>
        </Row>
    );
};
