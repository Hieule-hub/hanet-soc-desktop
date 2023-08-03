import React from 'react';
import { Layout } from 'antd';
import Login from '@modules/Auth/Login';

import type { IPage } from '@/types/common.type';

const Page: IPage = () => {
    return <Login />;
};

Page.Layout = ({ children }: { children: React.ReactNode }) => children;
Page.Title = 'Login';

export default Page;
