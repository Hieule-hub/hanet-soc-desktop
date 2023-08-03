import React, { FC, useState, useCallback, Fragment } from 'react';
import { Button, Space, Col, Row, Form, Input, Typography, Tooltip } from 'antd';
import { DragOutlined, CloseOutlined } from '@ant-design/icons';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
    endDragMode,
    startConfigBox,
    startDragMode,
    updateIndexBox
} from '@/stores/redux/reducers/monitor.slice';

import { updateIndexBoxApi } from '@/stores/redux/thunks/box.thunk';

import lang from '@constants/lang';

//components

import {
    DndContext,
    // closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent
} from '@dnd-kit/core';
import { arraySwap, arrayMove, SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import Grid from '@components/Grid';

import { RootState, useAppDispatch } from '@/stores/redux';
import Loading from '@/components/Loading';

import { Monitor } from '@/types/monitor.type';

// import { useWebsocket } from '@/provider/socket.context';
import SortableCamItem from '../SortableItem';

const ButtonGroup = Button.Group;

export const BoxList = () => {
    const dispatch = useAppDispatch();
    // const socket = useWebsocket();
    const { isDragMode, monitorsList, loading } = useSelector((state: RootState) => state.monitor);

    const [gridCount, setGridCount] = useState(5);

    //form

    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleEdit = (serial: string) => {
        dispatch(startConfigBox(serial));
    };

    const enableDragMode = () => {
        dispatch(startDragMode());
    };

    const disableDragMode = () => {
        dispatch(endDragMode());
    };

    // begin drag drop
    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }, []);

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;

            if (over && active.id !== over?.id) {
                const oldIndex = monitorsList.findIndex(
                    (_item) => _item.id === (active.id as number)
                );
                const newIndex = monitorsList.findIndex(
                    (_item) => _item.id === (over.id as number)
                );

                const newConfig = arraySwap(monitorsList, oldIndex, newIndex);
                const currentMonitorList = [...monitorsList];
                //call socket
                dispatch(updateIndexBox(newConfig as Monitor[]));
                dispatch(updateIndexBoxApi(newConfig as Monitor[]))
                    .unwrap()
                    .catch(() => {
                        dispatch(updateIndexBox(currentMonitorList));
                    });
            }
            setActiveId(null);
        },
        [handleEdit]
    );
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);
    // end drag drop

    // grid
    const handleIncrGridCount = () => {
        setGridCount(gridCount + 1 <= 10 ? gridCount + 1 : 10);
    };
    const handleDecrGridCount = () => {
        setGridCount(gridCount - 1 > 0 ? gridCount - 1 : 1);
    };
    // end grid

    return (
        <>
            <Row justify="space-between" style={{ height: 28 }}>
                <Loading fullScreen loading={loading} />

                <Col>
                    {isDragMode && (
                        <Space>
                            <div>{lang.CAMGRID_COUNT_COLUMN_TITLE}</div>
                            <ButtonGroup>
                                <Button
                                    onClick={handleDecrGridCount}
                                    className="hanet-control-column-btn-ant"
                                >
                                    -
                                </Button>
                                <div className="hanet-control-column-display-ant">{gridCount}</div>
                                <Button
                                    onClick={handleIncrGridCount}
                                    className="hanet-control-column-btn-ant"
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </Space>
                    )}
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Row align="middle" gutter={8}>
                        {isDragMode && (
                            <>
                                <Col>
                                    <span>{lang.CAMGRID_MOVE_INTRO_TITLE}</span>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<CloseOutlined />}
                                        // size="small"
                                        onClick={disableDragMode}
                                    />
                                </Col>
                            </>
                        )}
                        {!isDragMode && (
                            <Col>
                                <Tooltip
                                    placement="left"
                                    title={lang.CAMGRID_REORDER_TOOLTIP_TITLE}
                                >
                                    <Button
                                        className="hanet-toggle-mode-btn-ant"
                                        shape="circle"
                                        icon={<DragOutlined />}
                                        // size="small"
                                        onClick={enableDragMode}
                                    />
                                </Tooltip>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <SortableContext items={monitorsList} strategy={rectSwappingStrategy}>
                    <Grid title="" columns={gridCount}>
                        {monitorsList
                            .filter((item) => item.enable === 1)
                            .map((item) => (
                                <SortableCamItem
                                    enableDrag={isDragMode}
                                    key={item.id}
                                    item={item}
                                    onChoose={handleEdit}
                                />
                            ))}
                    </Grid>
                    <DragOverlay>
                        {activeId ? (
                            <div
                                style={{
                                    width: '100%',
                                    height: undefined,
                                    aspectRatio: 135 / 76,
                                    backgroundColor: '#40a9ff',
                                    borderRadius: '6px'
                                }}
                            />
                        ) : null}
                    </DragOverlay>
                </SortableContext>
            </DndContext>
        </>
    );
};
