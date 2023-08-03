import { createAsyncThunk } from '@reduxjs/toolkit';

import socketConnection from '@/utils/socketConnection';
import { FormFieldValuesConfigBox, Monitor } from '@/types/monitor.type';
import transferData from '@/utils/transferData';
import { MonitorConfig } from '@/types/scheme.type';

const KEY_CRUD = 'crud';
const KEY_APP_MESSAGE = 'app-message';

export const setFullScreen = createAsyncThunk(
    'monitor/setFullScreen',
    async (data: { serial: string; deviceID: string; placeID: number }, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(
                KEY_APP_MESSAGE,
                'setBoxFullscreen',
                data
            );

            return response;
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);
export const exitFullScreen = createAsyncThunk(
    'monitor/exitFullScreen',
    async (serial: string, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(
                KEY_APP_MESSAGE,
                'setBoxExitFullscreen',
                {
                    serial
                }
            );

            return response;
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);

export const resetConfigBox = createAsyncThunk(
    'monitor/resetConfigBox',
    async (serial: string, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY_CRUD, 'resetBox', {
                serial
            });

            return response;
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);

export const resetConfigAllBox = createAsyncThunk('monitor/resetConfigBox', async (_, thunkAPI) => {
    try {
        const response = await socketConnection.callSocketApi(KEY_CRUD, 'resetAllBox', {});

        return response;
    } catch (error) {
        throw thunkAPI.rejectWithValue({
            error
        });
    }
});

export const updateConfigBox = createAsyncThunk(
    'monitor/updateConfigBox',
    async (config: FormFieldValuesConfigBox, thunkAPI) => {
        const { layout, interval, serial } = config;
        const dataConfig = {
            ...config,
            monitorConfigList: [
                {
                    serial,
                    interval,
                    layout
                }
            ]
        };

        try {
            const response = await socketConnection.callSocketApi(
                KEY_CRUD,
                'applyMonitor',
                dataConfig
            );
            try {
                const monitor: Monitor = transferData(response[0]);

                return monitor;
            } catch (error) {
                console.log('Response Errror:', response);
            }
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);

export const applyScheme = createAsyncThunk(
    'monitor/applyScheme',
    async (params: { id: number; monitorConfigList?: MonitorConfig[] }, thunkAPI) => {
        let response;
        try {
            // const response = await socketConnection.updateConfigBox(config);
            if (params.monitorConfigList) {
                response = await socketConnection.callSocketApi(
                    KEY_CRUD,
                    'applyScreenCustom',
                    params
                );
            } else {
                response = await socketConnection.callSocketApi(KEY_CRUD, 'applyScreen', {
                    id: params.id
                });
            }

            if (!Array.isArray(response)) {
                console.error('Response is not an array:', response);
                return;
            }

            const listResult: Monitor[] = response.map((item) => {
                const monitor = transferData(item);
                return monitor;
            });

            return listResult as Monitor[];
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);

export const updateIndexBoxApi = createAsyncThunk(
    'monitor/updateIndexB',
    async (list: Monitor[], thunkAPI) => {
        const listSerial = list.map((box) => box.serial);
        console.log(JSON.stringify(listSerial));

        try {
            const response = await socketConnection.callSocketApi(
                KEY_CRUD,
                'reorderMonitor',
                listSerial
            );

            return response;
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);
