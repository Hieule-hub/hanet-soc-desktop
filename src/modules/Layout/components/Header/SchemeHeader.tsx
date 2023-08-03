import React, { FC } from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const SchemeHeader: FC = () => {
    return (
        <div className="header-content">
            <div className="title">Kịch bản</div>
            <div className="body">
                <Link href="/scheme/create">
                    <Button>Tạo kịch bản</Button>
                </Link>
            </div>
        </div>
    );
};

export default SchemeHeader;
