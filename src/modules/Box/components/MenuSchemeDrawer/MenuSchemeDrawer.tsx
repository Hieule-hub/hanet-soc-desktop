import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Drawer, Button, Row, Col, Checkbox, Modal, Form, List, Input, Tooltip } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

//compontents
import { Extra } from '@/components/Extra';

//type
import type { MonitorConfig, Scheme } from '@/types/scheme.type';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { finishChooseScheme } from '@/stores/redux/reducers/monitor.slice';
import { applyScheme } from '@/stores/redux/thunks/box.thunk';
import { RootState, useAppDispatch } from '@/stores/redux';

import MonitorConfigModal from '@/modules/Scheme/components/MonitorConfigModal';
import MenuSchemeItem from './MenuSchemeItem';

interface Props {}

const filterListWithText = (list: Array<any>, text: string) => {
    const _list = _.filter(list, (o) => _.includes(_.toLower(o.name), _.toLower(text)));
    return _list;
};

export const MenuSchemeDrawer: React.FC = () => {
    const dispatch = useAppDispatch();

    const { isShowMenuScheme } = useSelector((state: RootState) => state.monitor);
    const { schemesList, loading } = useSelector((state: RootState) => state.scheme);
    const [listSchemies, setListSchemies] = useState<Scheme[]>([]);

    const [isApplyScheme, setIsApplyScheme] = useState<boolean>(false);

    useEffect(() => {
        if (schemesList) {
            setListSchemies(schemesList);
        }
    }, [schemesList]);

    const [isShowModalChooseScreen, setIsShowModalChooseScreen] = useState(false);

    const [itemActive, setItemActive] = useState<number | null>(null);

    const cancelChooseScheme = () => {
        dispatch(finishChooseScheme());
    };
    const openModalChooseScreen = () => {
        setIsShowModalChooseScreen(true);
    };
    const closeModalChooseScreen = () => {
        setIsShowModalChooseScreen(false);
    };

    const afterOpenChange = (open: boolean) => {
        if (!open) {
            setItemActive(null);
        }
    };

    const handleClick = (id: number) => {
        setItemActive(id);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const keyword = e.target.value;
        setListSchemies(filterListWithText(schemesList, keyword));
    };

    const handleApplyScheme = (scheme: Scheme) => {
        if (scheme.detail.monitorConfigList.length === 0) {
            openModalChooseScreen();
        } else {
            setIsApplyScheme(true);
            dispatch(applyScheme({ id: scheme.id }))
                .unwrap()
                .finally(() => {
                    setIsApplyScheme(false);
                    dispatch(finishChooseScheme());
                });
        }
    };

    const handleSubmit = (list: MonitorConfig[]) => {
        setIsApplyScheme(true);
        dispatch(applyScheme({ id: itemActive, monitorConfigList: list }))
            .unwrap()
            .then(() => {
                closeModalChooseScreen();
                dispatch(finishChooseScheme());
            })
            .finally(() => setIsApplyScheme(false));
    };

    return (
        <>
            <Drawer
                placement="right"
                afterOpenChange={afterOpenChange}
                onClose={cancelChooseScheme}
                className="hanet-scheme-choose-ant-drawer hanet-ant-drawer"
                open={isShowMenuScheme}
                extra={
                    <div>
                        <Extra
                            title="Chọn kịch bản"
                            onClose={cancelChooseScheme}
                            className="header"
                        />
                        <Row>
                            <Input
                                size="large"
                                placeholder="Tìm kịch bản"
                                className="search-input"
                                onChange={onSearch}
                                suffix={<SearchOutlined />}
                            />
                        </Row>
                    </div>
                }
            >
                <List
                    dataSource={listSchemies}
                    loading={loading}
                    renderItem={(item) => {
                        return (
                            <List.Item onClick={() => handleClick(item.id)}>
                                <MenuSchemeItem
                                    data={item}
                                    active={itemActive === item.id}
                                    isLoading={isApplyScheme}
                                    onApply={handleApplyScheme}
                                />
                            </List.Item>
                        );
                    }}
                />
            </Drawer>

            <MonitorConfigModal
                open={isShowModalChooseScreen}
                onClose={closeModalChooseScreen}
                onSubmit={handleSubmit}
                listSelected={[]}
            />
        </>
    );
};
