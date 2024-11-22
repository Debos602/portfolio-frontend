import { Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import image from "../assets/debos.jpg";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FacebookFilled,
    InstagramFilled,
    TwitterSquareFilled,
    GithubOutlined,
    HomeOutlined,
    UserAddOutlined,
    CodeOutlined,
    SolutionOutlined,
    BookOutlined,
    ContactsOutlined,
    DatabaseOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="border-r-2 border-black  px-5 relative"
                style={{ backgroundColor: "#3B1E54", color: "#EEEEEE" }}
                width={300}
            >
                <div className="sticky top-0">
                    {" "}
                    <div className="flex items-center justify-center w-full">
                        <img
                            src={image}
                            alt="Profile"
                            className="mt-4 rounded-xl object-cover w-32 h-32 mb-2"
                        />
                    </div>
                    <div className="flex flex-col items-center w-full">
                        {" "}
                        <p className="font-bold text-2xl mb-1 uppercase">
                            Debos das
                        </p>
                        <p className="font-light text-base mb-1">
                            Mernstack web developer
                        </p>
                    </div>
                    {!collapsed && (
                        <div className="flex justify-evenly text-2xl w-full">
                            <Link
                                to="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full px-2 py-1"
                            >
                                <FacebookFilled />
                            </Link>
                            <Link
                                to="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full px-2 py-1"
                            >
                                <GithubOutlined />
                            </Link>
                            <Link
                                to="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full px-2 py-1"
                            >
                                <TwitterSquareFilled />
                            </Link>
                            <Link
                                to="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full px-2 py-1"
                            >
                                <InstagramFilled />
                            </Link>
                        </div>
                    )}
                    <div className="border-b-2 border-black w-full mx-auto mt-3"></div>
                    <Menu
                        className="bg-[#3B1E54] text-[#EEEEEE] mt-5"
                        defaultSelectedKeys={["1"]}
                        theme="dark" // Ensure the theme is dark for consistent appearance
                        items={[
                            {
                                key: "1",
                                icon: (
                                    <HomeOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Home
                                    </Link>
                                ),
                            },
                            {
                                key: "2",
                                icon: (
                                    <UserAddOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/about"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        About Me
                                    </Link>
                                ),
                            },
                            {
                                key: "3",
                                icon: (
                                    <DatabaseOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/skills"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Skills
                                    </Link>
                                ),
                            },
                            {
                                key: "4",
                                icon: (
                                    <CodeOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/expereince"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Experience
                                    </Link>
                                ),
                            },
                            {
                                key: "5",
                                icon: (
                                    <SolutionOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/projects"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Projects
                                    </Link>
                                ),
                            },
                            {
                                key: "6",
                                icon: (
                                    <BookOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/blog"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Blog
                                    </Link>
                                ),
                            },
                            {
                                key: "7",
                                icon: (
                                    <ContactsOutlined
                                        className="mr-2"
                                        style={{ color: "#EEEEEE" }}
                                    />
                                ),
                                label: (
                                    <Link
                                        to="/contact"
                                        className="hover:text-white text-[#EEEEEE] w-full py-2 text-lg font-semibold transition duration-500"
                                    >
                                        Contact
                                    </Link>
                                ),
                            },
                        ]}
                    />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{ padding: 0 }}
                    className="from-inherit to-[#3B1E54] bg-[#3B1E54]"
                >
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
                        className="bg-[#3B1E54] text-[#EEEEEE] mt-5"
                    />
                </Header>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
