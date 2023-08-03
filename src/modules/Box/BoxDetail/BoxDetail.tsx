import React, { useEffect, useState } from 'react';
import { SchemeFieldFormValues } from '@/types/scheme.type';
import { Button, Col, Row, Space } from 'antd';
import classnames from 'classnames';

//type
import { Cam } from '@/types/cam.type';

import { Icon } from '@/components/Icon/Icon';
import Grid from '@/components/Grid';

//redux
import { exitFullScreen, setFullScreen } from '@/stores/redux/thunks/box.thunk';
import { RootState, useAppDispatch } from '@/stores/redux';
import { useSelector } from 'react-redux';
import { ListLayoutBox } from './ListLayoutBox';
import CamItem from '../components/CamItem';
import ListCamsLiveStream from '../components/ListCamsLiveStream';

interface Props {
    boxId: string;
}

function getColums(layout: number): number {
    switch (layout) {
        case 1:
            return 1;
        case 4:
            return 2;
        case 9:
            return 3;

        case 16:
            return 4;
        default:
            return 1;
    }
}

export const BoxDetail: React.FC<Props> = ({ boxId }) => {
    const { boxDetail } = useSelector((state: RootState) => state.monitor);

    const [listCamShow, setListCamShow] = useState<Cam[]>([]);
    const [listCamWait, setListCamWait] = useState<Cam[]>([]);
    const [selectedItem, setSelectedItem] = useState<Cam | null>(null);
    const [camFullScreen, setCamFullScreen] = useState<Cam | null>(null);
    const [listCamUnSet, setlistCamUnSet] = useState([]);
    const dispatch = useAppDispatch();

    const handleSelected = (cam: Cam) => {
        if (cam.deviceID === selectedItem?.deviceID) {
            setSelectedItem(null);
        } else {
            setSelectedItem(cam);
        }
    };

    useEffect(() => {
        if (boxDetail) {
            const { config } = boxDetail;
            if (config) {
                setListCamShow(config.pageDetail);
                if (config.pageDetail.length < config.layout) {
                    setlistCamUnSet(
                        Array.from(
                            { length: config.layout - config.pageDetail.length },
                            (_, i) => i
                        )
                    );
                } else {
                    setlistCamUnSet([]);
                }
            }
        }
    }, [boxDetail]);

    useEffect(() => {
        if (boxDetail?.config) {
            const listWait = boxDetail.config.cams.filter(
                (cam) => !listCamShow.find((item) => item.deviceID === cam.deviceID)
            );
            setListCamWait(listWait);
        }
    }, [listCamShow]);

    const onFullScreen = () => {
        if (selectedItem) {
            if (camFullScreen) {
                dispatch(exitFullScreen(boxDetail?.serial))
                    .unwrap()
                    .then(() => setCamFullScreen(null));
            } else {
                dispatch(
                    setFullScreen({
                        serial: boxDetail?.serial,
                        deviceID: selectedItem.deviceID,
                        placeID: selectedItem.placeID
                    })
                )
                    .unwrap()
                    .then(() => setCamFullScreen(selectedItem));
            }
        }
    };

    // <List
    return (
        <div className="box-detail">
            <Row className="box-detail-layout">
                <Col flex="auto">
                    {/* <ListLayoutBox /> */}

                    {boxDetail?.config && !camFullScreen && (
                        <Grid columns={getColums(boxDetail.config.layout)}>
                            {listCamShow.map((cam) => {
                                return (
                                    <div
                                        key={cam.deviceID}
                                        className={classnames('layout-item', {
                                            'is-selected': selectedItem?.deviceID === cam.deviceID
                                        })}
                                        onClick={() => handleSelected(cam)}
                                    >
                                        <CamItem item={cam} />
                                    </div>
                                );
                            })}
                            {listCamUnSet.map((item) => (
                                <div key={item}>
                                    <div className="layout-item unset">
                                        {/* <CamItem item={cam} /> */}
                                    </div>
                                </div>
                            ))}
                        </Grid>
                    )}
                    {camFullScreen && (
                        <div className="is-selected layout-item">
                            <CamItem item={camFullScreen} />
                        </div>
                    )}

                    {!boxDetail?.config && (
                        <div
                            style={{
                                height: '300px'
                            }}
                        >
                            Màn hình chưa được cấu hình
                        </div>
                    )}
                </Col>
                <Col flex="327px">
                    {/* camlist */}
                    <div className="list-cams">
                        <ListCamsLiveStream listCamShow={listCamShow} lisCamWait={listCamWait} />
                    </div>
                </Col>
            </Row>
            <Row
                className={classnames('setting-bar', {
                    show: Boolean(selectedItem)
                })}
                align="middle"
                justify="space-between"
            >
                <Col>{selectedItem && <CamItem item={selectedItem} showPlace />}</Col>
                <Col>
                    <Space>
                        <Button icon={<Icon name="mic-off" />} type="text" />
                        <Button icon={<Icon name="volume-off" />} type="text" />
                        <Button icon={<Icon name="photo-cam" />} type="text" />
                        <Button icon={<Icon name="video-cam" />} type="text" />
                        <Button
                            icon={<Icon name="fullScreen-cam" />}
                            type="text"
                            onClick={onFullScreen}
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};
