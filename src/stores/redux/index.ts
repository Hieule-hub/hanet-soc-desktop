import { createWrapper } from 'next-redux-wrapper';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import logger from 'redux-logger';

import reducer, { appReducers } from './reducers';

import { regionApi } from './services/region.service';
import { monitorApi } from './services/monitor.service';
import { schemeApi } from './services/scheme.service';
import { socketApiLoggerError } from './middleware';

const makeStore = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat(
                // logger,
                regionApi.middleware,
                monitorApi.middleware,
                schemeApi.middleware,
                socketApiLoggerError
            )
        // devTools: true
    });

//type
type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
// export type RootState = ReturnType<Store['getState']>;
export type RootState = ReturnType<typeof appReducers>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const wrapper = createWrapper(makeStore, { debug: false });

export default wrapper;
