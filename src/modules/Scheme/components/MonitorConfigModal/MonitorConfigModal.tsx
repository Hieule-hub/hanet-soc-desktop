import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Modal as HNModal,
    Col,
    Row,
    ModalProps,
    Space,
    Button,
    Checkbox,
    RadioChangeEvent
} from 'antd';

import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { MonitorConfig } from '@/types/scheme.type';
import RadioGroup from '@/components/RadioGroup';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/redux';

interface HNModalProps extends ModalProps {
    onClose: () => void;
    editingMonitor?: MonitorConfig | null;
    onSubmit: (list: MonitorConfig[]) => void;
    listSelected: MonitorConfig[];
    loadingSubmit?: boolean;
}

interface IOption {
    label: string;
    value: number | string;
}

const MonitorConfigModal: FC<HNModalProps> = ({
    onClose,
    editingMonitor = null,
    onSubmit,
    listSelected,
    loadingSubmit = false,
    ...props
}) => {
    const { monitorsList, loading } = useSelector((state: RootState) => state.monitor);

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [monitorLayout, setMonitorLayout] = useState<number>(1);
    const [plainOptions, setPlainOptions] = useState<IOption[]>([]);

    const [errorMessage, setErrormessage] = useState<string>('');

    useEffect(() => {
        if (monitorsList) {
            const newPlainOptions = monitorsList.map((item) => ({
                label: item.name,
                value: item.serial
            }));
            const selectedConfig = listSelected.map((item) => item.serial);
            const newOptions = newPlainOptions?.filter(
                (item) => !selectedConfig.includes(item.value)
            );

            setPlainOptions(newOptions);
        }
    }, [monitorsList, listSelected]);

    useEffect(() => {
        if (editingMonitor) {
            setMonitorLayout(editingMonitor.layout);
        }
    }, [editingMonitor]);

    const onChange = (list: CheckboxValueType[]) => {
        setErrormessage('');
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions.map((item) => item.value) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const handleConfirm = () => {
        if (editingMonitor) {
            //submit editing
            const list: MonitorConfig[] = [{ ...editingMonitor, layout: monitorLayout }];
            onSubmit(list);
        } else {
            if (checkedList.length === 0) {
                setErrormessage('Vui lòng chọn màn hình hiển thị.');
            } else {
                const list: MonitorConfig[] = monitorsList
                    .filter((item) => checkedList.includes(item.serial))
                    .map((item) => {
                        const { id, name, serial } = item;
                        return { id, name, serial, layout: monitorLayout };
                    });

                onSubmit(list);
            }
        }
    };

    const onChangeLayout = (e: RadioChangeEvent) => {
        setMonitorLayout(e.target.value);
    };

    const handleCancel = () => {
        onClose();
    };

    const afterClose = () => {
        setIndeterminate(false);
        setCheckedList([]);
        setCheckAll(false);
        setErrormessage('');
        setMonitorLayout(1);
    };

    return (
        <HNModal
            {...props}
            afterClose={afterClose}
            onCancel={handleCancel}
            title={
                editingMonitor ? `Cấu hình màn hình ${editingMonitor.name}` : 'Chọn kiểu màn hình'
            }
            className="hanet-ant-modal hanet-ant-modal-monitor-config"
            width={570}
            // centered
            footer={
                <Row align="middle" justify="space-between">
                    <Col>
                        <Button onClick={handleCancel}>Hủy</Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={handleConfirm}
                            disabled={
                                loadingSubmit || (plainOptions.length === 0 && !editingMonitor)
                            }
                            loading={loadingSubmit}
                        >
                            Lưu
                        </Button>
                    </Col>
                </Row>
            }
        >
            {plainOptions.length === 0 && !editingMonitor && (
                <div style={{ borderTop: '1px solid rgb(66, 66, 66)', padding: 16 }}>
                    Tất cả màn hình đã được cấu hình!
                </div>
            )}
            {(plainOptions.length !== 0 || editingMonitor) && (
                <>
                    {!editingMonitor && (
                        <Row
                            gutter={[8, 8]}
                            style={{ borderTop: '1px solid rgb(66, 66, 66)', padding: 16 }}
                        >
                            <div>Màn hình hiển thị</div>
                            <Col span={24}>
                                <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={onCheckAllChange}
                                    checked={checkAll}
                                >
                                    Tất cả
                                </Checkbox>
                            </Col>
                            <Col>
                                <Checkbox.Group value={checkedList} onChange={onChange}>
                                    <Row gutter={[8, 8]}>
                                        {plainOptions.map((item) => (
                                            <Col key={item.value}>
                                                <Checkbox value={item.value}>{item.label}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </Col>
                            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                        </Row>
                    )}
                    <Col span={24} style={{ borderTop: '1px solid rgb(66, 66, 66)', padding: 16 }}>
                        <RadioGroup
                            gutter={[16, 16]}
                            value={monitorLayout}
                            defaultValue={1}
                            onChange={onChangeLayout}
                        />
                    </Col>
                </>
            )}
        </HNModal>
    );
};

export default MonitorConfigModal;
