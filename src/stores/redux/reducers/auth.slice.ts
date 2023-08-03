import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@/utils/http';
import AuthStorage from '@/stores/cookies/auth-storage';
import socketConnection from '@/utils/socketConnection';

interface AuthState {
    auth_data: any | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export const initialState: AuthState = {
    auth_data: null,
    loading: 'idle'
};

interface AxiosResposne {
    socCode: 0;
    socMessage: string;
    socData: any;
}

// First, create the thunk
export const login = createAsyncThunk('auth/login', async (body: any, thunkAPI) => {
    try {
        const response = await http.post<AxiosResposne>(
            '/auth/vendor/loginVendor',
            {
                ...body,
                clientid: '70fb5e3bba3588be86b12b681fa516dc03817916b31797f2afaa81095f6aff0a'
            },
            {
                signal: thunkAPI.signal
            }
        );

        return response.data.socData;
    } catch (error) {
        console.log('login error:', error);
        if (error?.response && error?.response?.data) {
            throw thunkAPI.rejectWithValue(error.response.data);
        }
        throw thunkAPI.rejectWithValue(error);
        // throw thunkAPI.rejectWithValue({
        //     errorCode: error.errorCode || 0,
        //     errorMessage: error.socMessage
        // });
    }
});

// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        logout: (state) => {
            state.auth_data = null;
            //clear cookie
            AuthStorage.destroy();
        }
    },
    extraReducers(builder) {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(login.fulfilled, (state, action) => {
            // Add user to the state array
            AuthStorage.values = {
                token: action.payload.token,
                refreshToken: action.payload.refreshToken
                // userId: action.payload?.IdToken,
                // role: 'user',
                // exp: action.payload.ExpiresIn
            };
            socketConnection.connection();
            state.auth_data = action.payload;
        });
    }
});

export const { logout } = usersSlice.actions;
const reducers = usersSlice.reducer;

export default reducers;
