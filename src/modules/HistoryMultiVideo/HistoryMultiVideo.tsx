import React, { useEffect, useRef, useState } from 'react';
import {
    Row,
    Col,
    Input,
    Space,
    Button,
    DatePicker,
    TabsProps,
    Tabs,
    TimePicker,
    Select,
    SelectProps,
    Form
} from 'antd';
import dayjs from 'dayjs';

import { Video } from '@/types/video.type';
import { Cam } from '@/types/cam.type';

import { useAppDispatch } from '@/stores/redux';

import { getVideoHistory } from '@/stores/redux/thunks/video.thunk';
import { SearchOutlined } from '@ant-design/icons';
import Grid from '@/components/Grid';
import { Icon } from '@/components/Icon/Icon';
import ManualCamConfigModal from '../Scheme/components/ManualCamConfigModal';
import CamItem from '../Box/components/CamItem';

import VideoPlayer from './components/VideoPlayer';
import { VideoState } from './components/VideoPlayer/VideoPlayer';

import ControlBar from './components/ControlBar';

const timeRangeOptions: SelectProps['options'] = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return {
        label: `${hour}:00-${hour + 1}:00`,
        value: hour
    };
});

function getColums(lenght: number): number {
    if (lenght <= 4) {
        return 2;
    }

    if (lenght <= 9) {
        return 3;
    }

    return 4;
}

type IVideo = Cam & {
    videos: Video[];
};

