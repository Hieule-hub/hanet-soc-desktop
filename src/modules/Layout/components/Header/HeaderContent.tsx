import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import MonitorHeader from './MonitorHeader';
import DefaultHeader from './DefaultHeader';
import SchemeHeader from './SchemeHeader';
import HistoryVideoHeader from './HistoryVideoHeader';
import CreateSchemeHeader from './CreateSchemeHeader';
import DetailSchemeHeader from './DetailSchemeHeader';
import BoxDetailHeader from './BoxDetailHeader';
import HistoryMultiVideoHeader from './HistoryMultiVideoHeader';

export const HeaderContent: React.FC = () => {
    const router = useRouter();
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [, root, sub] = router.pathname?.split('/');

    switch (root) {
        case 'monitor':
            return <MonitorHeader />;
        case 'scheme':
            if (sub) {
                if (sub === 'create') {
                    return <CreateSchemeHeader />;
                }
                return <DetailSchemeHeader />;
            }
            return <SchemeHeader />;
        case 'box':
            // if (sub) {
            //     if (sub === 'create') {
            //         return <CreateSchemeHeader />;
            //     }
            //     return <UpdateSchemeHeader />;
            // }
            return <BoxDetailHeader />;
        case 'history-video':
            return <HistoryVideoHeader />;
        case 'history-multi-video':
            return <HistoryMultiVideoHeader />;

        default:
            return <DefaultHeader />;
    }
};
