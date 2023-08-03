import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthStorage from '@/stores/cookies/auth-storage';
import { useRouter } from 'next/router';

import { Form, Input, Button, FloatButton } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';

import { login } from '@/stores/redux/reducers/auth.slice';
import LogoHanet from '@/components/LogoHanet';
import { useAppDispatch } from '@/stores/redux';

interface Props {}

export const Login: FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (AuthStorage.loggedIn) {
            router.push('/');
        }
    }, [router]);

    const onFinish = async (values) => {
        if (errorMessage) {
            setErrorMessage(null);
        }
        setLoading(true);
        setTimeout(() => {
            dispatch(
                login({
                    ...values
                })
            )
                .unwrap()
                .then(() => {
                    router.push('/');
                })
                .catch((error) => {
                    setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 1500);
    };

    return (
        <div className="hanet-login">
            <FloatButton icon={<SettingOutlined />} style={{ top: 15 }} />
            <div className="logo">
                <LogoHanet />
            </div>

            <div className="login-content">
                <div className="login-title">
                    <h1>Phòng điều khiển trung tâm</h1>
                    <p>Giám sát hoạt động hệ thống chuổi cửa hàng f88</p>
                </div>
                <Form
                    className="login-form"
                    initialValues={{
                        remember: true
                    }}
                    // fields={[
                    //     { name: ['username'], value: 'sysdrstest' },
                    //     { name: ['password'], value: 'F88aw2022#' }
                    // ]}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập.'
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu.'
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    {errorMessage && <div className="error-message-form">{errorMessage}</div>}

                    <Form.Item>
                        <Button block htmlType="submit" loading={loading} disabled={loading}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="right" />
        </div>
    );
};
