import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Switch } from 'antd';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

import type { FormFieldValues, Monitor } from '@/types/monitor.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/stores/redux';
import {
    finishEditingMonitor,
    finishAddMonitor,
    startDeleteMonitor
} from '@/stores/redux/reducers/monitor.slice';

import { addMonitor, getMonitorsList, updateMonitor } from '@/stores/redux/thunks/monitor.thunk';

interface Props {}

const initialValues: FormFieldValues = {
    name: '',
    serial: ''
};

export const DrawMonitor: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const {
        isOpenDrawMonitor,
        editMonitor: editMNT,
        loading
    } = useSelector((state: RootState) => state.monitor);

    const [editMonitor, setEditMonitor] = useState<Monitor | null>(null);

    const [form] = Form.useForm<FormFieldValues>();
    const [enable, setEnable] = useState(0);

    useEffect(() => {
        if (editMNT) {
            setEditMonitor(editMNT);
            form.setFieldsValue(editMNT);
            setEnable(editMNT.enable);
        }
    }, [editMNT, form]);

    const onClose = () => {
        if (editMonitor) {
            dispatch(finishEditingMonitor());
        } else {
            dispatch(finishAddMonitor());
        }
    };

    const resetForm = () => {
        form.setFieldsValue(initialValues);
    };

    const hanldleAfterOpenChange = (open) => {
        if (!open) {
            resetForm();
            setEditMonitor(null);
        }
    };

    const onSumbit = async (values: FormFieldValues) => {
        try {
            if (editMonitor) {
                await dispatch(updateMonitor({ id: editMonitor.id, body: values })).unwrap();
            } else {
                await dispatch(addMonitor(values)).unwrap();
            }
            await dispatch(getMonitorsList()).unwrap();
        } catch (error) {
            console.log('SUBMIT ERROR:', error);
        }
        onClose();
    };

    const onChangeSwitch = (checked) => {
        if (checked) {
            setEnable(1);
            form.setFieldsValue({ enable: 1 });
        } else {
            setEnable(0);
            form.setFieldsValue({ enable: 0 });
        }
    };

    const handleDeleteMonitor = useCallback(() => {
        if (editMonitor) {
            dispatch(startDeleteMonitor(editMonitor.id));
        }
    }, [dispatch, editMonitor]);

    return (
        <Drawer
            className="hanet-ant-drawer"
            placement="right"
            onClose={onClose}
            open={isOpenDrawMonitor}
            getContainer={false}
            afterOpenChange={hanldleAfterOpenChange}
            extra={
                <div>
                    <Row justify="space-between" align="middle" className="header">
                        <Col>
                            {!editMonitor && <div>Thêm màn hình</div>}
                            {editMonitor && <div>Sửa màn hình</div>}
                        </Col>
                        <Col>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={onClose}
                                disabled={loading}
                            />
                        </Col>
                    </Row>
                </div>
            }
            footer={
                <Row justify="space-between" gutter={[10, 10]} align="middle">
                    <Col>
                        {editMonitor && (
                            <Button danger onClick={handleDeleteMonitor} disabled={loading}>
                                Xóa
                            </Button>
                        )}
                    </Col>
                    <Col>
                        <Button type="primary" onClick={() => form.submit()} loading={loading}>
                            {editMonitor ? 'Sửa' : 'Thêm'}
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Form
                form={form}
                onFinish={onSumbit}
                // layout="vertical"
            >
                <Form.Item
                    name="name"
                    // label="Tên màn hình hiển thị"
                    rules={[{ required: true, message: 'Vui lòng nhập vào tên màn hình!' }]}
                >
                    <Input placeholder="Tên TV" />
                </Form.Item>
                <Form.Item
                    name="serial"
                    // label="Số serial"
                    rules={[
                        { required: true, message: 'Vui lòng nhập vào số serial.' },
                        { min: 2, message: 'Serial ít nhất 2 kí tự.' }
                    ]}
                >
                    <Input placeholder="Serial" />
                </Form.Item>
                {editMonitor && (
                    <>
                        <Form.Item label="Hiển thị màn hình">
                            <Switch checked={enable === 1} onChange={onChangeSwitch} />
                        </Form.Item>
                        <Form.Item name="enable" hidden>
                            <Input />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Drawer>
    );
};
