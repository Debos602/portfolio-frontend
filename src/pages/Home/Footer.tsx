import {
    FacebookFilled,
    InstagramFilled,
    TwitterSquareFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
    const bgImage = {
        backgroundImage: `url('path_to_your_image.jpg')`,
    };

    return (
        <footer
            className="bg-[#3B1E54] text-white py-8 bg-cover bg-center bg-no-repeat relative z-10 transition-all duration-300 ease-in-out"
            style={bgImage}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 w-full h-full bg-[#3B1E54] opacity-80 -z-10"></div>

            <div className="container mx-auto px-4">
                {/* Footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Social Media Links */}
                    <div className="transition-transform transform hover:scale-105 duration-300">
                        <h4 className="text-lg font-semibold mb-4">
                            Follow Us
                        </h4>
                        <div className="flex space-x-4 text-2xl">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#9B7EBD] transition-colors duration-300"
                            >
                                <FacebookFilled />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#9B7EBD] transition-colors duration-300"
                            >
                                <TwitterSquareFilled />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#9B7EBD] transition-colors duration-300"
                            >
                                <InstagramFilled />
                            </a>
                        </div>
                    </div>

                    {/* Portfolio Highlights */}
                    <div className="transition-transform transform hover:scale-105 duration-300">
                        <h4 className="text-lg font-semibold mb-4">
                            Portfolio Highlights
                        </h4>
                        <ul className="space-y-2">
                            <li>Personal Portfolio Website</li>
                            <li>E-commerce Platform</li>
                            <li>Blog Management System</li>
                            <li>Task Management Application</li>
                            <li>Real Estate Listing Website</li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="transition-transform transform hover:scale-105 duration-300">
                        <h4 className="text-lg font-semibold mb-4">
                            Skills & Technologies
                        </h4>
                        <ul className="space-y-2">
                            <li>React.js & Next.js</li>
                            <li>Node.js & Express.js</li>
                            <li>MongoDB & Mongoose</li>
                            <li>Tailwind CSS & Styled Components</li>
                            <li>JWT Authentication</li>
                            <li>TypeScript</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="transition-transform transform hover:scale-105 duration-300">
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li>Call us: (123) 456-7890</li>
                            <li>Email: support@yourportfolio.com</li>
                            <li>Address: 123 Portfolio St., City, Country</li>
                            <li>Mon - Fri: 09:00 AM to 06:00 PM</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Links and Bottom */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    {/* Footer Links */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <Link
                            to="/privacy-policy"
                            className="hover:text-[#9B7EBD] transition-colors duration-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-of-service"
                            className="hover:text-[#9B7EBD] transition-colors duration-300"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-[#9B7EBD] transition-colors duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Footer Bottom */}
                    <div className="mt-4 md:mt-0 text-center">
                        &copy; {new Date().getFullYear()} Your Portfolio Name.
                        All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
