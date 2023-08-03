import React, { FC, useEffect, useState } from 'react';
import {
    Modal as HNModal,
    Input,
    List,
    Select,
    Checkbox,
    Row,
    Col,
    ModalProps,
    Space,
    Button,
    InputRef
} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import lang from 'src/constants/lang';
import _ from 'lodash';
import {
    useGetDevicesMutation,
    useGetListPlaceQuery,
    useGetDistrictQuery,
    useGetProvincesQuery
} from '@/stores/redux/services/region.service';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Cam } from '@/types/cam.type';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { Place } from '@/types/region.type';
import CheckItem from '../CheckDeviceItem';

//import static data
// import { distributors } from '@constants/distributors';

interface HNModalProps extends ModalProps {
    onSubmit: (values: any, type: string) => void;
    handleCancel: () => void;
    listSelected: Cam[];
}

const ManualCamConfigModal: FC<HNModalProps> = (props) => {
    const { open, handleCancel, onSubmit, listSelected } = props;

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [devicesList, setDevicesList] = useState<Cam[]>([]);
    const [listSelectedTemporary, setListSelectedTemporary] = useState([]);
    const [filter, setFilter] = useState({
        province: null,
        district: null,
        text_search: ''
    });

    const [storeSelected, setStoreSelected] = useState<string>('');

    useEffect(() => {
        setListSelectedTemporary(listSelected);
    }, [listSelected]);

    useEffect(() => {
        setCheckedList(listSelectedTemporary.map((item) => item.deviceID));
    }, [listSelectedTemporary]);

    //filer data

    const { data: provinces = [], isFetching, isError } = useGetProvincesQuery('0');
    const { data: districts = [] } = useGetDistrictQuery(filter.province, { skip: !filter.province });
    const [getDevices, getDevicesResult] = useGetDevicesMutation();
    const { data: listStore, isFetching: isFetchingStore } = useGetListPlaceQuery(
        {
            provinceCode: filter.province,
            districtCode: filter.district || '',
            address: filter.text_search
        },
        { skip: !filter.province }
    );

    const [keyword, setkeyword] = useState<string>('');

    useEffect(() => {
        if (storeSelected) {
            getDevices(storeSelected)
                .unwrap()
                .then((res) => {
                    setDevicesList(res);
                });
        }
    }, [storeSelected]);

    const handleProvinceChange = (value) => {
        setFilter({
            province: value,
            district: null,
            text_search: ''
        });
        setkeyword('');
    };

    const handleDistrictChange = (value) => {
        setFilter((pre) => ({
            ...pre,
            district: value
        }));
    };

    const onUnCheckItem = (id: any) => {
        setListSelectedTemporary((pre) => pre.filter((item) => item.deviceID !== id));
    };

    const handleOk = () => {
        onSubmit(listSelectedTemporary, 'cam');
        setStoreSelected('');
        setDevicesList([]);
    };

    const handleSelectStore = (placeId: string) => {
        setStoreSelected(placeId);
    };

    const onCancel = () => {
        setListSelectedTemporary(listSelected);
        setStoreSelected('');
        setDevicesList([]);
        handleCancel();
    };

    const handleCheckBoxCam = (e: CheckboxChangeEvent) => {
        const { value, checked } = e.target;
        if (checked) {
            const foundCam = devicesList.find((item) => item.deviceID === value);
            setListSelectedTemporary((pre) => [...pre, foundCam]);
        } else {
            setListSelectedTemporary((pre) => pre.filter((item) => item.deviceID !== value));
        }
    };

    const handleSearchText = (value: string) => {
        setFilter((pre) => ({
            ...pre,
            text_search: value
        }));
    };

    return (
        <HNModal
            title={lang.CAMGRID_MANUAL_MODAL_TITLE}
            open={open}
            onCancel={onCancel}
            width={640}
            className="hanet-manual-cam-config-modal-ant hanet-ant-modal"
            footer={
                <Row align="middle">
                    <Col span={20}>
                        <Row>
                            {lang.CAMGRID_SELECTED_TITLE} {checkedList.length}
                        </Row>
                        <Row>
                            <div style={{ margin: '8px 0px' }}>
                                <Space wrap>
                                    {listSelectedTemporary.map((cam) => {
                                        return (
                                            <CheckItem
                                                item={cam}
                                                key={cam.deviceID}
                                                onRemove={() => {
                                                    onUnCheckItem(cam.deviceID);
                                                }}
                                            />
                                        );
                                    })}
                                </Space>
                            </div>
                        </Row>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={handleOk}>
                            {lang.CAMGRID_SELECT_TITLE}
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Row
                gutter={[8, 8]}
                style={{
                    padding: 16,
                    borderTop: '1px solid rgb(66, 66, 66)',
                    marginTop: 10
                }}
            >
                <Col span={8}>
                    <Select
                        placeholder="Tỉnh/Thành phố"
                        style={{ width: '100%' }}
                        onChange={handleProvinceChange}
                        options={provinces?.map((province) => ({
                            label: province.Name,
                            value: province.Code
                        }))}
                    />
                </Col>
                <Col span={8}>
                    <Select
                        placeholder="Quận/Huyện"
                        value={filter.district}
                        style={{ width: '100%' }}
                        onChange={handleDistrictChange}
                        options={districts?.map((district) => ({
                            label: district.Name,
                            value: district.Code
                        }))}
                    />
                </Col>
                <Col span={8}>
                    <Input.Search
                        placeholder="Địa chỉ"
                        value={keyword}
                        onSearch={handleSearchText}
                        onChange={(e) => {
                            setkeyword(e.target.value);
                        }}
                        allowClear
                        // suffix={
                        //     <Tooltip title="Nhập thông tin cần tìm">
                        //         <SearchOutlined />
                        //     </Tooltip>
                        // }
                    />
                </Col>
            </Row>
            <Row style={{ borderTop: '1px solid #424242', borderBottom: '1px solid #424242' }}>
                <Col span={12}>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 300,
                            overflow: 'auto',
                            borderRight: '1px solid #424242'
                        }}
                    >
                        <List
                            className="hanet-location-list"
                            itemLayout="horizontal"
                            dataSource={listStore}
                            loading={isFetchingStore}
                            renderItem={(item) => (
                                <List.Item
                                    className={`hanet-location-item ${
                                        item.PlaceId === storeSelected ? 'item-selected' : ''
                                    }`}
                                    style={{ width: '100%' }}
                                >
                                    <Button
                                        style={{ width: '100%', boxShadow: 'none' }}
                                        onClick={() => handleSelectStore(item.PlaceId)}
                                    >
                                        <Row justify="space-between">
                                            <Col span={14}>
                                                <div className="label">{item.OfficeName}</div>
                                            </Col>

                                            {item.ListCamera?.length > 0 && (
                                                <Col span={2}>
                                                    <div>{item.ListCamera.length} camera</div>
                                                </Col>
                                            )}

                                            <Col span={2}>
                                                <RightOutlined />
                                            </Col>
                                        </Row>
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 300,
                            padding: '0 16px',
                            overflow: 'auto'
                            // background: '#191919'
                        }}
                    >
                        <Checkbox.Group style={{ width: '100%' }} value={checkedList}>
                            <List
                                dataSource={devicesList}
                                style={{ width: '100%' }}
                                loading={getDevicesResult.isLoading}
                                renderItem={(item) => (
                                    <List.Item style={{ borderBlockEnd: 'none' }}>
                                        <Checkbox
                                            value={item.deviceID}
                                            onChange={handleCheckBoxCam}
                                        >
                                            <span style={{ padding: '0 5px' }}>
                                                {item.deviceName}
                                            </span>
                                        </Checkbox>
                                    </List.Item>
                                )}
                            />
                        </Checkbox.Group>
                    </div>
                </Col>
            </Row>
        </HNModal>
    );
};

export default ManualCamConfigModal;
