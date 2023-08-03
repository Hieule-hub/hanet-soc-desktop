import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';

import { itemsMenu } from '@/constants/menu';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
    next: () => void;
}

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    // children?: MenuItem[],
    disabled?: boolean
): MenuItem {
    return {
        key,
        icon,
        // children,
        label,
        disabled: disabled || false
    } as MenuItem;
}

const items = itemsMenu.map((item) =>
    getItem(
        <span style={{ paddingLeft: 9 }}>{item.title}</span>,
        item.router,
        item.icon,
        item.disabled
    )
);

export const MenuSidebar: FC<Props> = ({ next }) => {
    const router = useRouter();

    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unsafe-optional-chaining
    const [, root, sub] = router.pathname?.split('/');

    //handle push for path
    const handleClick = ({ item, key, keyPath, domEvent }) => {
        router.push(key);
        next();
    };
    return (
        <Menu
            prefixCls="global-menu"
            defaultSelectedKeys={['/']}
            selectedKeys={['/' + (sub && sub !== '[id]' ? sub : root)]}
            defaultOpenKeys={['/' + root]}
            mode="inline"
            // theme="dark"
            style={{
                padding: '15px 0',
                borderInlineEnd: 0
            }}
            onClick={handleClick}
            items={items}
        />
    );
};

export default MenuSidebar;
