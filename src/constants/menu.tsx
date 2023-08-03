import { Icon } from '@/components/Icon/Icon';
import React from 'react';

interface IItem {
    title: string;
    router: string;
    icon: React.ReactNode;
    disabled?: boolean;
}

export const itemsMenu: IItem[] = [
    {
        // disabled?:true,
        title: 'Trang chủ',
        router: '/',
        icon: <Icon name="dashboard" />
    },
    {
        // disabled?:,,
        title: 'Kịch bản',
        router: '/scheme',
        icon: <Icon name="scheme" />
    },
    {
        // disabled?:,
        title: 'Quản lý màn hình',
        router: '/monitor',
        icon: <Icon name="monitor" />
    },
    {
        disabled: true,
        title: 'Xem lại Video',
        router: '/history-video',
        icon: <Icon name="history-video" />
    },
    {
        disabled: true,
        title: 'Xem lại nhiều video',
        router: '/history-multi-video',
        icon: <Icon name="history-video" />
    }
];
