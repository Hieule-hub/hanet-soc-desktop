import type { Cam } from './cam.type';
import type { Monitor } from './monitor.type';
import { RankType } from './region.type';

export type MonitorConfig = { id: number; serial: string; name: string; layout: number };
interface Detail {
    monitorConfigList: MonitorConfig[];
    camsList: Cam[];
    conditionalCamList: RankType[];
    interval: number;
}

export interface Scheme {
    id: number;
    name: string;
    description?: string;
    detail: Detail;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface SchemeFieldFormValues {
    name: string;
    description?: string;
    monitorConfigList: MonitorConfig[];
    camsList: Cam[];
    conditionalCamList: RankType[];
    interval: number;
}
