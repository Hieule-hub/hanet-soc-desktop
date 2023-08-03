import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Space, Button, Form, Input, FormInstance } from 'antd';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import Empty from '@/components/Empty';

//redux
import { useAppDispatch } from '@/stores/redux';
import { getSchemesList } from '@/stores/redux/thunks/scheme.thunk';

import lang from '@/constants/lang';
import checkArrayIncludeObject from '@/utils/check-array-include-object';

//type
import type { MonitorConfig, SchemeFieldFormValues } from '@/types/scheme.type';
import type { Cam } from '@/types/cam.type';

import ManualCamConfigModal from '../ManualCamConfigModal';
import ConditionalCamConfigModal from '../ConditionalCamConfigModal';
import MonitorConfigModal from '../MonitorConfigModal';
import CardMonitorControl from '../CardMonitorControl';
import ModalConfirmDeleteScheme from '../ModalConfirmDeleteScheme';
import CheckItem from '../CheckDeviceItem';

const { TextArea } = Input;

const initialFormValues: SchemeFieldFormValues = {
    name: '',
    description: '',
    monitorConfigList: [],
    camsList: [],
    conditionalCamList: [],
    interval: 30000
};

interface Props {
    formData?: SchemeFieldFormValues;
    submitAction: (values: SchemeFieldFormValues) => Promise<any>;
}

export const SchemeForm: React.FC<Props> = ({ formData = null, submitAction }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [form] = Form.useForm<SchemeFieldFormValues>();

    const [listSelectedCam, setListSelectedCam] = useState<Cam[]>([]);
    const [listSelectedCondition, setListSelectedCondition] = useState([]);

    const [listMonitorsConfig, setListMonitorsConfig] = useState<MonitorConfig[]>([]);

    const [isModalCondOpen, setIsModalCondOpen] = useState(false);
    const [isModalManOpen, setIsModalManOpen] = useState(false);

    const setFormData = useCallback(
        (data: SchemeFieldFormValues) => {
            form.setFieldsValue(data);
            setListMonitorsConfig(data.monitorConfigList);
            setListSelectedCam(data.camsList);
            setListSelectedCondition(data.conditionalCamList);
        },
        [form]
    );

    useEffect(() => {
        if (formData) {
            setFormData(formData);
        }
    }, [formData, setFormData]);

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

    const handleOkModal = (values: any, type: string) => {
        if (type === 'cam') {
            setListSelectedCam(values);
            form.setFieldsValue({ camsList: values });
            onCloseManModal();
        } else {
            setListSelectedCondition(values);
            form.setFieldsValue({ conditionalCamList: values });
            onCloseCondModal();
        }
    };

    const onUnCheckItem = (id: string, type: string) => {
        if (type === 'cam') {
            const newList = listSelectedCam.filter((_item) => _item.deviceID !== id);
            form.setFieldsValue({ camsList: newList });
            setListSelectedCam(newList);
        } else {
            const newList = listSelectedCondition.filter((_item) => _item.id !== id);
            form.setFieldsValue({ conditionalCamList: newList });
            setListSelectedCondition(newList);
        }
    };

    const handleSubmit = (values: SchemeFieldFormValues) => {
        console.log('values', values);

        submitAction({ ...values, monitorConfigList: listMonitorsConfig })
            .then(() => {
                if (!formData) {
                    router.push('/scheme');
                }
                dispatch(getSchemesList());
            })
            .catch(() => {
                if (formData) {
                    setFormData(formData);
                }
            });
    };

    return (
        <Form
            form={form}
            id="form-test"
            layout="vertical"
            initialValues={initialFormValues}
            onFinish={handleSubmit}
        >
            <Row gutter={[16, 2]} style={{ marginBottom: 8 }}>
                <Col xl={10} md={12} span={24}>
                    <Card bordered={false}>
                        <Form.Item
                            name="name"
                            label="Tên kịch bản"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên kịch bản!'
                                }
                            ]}
                        >
                            <Input placeholder="Nhập tên template" />
                        </Form.Item>
                        <Form.Item name="description">
                            <TextArea placeholder="Nhập mô tả" />
                        </Form.Item>

                        <Form.Item name="camsList" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="interval" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="conditionalCamList" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="monitorConfigList" hidden>
                            <Input />
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 8]}>
                <Col xl={10} md={12} span={24}>
                    <Space direction="vertical" style={{ display: 'flex' }} size={2}>
                        <Card
                            bordered={false}
                            className="hanet-ant-card"
                            title={<div className="title">Thêm thiết bị</div>}
                            extra={
                                <Space>
                                    <Button onClick={showManModal}>
                                        {lang.CAMGRID_MANUAL_BTN_TITLE}
                                    </Button>
                                    <Button onClick={showCondModal}>
                                        {lang.CAMGRID_CONDITIONAL_BTN_TITLE}
                                    </Button>
                                </Space>
                            }
                        >
                            {listSelectedCondition.length > 0 ||
                                (listSelectedCam.length > 0 && (
                                    <div>
                                        Danh sách camera <br /> *Trường hợp chọn nhiều hơn số lượng
                                        hiển thị, các camera sẽ auto refresh theo thời gian được cài
                                        đặt
                                    </div>
                                ))}

                            <Row align="middle">
                                {listSelectedCondition.length > 0 && (
                                    <Col span={20}>
                                        <Row style={{ marginTop: '20px', marginBottom: '8px' }}>
                                            <Space wrap>
                                                {/* <Select mode="multiple" allowClear bordered={false} /> */}
                                                {listSelectedCondition.map((_item) => {
                                                    return (
                                                        <CheckItem
                                                            key={_item.id}
                                                            item={_item}
                                                            onRemove={() => {
                                                                onUnCheckItem(_item.id, 'con');
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Space>
                                        </Row>
                                    </Col>
                                )}

                                {listSelectedCam.length > 0 && (
                                    <Col span={20}>
                                        <Row style={{ marginTop: '20px', marginBottom: '8px' }}>
                                            <Space wrap>
                                                {/* <Select mode="multiple" allowClear bordered={false} /> */}
                                                {listSelectedCam.map((_item) => {
                                                    return (
                                                        <CheckItem
                                                            showPlaceName
                                                            item={_item}
                                                            key={_item.deviceID}
                                                            onRemove={() => {
                                                                onUnCheckItem(
                                                                    _item.deviceID,
                                                                    'cam'
                                                                );
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Space>
                                        </Row>
                                    </Col>
                                )}
                                {!(listSelectedCondition.length > 0) &&
                                    !(listSelectedCam.length > 0) && (
                                        <Col span={24} style={{ padding: '12px 8px' }}>
                                            <Empty />
                                        </Col>
                                    )}
                            </Row>
                        </Card>
                    </Space>
                </Col>
                <Col xl={10} md={12} span={24}>
                    <CardMonitorControl
                        listMonitorsConfig={listMonitorsConfig}
                        setListMonitorsConfig={setListMonitorsConfig}
                    />
                </Col>
            </Row>
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

            <ModalConfirmDeleteScheme />
        </Form>
    );
};
