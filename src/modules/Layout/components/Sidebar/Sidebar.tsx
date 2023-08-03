import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExclamationCircleOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Drawer, Modal } from 'antd';
import LogoHanet from '@/components/LogoHanet';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '@stores/redux/reducers/auth.slice';
import MenuSidebar from './MenuSidebar';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [modal, contextHolder] = Modal.useModal();

    const handleLogout = useCallback(async () => {
        modal.confirm({
            // title: 'Bạn có muốn thoát?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn đăng xuất ?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: async () => {
                await dispatch(logout());
                router.push('/login');
            },
            onCancel() {
                // console.log('Cancel');
            }
        });
    }, [dispatch, router]);

    return (
        <Drawer
            placement="left"
            width={208}
            closable={false}
            className="hanet-ant-drawer hanet-sidebar-ant-drawer"
            open={isOpen}
            onClose={onClose}
            footer={
                <Button
                    style={{
                        width: '100%',
                        textAlign: 'left'
                    }}
                    type="link"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    <span>Đăng xuất</span>
                </Button>
            }
        >
            <Link href="/">
                <div className="logo">
                    <LogoHanet />
                </div>
            </Link>
            {isOpen && <MenuFoldOutlined className="trigger2" onClick={onClose} />}
            {contextHolder}
            <MenuSidebar next={onClose} />
        </Drawer>
    );
};
