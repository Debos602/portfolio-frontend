import { motion } from "framer-motion";

const Introduction = () => {
    return (
        <div
            style={{
                backgroundColor: "#9B7EBD",
                color: "#EEEEEE",
                padding: "2rem",
                textAlign: "start",
                fontFamily: "Arial, sans-serif",
            }}
            className="h-screen"
        >
            <motion.h1
                style={{
                    color: "#3B1E54",
                }}
                className="text-7xl font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Hi,
            </motion.h1>
            <motion.h2
                style={{
                    color: "#3B1E54",
                }}
                className="text-7xl font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                I'm Debos Das
            </motion.h2>
            <motion.p
                className="text-5xl font-extralight"
                style={{
                    color: "#3B1E54",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                A Web Developer,
                <br />
                Frontend Developer / React Developer / Backend Developer
            </motion.p>
            <motion.button
                className="mt-5 border-2 border-[#3B1E54] uppercase rounded px-6 py-3 text-lg font-medium bg-[#3B1E54] text-[#EEEEEE] shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#D4BEE4] hover:text-[#3B1E54] focus:outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                Contact Me
            </motion.button>
        </div>
    );
};

export default Introduction;
