import type { Cam } from './cam.type';
import { RankType } from './region.type';

export interface ConfigMonitor {
    layout: number | null; // layout hiển thị của box
    interval: number; // thời gian refresh camera
    cams: Cam[]; // danh sách camera đã được phân bổ,
    fullscreenStatus: number;
    pageDetail: Cam[];
}

export interface Monitor {
    id: number; // id màn hình
    serial: string; // serial màn hình
    name: string; // tên màn hình
    enable: number; // trạng thái bật tắt
    status: number; // trạng thái kết nối của box - trạng thái online
    config?: ConfigMonitor | null; // thông tin config
    createdAt?: string; // thời gian tạo
    updatedAt?: string; // thời gian update
    createdBy?: string; // thông tin người tạo
    updatedBy?: string; // thông tin người update
}

export interface FormFieldValues {
    serial: string;
    name: string;
    enable?: number;
}

export interface FormFieldValuesConfigBox {
    serial: string; // serial monitor
    layout: number | null; // layout monitor
    interval: number;
    camsList: Cam[]; //danh sách camera thêm thủ công
    conditionList: RankType[]; // danh sách điều kiện
}
