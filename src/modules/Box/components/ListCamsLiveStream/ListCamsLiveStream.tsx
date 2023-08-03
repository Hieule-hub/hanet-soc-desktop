import { Space, List, Avatar, Badge } from 'antd';
import React from 'react';

import { Cam } from '@/types/cam.type';
import CamItem from '../CamItem';

interface Props {
    listCamShow: Cam[];
    lisCamWait: Cam[];
}

export const ListCamsLiveStream: React.FC<Props> = ({ listCamShow, lisCamWait }) => {
    return (
        <div className="list-cams-livestream">
            <div className="header">Danh sách camera</div>
            <div className="body-playing">
                <div className="title-body">Đang phát</div>
                <List
                    split={false}
                    dataSource={listCamShow}
                    renderItem={(item, index) => (
                        <List.Item>
                            <CamItem item={item} />
                        </List.Item>
                    )}
                />
            </div>
            <div className="body-waiting">
                <div className="title-body">Chờ phát</div>
                <List
                    split={false}
                    dataSource={lisCamWait}
                    renderItem={(item, index) => (
                        <List.Item>
                            <CamItem item={item} />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