export const HistoryMultiVideo: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [listSelectedCam, setListSelectedCam] = useState<Cam[]>([]);

    const dispatch = useAppDispatch();
    const [listVideo, setListVideo] = useState<IVideo[]>([
        {
            deviceID: 'C21283M336',
            deviceName: 'C21283M336',
            placeName: 'HNI15001.1148 Đường Láng',
            // address: 'HNI15001.1148 Đường Láng',
            placeID: 12135,
            type: 0,
            videos: [
                {
                    createTime: '1680714015862',
                    day: '2023-04-06',
                    deviceId: 'C21283M336',
                    duration: '12',
                    enable: 1,
                    eventId: '814327810',
                    file: '/C21283M336/2023/04/06/2023-04-06-00-00-00.mp4',
                    month: '2023-04',
                    pathVideo: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
                    placeId: '12135',
                    thumb: 'https://s3.ap-northeast-1.wasabisys.com/video/thumb/C21283M336/2023/04/06/2023-04-06-00-00-00.jpg',
                    timestamp: '1680714000000',
                    type: 's3'
                }
            ]
        },
        {
            deviceID: 'C21281M576',
            deviceName: 'C21281M576',
            placeName: 'HNI19042.597 Nguyễn Trãi',
            // address: 'HNI19042.597 Nguyễn Trãi',
            placeID: 10227,
            type: 0,
            videos: []
        },
        {
            deviceID: 'C21201B755',
            deviceName: 'HN_597 Nguyễn Trãi Quầy',
            placeName: 'HNI19042.597 Nguyễn Trãi',
            // address: 'HNI19042.597 Nguyễn Trãi',
            placeID: 10227,
            type: 0,
            videos: []
        }
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    const [videoState, setVideoState] = useState<VideoState>({
        paused: true,
        currentTime: 0
    });

    const videoRef = useRef(null);

    const changeState = (state, prevState) => {
        // copy player state to this component's state
        // console.log(state);
        setVideoState((pre) => ({ ...pre, currentTime: state.currentTime }));
    };

    const finishSelectedCam = () => {
        setIsOpenModal(false);
    };
    const startSelectedCam = () => {
        setIsOpenModal(true);
    };

    const handleSubmitSeletedCam = (values) => {
        setListSelectedCam(values);
        finishSelectedCam();
    };

    const handleApplySetting = async (values) => {
        const { time, date } = values;

        const timestamp = 1000 * dayjs(date).startOf('date').add(time, 'h').unix();
        const devicesList = listSelectedCam.map((cam) => cam.deviceID).join(',');

        console.log(JSON.stringify({ deviceIDs: devicesList, time: timestamp.toString() }));

        setLoading(true);
        dispatch(getVideoHistory({ deviceIDs: devicesList, time: timestamp.toString() }))
            .unwrap()
            .then((res) => {
                if (res.videos) {
                    const list = listSelectedCam.map((item) => {
                        const listVideos = res.videos.filter(
                            (video) => video.deviceId === item.deviceID
                        );

                        console.log('listVideos', listVideos);

                        return {
                            ...item,
                            videos: listVideos
                        };
                    });
                    console.log('list', list);

                    setListVideo(list);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
        // setTimeout(() => {

        // }, 1500);
    };

    return (
        <Row className="hanet-history-video" justify="center">
            <Col span={20}>
                <Space style={{ display: 'flex' }} direction="vertical" size={12}>
                    <Form onFinish={handleApplySetting}>
                        <Row gutter={[8, 8]}>
                            <Col flex="auto">
                                {/* <Search
                            onFocus={handleFocus}
                            placeholder="Tìm kiếm"
                            // onSearch={onSearch}
                        /> */}
                                <Button style={{ width: '100%' }} onClick={startSelectedCam}>
                                    <Row justify="space-between">
                                        <Col>
                                            {listSelectedCam.length > 0
                                                ? `${listSelectedCam.length} camera`
                                                : 'Chọn camera'}
                                        </Col>
                                        <Col>
                                            <SearchOutlined />
                                        </Col>
                                    </Row>
                                </Button>
                            </Col>

                            <Col flex="200px">
                                <Form.Item
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày.'
                                        }
                                    ]}
                                >
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        placeholder="Chọn ngày"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col flex="200px">
                                <Form.Item
                                    name="time"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn thời điểm.'
                                        }
                                    ]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Chọn thời điểm"
                                        options={timeRangeOptions}
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={loading}
                                    loading={loading}
                                >
                                    Áp dụng
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <div className="body">
                        <Grid columns={getColums(listVideo.length)}>
                            {listVideo.map((camInfo, index) => {
                                return (
                                    <div key={camInfo.deviceID} className="video-item">
                                        {/* <video autoPlay controls className="video-item-player">
                                            <track kind="captions" />
                                            <source
                                                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                                type="video/mp4"
                                            />
                                        </video> */}
                                        <div className="video">
                                            {camInfo.videos.length > 0 ? (
                                                <VideoPlayer
                                                    src={camInfo.videos[0].pathVideo}
                                                    state={videoState}
                                                    changeState={changeState}
                                                    head={index === 0}
                                                />
                                            ) : (
                                                // <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg" />
                                                <div className="no-event">
                                                    <Space
                                                        direction="vertical"
                                                        style={{ margin: 'auto' }}
                                                    >
                                                        <Icon name="no-event" />
                                                        <div>Không có bản ghi</div>
                                                    </Space>
                                                </div>
                                            )}
                                            {/* <Player auto autoPlay {...videoState}>
                                            <source
                                                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                                type="video/mp4"
                                            />
                                        </Player> */}
                                        </div>

                                        <CamItem item={camInfo} />
                                    </div>
                                );
                            })}
                        </Grid>

                        <ControlBar />

                        <Button
                            onClick={() => {
                                setVideoState((pre) => ({ ...pre, paused: !pre.paused }));
                            }}
                        >
                            CLick
                        </Button>
                        <Button
                            onClick={() => {
                                setVideoState((pre) => ({ ...pre, currentTime: 10 }));
                            }}
                        >
                            Set current Time 10s
                        </Button>
                        <Button
                            onClick={() => {
                                setVideoState((pre) => ({ ...pre, currentTime: 20 }));
                            }}
                        >
                            Set current Time 20s
                        </Button>
                    </div>
                </Space>
            </Col>
            <ManualCamConfigModal
                onSubmit={handleSubmitSeletedCam}
                handleCancel={finishSelectedCam}
                open={isOpenModal}
                listSelected={listSelectedCam}
            />
        </Row>
    );
};
