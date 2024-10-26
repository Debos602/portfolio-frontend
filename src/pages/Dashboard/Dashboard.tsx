import React, { useState } from "react";
import {
    BookOutlined,
    DashboardOutlined,
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
    RollbackOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/feature/authSlice";
import logo from "@/assets/car-lgo.png";
import { RootState } from "@/redux/store";
import { TUser } from "@/types/global";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
    const user = useAppSelector(
        (state: RootState) => state.auth.user as TUser | null
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");
    };

    const menuItems = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/dashboard/profile">Profile</Link>,
        },
        {
            key: "2",
            icon: <BookOutlined />,
            label: <Link to="/dashboard/booking">Booking Management</Link>,
        },
        {
            key: "3",
            icon: <MoneyCollectOutlined />,
            label: <Link to="/dashboard/payment">Payment Management</Link>,
        },
    ];

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ backgroundColor: "var(--bg-color)" }}
            >
                <div className="sticky top-0 z-30">
                    <img
                        src={logo}
                        className="h-24 w-full object-cover"
                        alt="logo"
                    />
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className="flex justify-between bg-white h-24 sticky top-0  z-10 ">
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64 }}
                    />
                    {user?.role === "admin" || user?.role === "user" ? (
                        <div className="flex items-center">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <Link to="/dashboard">
                                                    <DashboardOutlined className="pr-2" />
                                                    Dashboard
                                                </Link>
                                            ),
                                            key: "1",
                                        },
                                        {
                                            label: (
                                                <Link to="/">
                                                    <RollbackOutlined className="pr-2" />
                                                    Home page
                                                </Link>
                                            ),
                                            key: "2",
                                        },
                                        {
                                            label: (
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/login"
                                                >
                                                    <LogoutOutlined className="pr-2" />
                                                    Logout
                                                </Link>
                                            ),
                                            key: "3",
                                        },
                                    ],
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar
                                            size="large"
                                            icon={<UserOutlined />}
                                        />
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <div className="ml-2">
                                <p className="text-lg font-bold uppercase">
                                    {user?.name}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </Header>
                <Content
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet /> {/* This renders the current route's content */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
