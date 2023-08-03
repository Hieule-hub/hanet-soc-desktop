/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Cam } from '@/types/cam.type';
import { Badge } from 'antd';
import { urlImgDeviceRender } from '@/utils/urlImgDeviceRender';

interface Props {
    item: Cam;
    showPlace?: boolean;
}
const getColorStatus = (item: Cam): string => {
    if (item.online === true) {
        return '#43E940';
    }
    if (item.online === false) {
        return '#F85506';
    }
    return '#595959';
};

export const CamItem: React.FC<Props> = ({ item, showPlace = false }) => {
    return (
        <div className="hanet-cam-item">
            <div className="body">
                <div className="icon">
                    <Badge color={getColorStatus(item)} dot className="status-cam" />
                    <img src={urlImgDeviceRender(item.type)} alt="icon" />
                </div>

                <div className="title">{item.deviceName}</div>
            </div>
            {showPlace && <div className="place-detail">{item.placeName || 'place name'}</div>}
        </div>
    );
};
