import { createAsyncThunk } from '@reduxjs/toolkit';

import socketConnection from '@/utils/socketConnection';
import { FormFieldValues, Monitor } from '@/types/monitor.type';
import transferData from '@/utils/transferData';

const KEY_CRUD = 'crud';

// export const getMonitor = createAsyncThunk('monitor/get', async (_, thunkAPI) => {
//     try {
//         const response = await socketConnection.getMonitorsList();
//         return response as Monitor[];
//     } catch (error) {
//         return thunkAPI.rejectWithValue({
//             error
//         });
//     }
// });

export const getMonitorsList = createAsyncThunk('monitor/gets', async (_, thunkAPI) => {
    try {
        const response: any = await socketConnection.callSocketApi(KEY_CRUD, 'findAllMonitor', {});

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
            error
        });
    }
});

export const addMonitor = createAsyncThunk(
    'monitor/add',
    async (body: FormFieldValues, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY_CRUD, 'createMonitor', body);
            return response as Monitor[];
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);

export const updateMonitor = createAsyncThunk(
    'monitor/update',
    async (payload: { id: number; body: FormFieldValues }, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY_CRUD, 'updateMonitor', {
                ...payload.body,
                id: payload.id
            });
            return response as Monitor[];
        } catch (error) {
            console.log('error:', error);

            return thunkAPI.rejectWithValue({
                errorCode: 123,
                errorMessage: error.socMessage
            });
        }
    }
);

export const deleteMonitor = createAsyncThunk(
    'monitor/delete',
    async (monitorId: number, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY_CRUD, 'deleteMonitor', {
                id: monitorId
            });
            return response as Monitor[];
        } catch (error) {
            throw thunkAPI.rejectWithValue({
                errorCode: error.errorCode || 0,
                errorMessage: error.socMessage
            });
        }
    }
);
