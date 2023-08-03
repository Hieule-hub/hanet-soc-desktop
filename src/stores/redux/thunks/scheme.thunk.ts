import socketConnection from '@/utils/socketConnection';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Scheme, SchemeFieldFormValues } from '@/types/scheme.type';

const KEY = 'crud';

export const getSchemesList = createAsyncThunk('scheme/gets', async (_, thunkAPI) => {
    try {
        const response = await socketConnection.callSocketApi(KEY, 'findAllScreen', {});

        return response as Scheme[];
    } catch (error) {
        console.log(error);

        return thunkAPI.rejectWithValue({
            error
        });
    }
});

export const getScheme = createAsyncThunk('scheme/get', async (schemeId: string, thunkAPI) => {
    try {
        const response = await socketConnection.callSocketApi(KEY, 'findOneScreen', {
            id: schemeId
        });
        return response as Scheme;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            error
        });
    }
});

export const addScheme = createAsyncThunk(
    'scheme/add',
    async (body: SchemeFieldFormValues, thunkAPI) => {
        const { monitorConfigList, camsList, conditionalCamList, interval, ...props } = body;

        const newSheme = {
            ...props,
            detail: {
                monitorConfigList,
                camsList,
                conditionalCamList,
                interval
            }
        };

        try {
            const response = await socketConnection.callSocketApi(KEY, 'createScreen', newSheme);
            return response as Scheme;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                error
            });
        }
    }
);
export const updateScheme = createAsyncThunk(
    'scheme/update',
    async (payload: { id: string; body: SchemeFieldFormValues }, thunkAPI) => {
        try {
            const { monitorConfigList, camsList, conditionalCamList, interval, ...props } =
                payload.body;
            const updateData = {
                ...props,
                id: +payload.id,
                detail: {
                    monitorConfigList,
                    camsList,
                    conditionalCamList,
                    interval
                }
            };

            const response = await socketConnection.callSocketApi(KEY, 'updateScreen', updateData);
            return response as Scheme;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                error
            });
        }
    }
);

export const deleteScheme = createAsyncThunk(
    'scheme/delete',
    async (schemeId: string, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY, 'deleteScreen', {
                id: schemeId
            });
            return response as string;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                error
            });
        }
    }
);
