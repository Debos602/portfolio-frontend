import { Link } from "react-router-dom";
import image from "../assets/debos.jpg";
import {
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
} from "@ant-design/icons";

const SideSection = () => {
    return (
        <div className="relative">
            <div
                className="border-r-2 border-black  px-5 fixed top-0 w-[25%]"
                style={{ backgroundColor: "#3B1E54", color: "#EEEEEE" }}
            >
                <div className="flex items-center justify-center">
                    <img
                        src={image}
                        alt="Profile"
                        className="mt-5 rounded-full object-cover w-32 h-32"
                    />
                </div>
                <div className="flex flex-col items-center">
                    {" "}
                    <p className="font-bold text-2xl">Debos das</p>
                    <p className="font-medium text-xl">
                        Mernstack web developer
                    </p>
                </div>
                <div className="flex justify-evenly text-2xl ">
                    <Link
                        to="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" text-white bg-indigo-950 hover:text-indigo-200 rounded-full  px-2 py-1"
                    >
                        <FacebookFilled />
                    </Link>
                    <Link
                        to="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full  px-2 py-1"
                    >
                        <GithubOutlined />
                    </Link>
                    <Link
                        to="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full  px-2 py-1"
                    >
                        <TwitterSquareFilled />
                    </Link>
                    <Link
                        to="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-indigo-950 hover:text-indigo-200 rounded-full  px-2 py-1"
                    >
                        <InstagramFilled />
                    </Link>
                </div>
                <div className="border-b-2 border-black w-full mx-auto mt-4"></div>

                <div className="flex flex-col items-start py-5">
                    <Link
                        to="/"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <HomeOutlined className="mr-2 font-bold" />
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <UserAddOutlined className="mr-2 font-bold" />
                        About Me
                    </Link>
                    <Link
                        to="/skills"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <CodeOutlined className="mr-2 font-bold" />
                        Skills
                    </Link>
                    <Link
                        to="/expereince"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <CodeOutlined className="mr-2 font-bold" />
                        Expreience
                    </Link>
                    <Link
                        to="/projects"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <SolutionOutlined className="mr-2 font-bold" />
                        Personal Projects
                    </Link>
                    <Link
                        to="/blog"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <BookOutlined className="mr-2 font-bold" />
                        Blog
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:bg-[#9B7EBD] hover:text-white w-full border-2 border-black py-2 rounded-e-xl text-xl font-bold transition duration-500"
                    >
                        <ContactsOutlined className="mr-2 font-bold" />
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideSection;
