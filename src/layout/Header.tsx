import Buttons from "@/components/Buttons";
import { navPaths } from "@/routes/navRoutes";
import {
    EnvironmentOutlined,
    FacebookOutlined,
    MailOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import logo from "../assets/car-lgo.png";
import { Link } from "react-router-dom";

const Header = () => {
    const menuItems = navPaths.map((navItem, index) => ({
        key: index,
        label: (
            <Link key={index} to={navItem.path} className="uppercase">
                {navItem.name}
            </Link>
        ),
    }));

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
                <div className="container mx-auto flex justify-between items-center bg-white ">
                    <Link to="/">
                        <img src={logo} className="h-24" alt="" />
                    </Link>{" "}
                    <div className="">
                        <Menu
                            className="max-md:hidden w-full justify-end items-end font-sans text-xl font-bold"
                            mode="horizontal"
                            items={menuItems}
                        ></Menu>
                        <Menu
                            className="md:hidden w-full justify-end items-center font-sans text-xl font-bold"
                            mode="vertical"
                            items={menuItems}
                        ></Menu>
                    </div>
                    <Buttons to="/login">Login</Buttons>
                </div>
            </div>
        </div>
    );
};

export default Header;
