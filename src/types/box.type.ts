import type { Cam } from './cam.type';
import { RankType } from './region.type';

export interface Box {
    id: string;
    label: string;
    layout: string | null;
    serial: string;
    camsList: Cam[];
}

export interface BoxFieldFormConfigValues extends Box {
    conditionList: RankType[];
}
