import { ConfigMonitor, Monitor } from '@/types/monitor.type';
import { isEmptyObject } from './apply-url-filter';

const checkConfig = (config: any): ConfigMonitor => {
    if (isEmptyObject(config)) {
        return null;
    }

    if (!config.displayData || isEmptyObject(config?.displayData)) {
        return null;
    }

    return {
        layout: config.displayData?.layout || null,
        cams: config.displayData?.cams || [],
        interval: config.displayData?.interval || 30000,
        fullscreenStatus: config?.fullscreenStatus || 0,
        pageDetail: config?.pageDetail || []
    };
};

const transferData = (item: any): Monitor => {
    const { config, ...props } = item as any;

    const status = config?.activeStatus || 0;

    const configBox = checkConfig(config);

    return {
        config: configBox,
        status,
        ...props
    };
};

export default transferData;
