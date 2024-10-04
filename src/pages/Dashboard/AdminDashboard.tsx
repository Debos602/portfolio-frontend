import React, { useState } from "react";
import {
    BookOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoneyCollectOutlined,
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

const AdminDashboard: React.FC = () => {
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
            label: <Link to="dashboard-overview">Dashboard Overview</Link>,
        },
        {
            key: "2",
            icon: <BookOutlined />,
            label: <Link to="manage-car">Manage car</Link>,
        },
        {
            key: "3",
            icon: <MoneyCollectOutlined />,
            label: "Manage payment",
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div>
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
                <Header className="flex justify-between bg-white">
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
                                                <Link to="/admin-dashboard">
                                                    Admin Dashboard
                                                </Link>
                                            ),
                                            key: "1",
                                        },
                                        {
                                            label: (
                                                <Link to="/">
                                                    Return home page
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
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
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

export default AdminDashboard;
