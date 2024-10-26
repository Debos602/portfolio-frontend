import Buttons from "@/components/Buttons";
import { navPaths } from "@/routes/navRoutes";
import {
    BarsOutlined,
    CloseCircleOutlined,
    DashboardOutlined,
    DownOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    LogoutOutlined,
    MailOutlined,
    RollbackOutlined,
    TwitterOutlined,
    UserOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps, Space, Switch } from "antd";
import logo from "../assets/car-lgo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/feature/authSlice";
import { TUser } from "@/types/global";
import { clearBookings } from "@/redux/feature/booking/bookingSlice";
import { navPaths2 } from "@/routes/navRoutes2";
import { useEffect, useState } from "react";

const Header = () => {
    const user = useAppSelector((state) => state.auth.user as TUser | null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(clearBookings());
        navigate("/login");
    };

    // Detect window resize and update state
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // Save theme to localStorage and apply it to document body
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    const menuItems = navPaths.map((navItem, index) => ({
        key: index,
        label: (
            <Link to={navItem.path} className="uppercase">
                {navItem.name}
            </Link>
        ),
    }));

    const menuItems2 = navPaths2.map((navItem, index) => ({
        key: index,
        label: (
            <Link
                to={navItem.path}
                className="uppercase border-b-2 block border-solid border-blue-500 bg-border-bottom "
            >
                {navItem.name}
            </Link>
        ),
    }));

    const items: MenuProps["items"] = [
        {
            label:
                user?.role === "admin" ? (
                    <Link className="text-md font-medium" to="/admin-dashboard">
                        <DashboardOutlined className="pr-2" />
                        Admin-dashboard
                    </Link>
                ) : (
                    <Link className="text-md font-medium" to="/dashboard">
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
                <Link onClick={handleLogout} to="/login">
                    <LogoutOutlined className="pr-2" />
                    Logout
                </Link>
            ),
            key: "3",
        },
    ];

    return (
        <div>
            <div
                className="fixed top-0 w-full z-50"
                style={{
                    backgroundColor: "var(--bg-color)",
                    color: "var(--text-color)",
                }}
            >
                <div className="container mx-auto flex justify-around items-center py-1 bg-gray-800">
                    <div className="max-md:hidden flex text-white opacity-80 w-full">
                        <div className="text-md font-medium text-white">
                            <MailOutlined />
                            <span className="mx-2">Debos.das.02@gmail.com</span>
                        </div>
                        <div className="text-md font-medium text-white">
                            <EnvironmentOutlined />
                            <span className="ml-2">
                                uttar patenga, katgor, chittagong, post-4000
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Switch
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                            className="mr-4"
                            autoFocus
                        />
                        <FacebookOutlined className="mr-2 bg-amber-400 p-2 text-sm rounded-full" />
                        <YoutubeOutlined className="mr-2 bg-amber-400 p-2 text-sm rounded-full" />
                        <TwitterOutlined className="bg-amber-400 p-2 text-sm rounded-full" />
                    </div>
                </div>
                <div className="container mx-auto flex justify-between items-center bg-white border-b-2 border-amber-500">
                    <Link to="/">
                        <img src={logo} className="h-24 object-cover" alt="" />
                    </Link>
                    <div>
                        {!isMobile && (
                            <Menu
                                className="max-lg:hidden w-full justify-end items-end font-sans text-xl font-bold bg-white"
                                mode="horizontal"
                                items={menuItems}
                            />
                        )}
                    </div>
                    {user?.role === "admin" || user?.role === "user" ? (
                        <div className="flex items-center justify-center">
                            <Dropdown
                                menu={{ items }}
                                className="text-lg text-gray-950 font-bold"
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
                            <div className="ml-2 mt-3">
                                <p className="text-lg font-bold uppercase">
                                    {user?.name}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="max-lg:hidden">
                                <Buttons to="/login">Login</Buttons>
                            </div>
                            <div
                                className="h-20 w-20 lg:hidden flex justify-end items-center"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? (
                                    <CloseCircleOutlined className="text-3xl" />
                                ) : (
                                    <BarsOutlined className="text-3xl" />
                                )}
                            </div>
                            {open && (
                                <Menu
                                    className="lg:hidden  text-gray-950 w-full absolute right-0 top-[137px] border-2 justify-end items-center font-sans text-2xl font-bold bg-white"
                                    mode="vertical"
                                    items={menuItems2}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
