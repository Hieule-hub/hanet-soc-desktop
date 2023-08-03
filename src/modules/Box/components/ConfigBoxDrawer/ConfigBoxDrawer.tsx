import React, { FC, useEffect, useState } from 'react';
import {
    Drawer as HNDrawer,
    Row,
    Col,
    Form,
    Radio,
    Input,
    Button,
    DrawerProps,
    Space,
    InputNumber
} from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

import checkArrayIncludeObject from '@/utils/check-array-include-object';

//redux
import { RootState, useAppDispatch } from '@/stores/redux';
import { useDispatch, useSelector } from 'react-redux';
import {
    cancelConfigBox
    //  updateConfigBox
} from '@/stores/redux/reducers/monitor.slice';

import { resetConfigBox, updateConfigBox } from '@/stores/redux/thunks/box.thunk';

//type
import type { Cam } from '@/types/cam.type';
import { FormFieldValuesConfigBox } from '@/types/monitor.type';

import lang from 'src/constants/lang';
import RadioGroup from '@/components/RadioGroup';
import CheckItem from '@/modules/Scheme/components/CheckDeviceItem';

import { Extra } from '@/components/Extra';
import ConditionalCamConfigModal from '../../../Scheme/components/ConditionalCamConfigModal';
import ManualCamConfigModal from '../../../Scheme/components/ManualCamConfigModal';
import ListCamsLiveStream from '../ListCamsLiveStream';

interface Props extends DrawerProps {}

const initFormValues: FormFieldValuesConfigBox = {
    serial: '',
    layout: null,
    interval: 30000,
    camsList: [],
    conditionList: []
};

