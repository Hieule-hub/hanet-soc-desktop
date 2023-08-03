import {
    AnyAction,
    AsyncThunk,
    PayloadAction,
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import socketConnection from '@/utils/socketConnection';
import type {
    FormFieldValuesConfigBox,
    FormFieldValues,
    Monitor,
    ConfigMonitor
} from '@/types/monitor.type';
import { notification } from 'antd';

import type { Cam } from '@/types/cam.type';
import { MonitorConfig } from '@/types/scheme.type';
import transferData from '@/utils/transferData';
import { getMonitorsList } from '../thunks/monitor.thunk';
import {
    applyScheme,
    resetConfigBox,
    updateConfigBox,
    updateIndexBoxApi
} from '../thunks/box.thunk';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface MonitorState {
    monitorsList: Monitor[];
    loading: boolean;
    currentRequestId: string | null;
    editMonitor: Monitor | null;
    isOpenDrawMonitor: boolean;
    deleteMonitorId: number | null;
    isOpenModalConfirmDeleteMonitor: boolean;
    isShowMenuScheme: boolean;
    configBox: Monitor | null;
    isDragMode: boolean;
    boxDetail: Monitor | null;
}

const initialState: MonitorState = {
    monitorsList: [],
    loading: false,
    currentRequestId: null,
    editMonitor: null,
    isOpenDrawMonitor: false,
    deleteMonitorId: null,
    isOpenModalConfirmDeleteMonitor: false,
    isShowMenuScheme: false,
    configBox: null,
    isDragMode: false,
    boxDetail: null
};

//video

//box

//monitor

const monitorSlice = createSlice({
    name: 'monitor',
    initialState,
    reducers: {
        startAddMonitor: (state) => {
            state.isOpenDrawMonitor = true;
        },
        finishAddMonitor: (state) => {
            state.isOpenDrawMonitor = false;
        },
        startEditingMonitor: (state, action: PayloadAction<string>) => {
            const editMonitorSerial = action.payload;
            const foundMonitor = state.monitorsList.find(
                (monitor) => monitor.serial === editMonitorSerial
            );
            state.editMonitor = foundMonitor || null;
            state.isOpenDrawMonitor = true;
        },
        finishEditingMonitor: (state) => {
            state.editMonitor = null;
            state.isOpenDrawMonitor = false;
        },
        startDeleteMonitor: (state, action: PayloadAction<number>) => {
            state.deleteMonitorId = action.payload;
            state.isOpenModalConfirmDeleteMonitor = true;
        },
        finishDeleteMonitor: (state) => {
            state.isOpenModalConfirmDeleteMonitor = false;
            state.deleteMonitorId = null;
        },
        //config box
        // standard reducer logic, with auto-generated action types per reducer
        startConfigBox: (state, action: PayloadAction<string>) => {
            const foundBox = state.monitorsList.find((box) => box.serial === action.payload);
            state.configBox = foundBox || null;
        },
        cancelConfigBox: (state) => {
            state.configBox = null;
        },
        startDragMode: (state) => {
            state.isDragMode = true;
        },
        endDragMode: (state) => {
            state.isDragMode = false;
        },
        startChooseScheme: (state) => {
            state.isShowMenuScheme = true;
        },
        finishChooseScheme: (state) => {
            state.isShowMenuScheme = false;
        },
        updateIndexBox: (state, action: PayloadAction<Monitor[]>) => {
            const newListMonitor = action.payload;
            state.monitorsList = newListMonitor;
        },
        startDetailBox: (state, action: PayloadAction<number>) => {
            const foundBox = state.monitorsList.find((box) => box.id === action.payload);
            state.boxDetail = foundBox || null;
        },
        finishDetailBox: (state) => {
            state.boxDetail = null;
        },
        updateBox: (state, action: PayloadAction<string[]>) => {
            const listSerialOnline = action.payload;
            state.monitorsList.forEach((monitor) => {
                if (listSerialOnline.includes(monitor.serial)) {
                    monitor.status = 1;
                } else {
                    monitor.status = 0;
                }
            });
        },
        updateListCamLive: (state, action: AnyAction) => {
            const data = action.payload;

            const monitorReal = transferData(data[0]);

            //if in box detail page
            if (state.boxDetail?.serial === monitorReal.serial) {
                state.boxDetail = monitorReal;
            }

            //if in box config mode
            if (state.configBox?.serial === monitorReal.serial) {
                state.configBox = monitorReal;
            }

            //update config monitor
            state.monitorsList.some((monitor, index) => {
                if (monitor.serial === monitorReal.serial) {
                    state.monitorsList[index] = monitorReal;
                    return true;
                }
                return false;
            });
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMonitorsList.fulfilled, (state, action) => {
                state.monitorsList = action.payload;
            })
            .addCase(updateConfigBox.fulfilled, (state, action) => {
                const newBox = action.payload;

                state.monitorsList.some((monitor, index) => {
                    if (monitor.serial === newBox.serial) {
                        state.monitorsList[index] = newBox;
                        return true;
                    }
                    return false;
                });
            })
            .addCase(resetConfigBox.fulfilled, (state, action) => {
                const serial = action.meta.arg;
                state.monitorsList.some((monitor, index) => {
                    if (monitor.serial === serial) {
                        state.monitorsList[index].config = null;
                        return true;
                    }
                    return false;
                });
            })
            .addCase(applyScheme.fulfilled, (state, action) => {
                const newListConfig = action.payload;

                console.log('newListConfig', newListConfig);

                state.monitorsList.forEach((monitor, index) => {
                    const foundConfig = newListConfig.find(
                        (item) => item.serial === monitor.serial
                    );
                    if (foundConfig) {
                        state.monitorsList[index].config = foundConfig.config;
                    }
                });
            })
            .addCase(updateIndexBoxApi.fulfilled, (state, action) => {
                const newListMonitor = action.meta.arg;
                state.monitorsList = newListMonitor;
            })
            .addMatcher<PendingAction>(
                (action: AnyAction) =>
                    action.type.startsWith('monitor') && action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            )
            .addMatcher<RejectedAction | FulfilledAction>(
                (action) =>
                    // isMonitorAction(action) &&
                    action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
                (state, action) => {
                    const { requestId } = action.meta;
                    if (requestId === state.currentRequestId) {
                        state.loading = false;
                        state.currentRequestId = null;
                    }
                }
            );
    }
});

export const {
    startEditingMonitor,
    finishEditingMonitor,
    startAddMonitor,
    finishAddMonitor,
    startDeleteMonitor,
    finishDeleteMonitor,
    startChooseScheme,
    finishChooseScheme,
    startConfigBox,
    cancelConfigBox,
    startDragMode,
    endDragMode,
    updateIndexBox,
    startDetailBox,
    finishDetailBox,
    updateBox,
    updateListCamLive
} = monitorSlice.actions;

const monitor = monitorSlice.reducer;

export default monitor;
