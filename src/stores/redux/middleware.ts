import {
    AnyAction,
    AsyncThunkAction,
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue
} from '@reduxjs/toolkit';

import { notification } from 'antd';

const getMessage = (code: number, errorMessage: string) => {
    switch (errorMessage) {
        case 'Some errors occurred while updating monitor.':
            return 'Số serial đã được sử dụng.';
        case 'All boxes are offline':
            return 'Box hiện không kết nối.';
        default:
            return undefined;
    }
};

function isErrorSocketMessage(
    payload: unknown
): payload is { errorCode: number; errorMessage: string } {
    return (
        typeof payload === 'object' &&
        payload !== null &&
        'errorMessage' in payload &&
        typeof payload.errorMessage === 'string'
    );
}

export const socketApiLoggerError: Middleware =
    (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
        if (isRejectedWithValue(action)) {
            console.log('action', action);

            if (isErrorSocketMessage(action.payload)) {
                const { errorCode, errorMessage } = action.payload;

                if (process.browser) {
                    const errorMsg = getMessage(errorCode, errorMessage);
                    notification.error({
                        message: errorMsg || errorMessage
                        // description: action.payload.error
                        // placement: 'bottomRight'
                    });
                }
            }
            // if (process.browser) {
            //     notification.error({
            //         message: fn,
            //         description: res.socMessage
            //         // placement: 'bottomRight'
            //     });
            // }
        }
        return next(action);
    };
