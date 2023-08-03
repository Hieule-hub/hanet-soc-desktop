import { VideoResponse } from '@/types/video.type';
import socketConnection from '@/utils/socketConnection';
import { createAsyncThunk } from '@reduxjs/toolkit';

const KEY = 'crud';

export const getVideoHistory = createAsyncThunk(
    'video/gets',
    async (body: { deviceIDs: string; time: string }, thunkAPI) => {
        try {
            const response = await socketConnection.callSocketApi(KEY, 'findAllVideoHistory', body);

            return response as VideoResponse;
        } catch (error) {
            console.log(error);

            return thunkAPI.rejectWithValue({
                error
            });
        }
    }
);
