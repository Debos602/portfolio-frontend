import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface ButtonProps {
    children: React.ReactNode;
    to: string;
}

const Buttons = ({ children, to }: ButtonProps) => {
    return (
        <Link
            to={to}
            className="bg-black inline-block border-2 border-black text-white hover:bg-white hover:text-black transition-all duration-700 px-8 py-3 rounded-3xl font-bold text-xl"
        >
            {children}
            <RightOutlined className="ml-1 text-sm" />
        </Link>
    );
};

export default Buttons;
