import { combineReducers, AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import auth from './auth.slice';
import scheme from './scheme.slice';
import setting from './setting.slice';

//RTK Query
import { regionApi } from '../services/region.service';
import { monitorApi } from '../services/monitor.service';
import { schemeApi } from '../services/scheme.service';

//slice
import monitor from './monitor.slice';

export const appReducers = combineReducers({
    auth,
    monitor,
    scheme,
    setting,
    [regionApi.reducerPath]: regionApi.reducer,
    [monitorApi.reducerPath]: monitorApi.reducer,
    [schemeApi.reducerPath]: schemeApi.reducer
});

const reducers = (state: ReturnType<typeof appReducers>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        };
        return nextState;
    }
    return appReducers(state, action);
};

export default reducers;
