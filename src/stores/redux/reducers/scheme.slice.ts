import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Scheme, SchemeFieldFormValues } from '@/types/scheme.type';

import { getSchemesList } from '../thunks/scheme.thunk';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const initialFormValues: SchemeFieldFormValues = {
    name: '',
    description: '',
    monitorConfigList: [],
    camsList: [],
    conditionalCamList: [],
    interval: 3000
};

interface SchemeState {
    schemesList: Scheme[];
    loading: boolean;
    currentRequestId: string | null;
    deleteSchemeId: string | null;
}

const initialState: SchemeState = {
    schemesList: [],
    loading: false,
    currentRequestId: null,
    deleteSchemeId: null
};

const schemeSlice = createSlice({
    name: 'scheme',
    initialState,
    reducers: {
        startDeleteScheme: (state, action: PayloadAction<string>) => {
            state.deleteSchemeId = action.payload;
        },
        finishDeleteScheme: (state) => {
            state.deleteSchemeId = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSchemesList.fulfilled, (action, state) => {
                action.schemesList = state.payload;
            })
            .addMatcher<PendingAction>(
                (action) => action.type.startsWith('scheme') && action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true;
                    state.currentRequestId = action.meta.requestId;
                }
            )
            .addMatcher<RejectedAction | FulfilledAction>(
                (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
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

export const { startDeleteScheme, finishDeleteScheme } = schemeSlice.actions;

const scheme = schemeSlice.reducer;

export default scheme;
