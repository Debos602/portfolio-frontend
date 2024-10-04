import Buttons from "@/components/Buttons";
import { navPaths } from "@/routes/navRoutes";
import {
    DownOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    MailOutlined,
    TwitterOutlined,
    UserOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd";
import logo from "../assets/car-lgo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hook"; // Import dispatch hook
import { logout } from "@/redux/feature/authSlice";
import { TUser } from "@/types/global";
import { clearBookings } from "@/redux/feature/booking/bookingSlice";

const Header = () => {
    const user = useAppSelector((state) => state.auth.user as TUser | null);
    // console.log("user", user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Dispatch logout action
        dispatch(logout());
        dispatch(clearBookings());
        // Redirect to login page
        navigate("/login");
    };

    const menuItems = navPaths.map((navItem, index) => ({
        key: index,
        label: (
            <Link key={index} to={navItem.path} className="uppercase">
                {navItem.name}
            </Link>
        ),
    }));

    const items: MenuProps["items"] = [
        {
            label:
                user?.role === "admin" ? (
                    <Link className="text-md font-medium" to="/admin-dashboard">
                        Admin-dashboard
                    </Link>
                ) : (
                    <Link className="text-md font-medium" to="/dashboard">
                        Dashboard
                    </Link>
                ),
            key: "1",
        },
        {
            label: "2nd menu item",
            key: "2",
        },
        {
            label: (
                <Link
                    className="text-md font-medium"
                    onClick={handleLogout}
                    to="/login"
                >
                    Logout
                </Link>
            ),
            key: "3",
        },
    ];

    return (
        <div className="">
            <div className="fixed top-0 w-full z-50">
                <div className="container mx-auto flex justify-around items-center py-1 bg-gray-800">
                    <div className="flex text-white opacity-80 w-full">
                        <div className="text-md font-medium text-white">
                            <MailOutlined className="" />
                            <span className="mx-2">Debos.das.02@gmail.com</span>
                        </div>
                        <div className="text-md font-medium text-white">
                            <EnvironmentOutlined className="" />
                            <span className="ml-2">
                                uttar patenga, katgor, chittagong, post-4000
                            </span>
                        </div>
                    </div>
                    <div className="flex">
                        <FacebookOutlined className="mr-2 bg-amber-400 p-2 text-sm rounded-full" />{" "}
                        <YoutubeOutlined className="mr-2 bg-amber-400 p-2 text-sm rounded-full" />{" "}
                        <TwitterOutlined className="bg-amber-400 p-2 text-sm rounded-full" />
                    </div>
                </div>
                <div className="container mx-auto flex justify-between items-center bg-white border-b-2 border-amber-500 ">
                    <Link to="/">
                        <img src={logo} className="h-24 object-cover" alt="" />
                    </Link>{" "}
                    <div className="">
                        <Menu
                            className="max-md:hidden w-full  justify-end items-end font-sans text-xl font-bold bg-white "
                            mode="horizontal"
                            items={menuItems}
                        ></Menu>
                        <Menu
                            className="md:hidden w-full  justify-end items-center font-sans text-xl font-bold bg-white"
                            mode="vertical"
                            items={menuItems}
                        ></Menu>
                    </div>
                    {user?.role === "admin" || user?.role === "user" ? (
                        <div className="flex items-center">
                            <Dropdown menu={{ items }}>
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
                    ) : (
                        <Buttons to="/login">Login</Buttons>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
