import React, { FC } from 'react';

import { Layout, Row, Col } from 'antd';
import { HeaderContent } from './HeaderContent';

interface Props {
    children: React.ReactNode;
}

const Header: FC<Props> = ({ children }) => {
    return (
        <Layout.Header className="hanet-header-wrapper">
            <div className="hanet-header">
                {children}
                <HeaderContent />
            </div>
        </Layout.Header>
    );
};

export default Header;
