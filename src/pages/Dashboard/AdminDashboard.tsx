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
            icon: <BookOutlined className="mr-2 text-[#07041e]" />,
            label: <Link to="/admin-dashboard/management-blog" className="text-[#07041e] text-[18px]">Blog Management</Link>,
        },
        {
            key: "2",
            icon: <DatabaseOutlined className="mr-2 text-[#07041e]" />,
            label: <Link to="/admin-dashboard/management-skills" className="text-[#07041e] text-[18px]">Skill Management</Link>,
        },
        {
            key: "3",
            icon: <SolutionOutlined className="mr-2 text-[#07041e]" />,
            label: <Link to="/admin-dashboard/management-projects" className="text-[#07041e] text-[18px]">Project Management</Link>,
        },
        {
            key: "4",
            icon: <CodeOutlined className="mr-2 text-[#07041e]" />,
            label: <Link to="/admin-dashboard/management-experience" className="text-[#07041e] text-[18px]">Experience Management</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={300}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "#fff",
                }}
            >
                <div>
                    <div className="flex justify-center items-center bg-black p-3">
                        <img
                            src={logo}
                            className="h-full max-h-[3rem] object-cover"
                            alt="logo"
                        />
                    </div>
                    <Menu
                        mode="inline"
                        items={menuItems}
                        style={{ backgroundColor: "#fff", color: "#07041e" }}
                    />
                </div>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 300, transition: "margin-left 0.2s" }}>
                <Header style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    padding: "0 24px",
                    height: "64px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    color: "#07041e",
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: "16px", width: 64, height: 64, color: "#07041e" }}
                    />
                    {user?.role === "admin" || user?.role === "user" ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            label: (
                                                <Link to="/admin-dashboard">
                                                    <DashboardOutlined className="pr-2 text-[#07041e]" />{" "}
                                                    Admin Dashboard
                                                </Link>
                                            ),
                                            key: "1",
                                        },
                                        {
                                            label: (
                                                <Link to="/">
                                                    <RollbackOutlined className="pr-2 text-[#07041e]" />
                                                    Return Home
                                                </Link>
                                            ),
                                            key: "2",
                                        },
                                        {
                                            label: (
                                                <Link onClick={handleLogout} to="/login">
                                                    <LogoutOutlined className="pr-2 text-[#07041e]" />
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
                                        <Avatar size="large" className="text-[#07041e]" icon={<UserOutlined />} />
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                            <div style={{ marginLeft: "8px" }}>
                                <p style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase", color: "#07041e", }}>
                                    {user?.name}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </Header>
                <Content style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    color: "#07041e",
                }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;