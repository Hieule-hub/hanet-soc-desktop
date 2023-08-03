export interface Video {
    createTime: string;
    day: string;
    deviceId: string;
    duration: string;
    enable: number;
    eventId: string;
    file: string;
    month: string;
    pathVideo: string;
    placeId: string;
    thumb: string;
    timestamp: string;
    type: string;
}

export interface VideoResponse {
    size: number;
    total: string;
    videos: Video[];
}