export const ConfigBoxDrawer: FC<Props> = (props) => {
    const [layout, setLayout] = useState(null);

    const { configBox, loading } = useSelector((state: RootState) => state.monitor);
    const dispatch = useAppDispatch();

    const [listSelectedCam, setListSelectedCam] = useState<Cam[]>([]);
    const [listSelectedCondition, setListSelectedCondition] = useState([]);

    const [isModalCondOpen, setIsModalCondOpen] = useState(false);
    const [isModalManOpen, setIsModalManOpen] = useState(false);

    const [formScreen] = Form.useForm<FormFieldValuesConfigBox>();

    const [listCamShow, setListCamShow] = useState<Cam[]>([]);
    const [listCamWait, setListCamWait] = useState<Cam[]>([]);

    const [configOfBox, setConfigOfBox] = useState<any | null>(null);

    useEffect(() => {
        if (configBox) {
            const { config } = configBox;
            formScreen.setFieldsValue({
                serial: configBox.serial
            });
            if (config) {
                setConfigOfBox(config);
                setListCamShow(config.pageDetail);
                //     formScreen.setFieldsValue({
                //         layout: config.layout || null,
                //         interval: config.interval,
                //         camsList: config?.cams || [],
                //         conditionList: []
                //     });
                //     setLayout(config.layout?.toString() || null);
                //     setListSelectedCam(config?.cams || []);
                //     setListSelectedCondition([]);
            }
        }
    }, [configBox, formScreen]);

    useEffect(() => {
        if (configBox?.config) {
            setListCamWait(
                configBox.config.cams.filter(
                    (cam) => !listCamShow.find((item) => item.deviceID === cam.deviceID)
                )
            );
        }
    }, [listCamShow]);

    // modal
    const showCondModal = () => {
        setIsModalCondOpen(true);
    };
    const onCloseCondModal = () => {
        setIsModalCondOpen(false);
    };

    const showManModal = () => {
        setIsModalManOpen(true);
    };
    const onCloseManModal = () => {
        setIsModalManOpen(false);
    };

    const onUnCheckCamItem = (id: string) => {
        const newList = listSelectedCam.filter((_item) => _item.deviceID !== id);
        formScreen.setFieldsValue({
            camsList: newList
        });
        setListSelectedCam(newList);
    };
    const onUnCheckConItem = (id: string) => {
        const newList = listSelectedCondition.filter((_item) => _item.id !== id);
        formScreen.setFieldsValue({
            conditionList: newList
        });
        setListSelectedCondition(newList);
    };

    const resetAllData = () => {
        formScreen.setFieldsValue(initFormValues);
        setLayout(null);
        setListSelectedCam([]);
        setListSelectedCondition([]);
    };

    const onFinishEditConfig = () => {
        dispatch(cancelConfigBox());
    };

    const onSubmitEdit = (values: FormFieldValuesConfigBox) => {
        const newConfigBox = values;

        dispatch(updateConfigBox(newConfigBox))
            .unwrap()
            .then(() => {
                onFinishEditConfig();
            });
    };

    const handleOkModal = (values: any, type: string) => {
        if (type === 'cam') {
            setListSelectedCam(values);
            formScreen.setFieldsValue({ camsList: values });
            onCloseManModal();
        } else {
            setListSelectedCondition(values);
            formScreen.setFieldsValue({ conditionList: values });
            onCloseCondModal();
        }
    };

    const onResetConfig = () => {
        dispatch(resetConfigBox(configBox.serial))
            .unwrap()
            .then(() => {
                onFinishEditConfig();
            });
    };

    const afterOpenChange = (open) => {
        if (!open) {
            if (configOfBox) {
                setConfigOfBox(null);
                resetAllData();
            }
        }
    };

    return (
        <HNDrawer
            key="layoutDrawer"
            placement="right"
            className="hanet-ant-drawer"
            width={420}
            afterOpenChange={afterOpenChange}
            onClose={onFinishEditConfig}
            open={!!configBox}
            extra={<Extra title={configBox?.name} onClose={onFinishEditConfig} />}
            footer={
                <Row justify="end" gutter={[10, 10]} align="middle">
                    {configOfBox && (
                        <Col>
                            <Button
                                onClick={onResetConfig}
                                loading={loading}
                                disabled={configBox?.status === 0}
                            >
                                {lang.CAMGRID_RESET_TITLE}
                            </Button>
                        </Col>
                    )}
                    {!configOfBox && (
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => formScreen.submit()}
                                loading={loading}
                                disabled={configBox?.status === 0}
                            >
                                {lang.CAMGRID_OK_TITLE}
                            </Button>
                        </Col>
                    )}
                </Row>
            }
        >
            {!configOfBox && (
                <Form
                    form={formScreen}
                    layout="vertical"
                    onFinish={onSubmitEdit}
                    initialValues={initFormValues}
                >
                    <Form.Item
                        name="layout"
                        label="Chọn layout"
                        rules={[{ required: true, message: 'Vui lòng chọn layout!' }]}
                    >
                        <RadioGroup
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            gutter={[8, 8]}
                        />
                    </Form.Item>

                    <Form.Item name="serial" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="interval" hidden>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="camsList" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="conditionList" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Danh sách camera">
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Button onClick={showManModal} style={{ width: '100%' }}>
                                    {lang.CAMGRID_MANUAL_BTN_TITLE}
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button onClick={showCondModal} style={{ width: '100%' }}>
                                    {lang.CAMGRID_CONDITIONAL_BTN_TITLE}
                                </Button>
                            </Col>
                        </Row>
                        <Row align="middle">
                            <Col span={20}>
                                <Row style={{ marginTop: '20px', marginBottom: '8px' }}>
                                    <Space wrap>
                                        {/* <Select mode="multiple" allowClear bordered={false} /> */}
                                        {listSelectedCondition?.map((_item) => {
                                            return (
                                                <CheckItem
                                                    item={_item}
                                                    key={_item.id}
                                                    onRemove={() => {
                                                        onUnCheckConItem(_item.id);
                                                    }}
                                                />
                                            );
                                        })}

                                        {listSelectedCam?.map((_item) => {
                                            return (
                                                <CheckItem
                                                    showPlaceName
                                                    item={_item}
                                                    key={_item.deviceID}
                                                    onRemove={() => {
                                                        onUnCheckCamItem(_item.deviceID);
                                                    }}
                                                />
                                            );
                                        })}
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Item>
                    <ManualCamConfigModal
                        open={isModalManOpen}
                        onSubmit={handleOkModal}
                        handleCancel={onCloseManModal}
                        title={lang.CAMGRID_MANUAL_MODAL_TITLE}
                        listSelected={listSelectedCam}
                    />
                    <ConditionalCamConfigModal
                        open={isModalCondOpen}
                        onSubmit={handleOkModal}
                        handleCancel={onCloseCondModal}
                        title={lang.CAMGRID_CONDITIONAL_MODAL_TITLE}
                        listSelected={listSelectedCondition}
                    />
                </Form>
            )}
            {configOfBox && (
                <ListCamsLiveStream listCamShow={listCamShow} lisCamWait={listCamWait} />
            )}
        </HNDrawer>
    );
};
