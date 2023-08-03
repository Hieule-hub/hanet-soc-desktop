import React, { FC, useEffect, useState } from 'react';
import {
    Modal as HNModal,
    Col,
    Row,
    List,
    Checkbox,
    Select,
    ModalProps,
    Space,
    Button
} from 'antd';
import lang from 'src/constants/lang';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetListRankTypeQuery } from '@/stores/redux/services/region.service';
import { RankType } from '@/types/region.type';
import CheckItem from '../CheckDeviceItem';

interface HNModalProps extends ModalProps {
    onSubmit: (values: any, type: string) => void;
    listSelected: any[];
    handleCancel: () => void;
}

const ConditionalCamConfigModal: FC<HNModalProps> = (props) => {
    const { onSubmit, open, handleCancel, listSelected } = props;
    const [checkedList, setCheckedList] = useState([]);
    // const [indeterminate, setIndeterminate] = useState(false);
    // const [checkAll, setCheckAll] = useState(false);

    const { data: conditionList, isFetching } = useGetListRankTypeQuery();

    const [listCondition, setListCondition] = useState<RankType[]>([]);
    const [listSelectedTemporary, setlistSelectedTemporary] = useState<RankType[]>([]);

    useEffect(() => {
        if (conditionList) {
            setListCondition(conditionList);
        }
    }, [conditionList]);

    useEffect(() => {
        setlistSelectedTemporary(listSelected);
    }, [listSelected]);

    useEffect(() => {
        setCheckedList(listSelectedTemporary.map((item) => item.id));
    }, [listSelectedTemporary]);

    const handleOk = () => {
        //submit
        onSubmit(listSelectedTemporary, 'con');
    };

    const onUnCheckItem = (id: number) => {
        setlistSelectedTemporary((pre) => pre.filter((item) => item.id !== id));
    };

    const handleCheckBoxCam = (e: CheckboxChangeEvent) => {
        const { value, checked } = e.target;
        if (checked) {
            const foundCam = listCondition.find((item) => item.id === value);
            setlistSelectedTemporary((pre) => [...pre, foundCam]);
            // setCheckedList((pre) => [...pre, value]);
        } else {
            setlistSelectedTemporary((pre) => pre.filter((item) => item.id !== value));
            // setCheckedList((pre) => pre.filter((item) => item !== value));
        }
    };

    const onCancel = () => {
        setlistSelectedTemporary(listSelected);
        handleCancel();
    };

    return (
        <HNModal
            title={lang.CAMGRID_CONDITIONAL_MODAL_TITLE}
            open={open}
            onCancel={onCancel}
            cancelText={lang.CAMGRID_CANCEL_TITLE}
            className="hanet-manual-cam-config-modal-ant hanet-ant-modal"
            width={568}
            footer={
                <Row align="middle">
                    <Col span={20}>
                        <Row>
                            {lang.CAMGRID_SELECTED_TITLE} {checkedList.length}
                        </Row>
                        <Row>
                            <Space wrap style={{ margin: '8px 0px' }}>
                                {listSelectedTemporary.map((item) => {
                                    return (
                                        <CheckItem
                                            key={item.id}
                                            item={item}
                                            onRemove={() => {
                                                onUnCheckItem(item.id);
                                            }}
                                        />
                                    );
                                })}
                            </Space>
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
                style={{
                    borderTop: '1px solid #424242',
                    borderBottom: '1px solid #424242',
                    background: '#191919'
                }}
            >
                <Col span={24}>
                    <div id="scrollableDiv" style={{ maxHeight: 300, overflow: 'auto' }}>
                        <Checkbox.Group value={checkedList}>
                            <List
                                dataSource={listCondition || []}
                                loading={isFetching}
                                style={{ width: '100%', padding: 12 }}
                                renderItem={(item) => (
                                    <List.Item style={{ borderBlockEnd: 'none', padding: '7px 0' }}>
                                        <Checkbox
                                            key={item.id}
                                            value={item.id}
                                            onChange={handleCheckBoxCam}
                                        >
                                            <span style={{ padding: 5 }}>{item.name}</span>
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

export default ConditionalCamConfigModal;
