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
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout } from "@/redux/feature/authSlice";
import logo from "../../assets/1-removebg-preview.png";
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

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");
    };

    const menuItems = [
        {
            key: "1",
            icon: (
                <BookOutlined className="mr-2" />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-blog"

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

                />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-skills"

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

                />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-projects"

                >
                    Project Management
                </Link>
            ),
        },
        {
            key: "4",
            icon: (
                <CodeOutlined className="mr-2" />
            ),
            label: (
                <Link
                    to="/admin-dashboard/management-experience"

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
                className=" text-black !fixed left-0 top-0 z-30"
            >
                <div>
                    <div className="flex justify-center items-center bg-black p-4">
                        <img
                            src={logo}
                            className="h-full max-h-[4rem]  object-cover"
                            alt="logo"
                        />
                    </div>
                    <Menu
                        mode="inline"
                        items={menuItems}
                        className="text-[15px] h-screen text-black"
                    />
                </div>
            </Sider>
            <Layout className=" w-full ml-[300px]">
                <Header className="flex justify-between items-center text-black bg-white h-24 sticky top-0">
                    <Button
                        className="text-black text-5xl"
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

                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
