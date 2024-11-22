import React, { useState } from "react";
import {
    BookOutlined,
    CodeOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RollbackOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/feature/authSlice";
import logo from "../../assets/logo.png";
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
            icon: (
                <BookOutlined className="mr-2" style={{ color: "#EEEEEE" }} />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-blog"
                    style={{ color: "#EEEEEE" }}
                >
                    Blog Management
                </Link>
            ),
        },
        {
            key: "2",
            icon: (
                <DatabaseOutlined
                    className="mr-2"
                    style={{ color: "#EEEEEE" }}
                />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-skills"
                    style={{ color: "#EEEEEE" }}
                >
                    Skill Management
                </Link>
            ),
        },
        {
            key: "3",
            icon: (
                <SolutionOutlined
                    className="mr-2"
                    style={{ color: "#EEEEEE" }}
                />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-projects"
                    style={{ color: "#EEEEEE" }}
                >
                    Project Management
                </Link>
            ),
        },
        {
            key: "4",
            icon: (
                <CodeOutlined className="mr-2" style={{ color: "#EEEEEE" }} />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-experience"
                    style={{ color: "#EEEEEE" }}
                >
                    Experience Management
                </Link>
            ),
        },
    ];

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={300}
                className="relative bg-[#3B1E54]"
            >
                <div className="sticky top-0 z-30">
                    <div className=" flex  justify-center items-center bg-gradient-to-t from-[#867496] to-[#9B7EBD] ">
                        <img
                            src={logo}
                            className="h-[6rem] object-cover"
                            alt="logo"
                        />
                    </div>
                    <Menu
                        mode="inline"
                        items={menuItems}
                        className="text-xl h-screen"
                    />
                </div>
            </Sider>
            <Layout>
                <Header className="flex justify-between items-center bg-gradient-to-t from-[#3B1E54] to-[#9B7EBD] text-[#EEEEEE] h-24">
                    <Button
                        className="text-[#EEEEEE] text-5xl"
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
                                                    <DashboardOutlined className="pr-2" />{" "}
                                                    Admin Dashboard
                                                </Link>
                                            ),
                                            key: "1",
                                        },
                                        {
                                            label: (
                                                <Link to="/">
                                                    <RollbackOutlined className="pr-2" />
                                                    Return Home
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
