import { Button } from "antd";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-[#EEEEEE] py-16 px-6 overflow-hidden h-screen">
            {/* Grid Container for Two Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto">
                {/* Me & Myself Section with Animation */}
                <motion.section
                    className="bg-[#3B1E54] text-white p-8 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-semibold mb-4">Me & Myself</h2>
                    <p className="text-lg mb-4">
                        I'm a front-end developer from Bangladesh, with a
                        passion for crafting engaging UI effects, animations,
                        and intuitive user experiences. I specialize in
                        front-end development, creating responsive websites that
                        are fast, user-friendly, and built on best practices.
                    </p>
                    <p className="text-lg mb-4">
                        Driven by my love for technology, I’m committed to
                        deepening my skills and mastering new tools. I tackle
                        challenges with patience and determination, always
                        aiming to deliver high-quality solutions.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            backgroundColor: "#9B7EBD",
                            borderColor: "#9B7EBD",
                            marginTop: 16,
                        }}
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href =
                                "https://drive.google.com/uc?export=download&id=1s0hbePFzDeBL2he2QPFpiQXVXFD0GGgE"; // Direct download link
                            link.click();
                        }}
                    >
                        My Resume
                    </Button>
                </motion.section>

                {/* Skills Rotation Section with Animation */}
                <motion.section
                    className="text-white p-8 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="space-y-4">
                        {/* Circular Animation Container */}
                        <motion.div
                            className="relative flex justify-center items-center h-[400px] w-[400px] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {/* Elements placed in 4 circular layers */}
                            {[...Array(6)].map((_, layerIndex) => (
                                <div
                                    key={layerIndex}
                                    className={`absolute inset-0 flex justify-center items-center`}
                                    style={{
                                        transform: `scale(${
                                            0.25 * (layerIndex + 1)
                                        })`,
                                    }}
                                >
                                    {[
                                        "HTML",
                                        "CSS",
                                        "React",
                                        "Redux",
                                        "JavaScript",
                                        "Tailwind CSS",
                                        "TypeScript",
                                        "MongoDB Database",
                                        "Ant Design",
                                        "Flowbite",
                                        "Next.js",
                                        "Node.js",
                                        "Authentication",
                                    ].map((item, elementIndex) => {
                                        const angle = (360 / 11) * elementIndex; // Adjust for 11 elements
                                        const isRight = elementIndex < 15;
                                        return (
                                            <motion.div
                                                key={elementIndex}
                                                className={`absolute w-[80px] h-[80px] rounded-full bg-[#3B1E54] text-center text-[10px] flex items-center justify-center font-semibold ${
                                                    isRight
                                                        ? "border-4 border-blue-400"
                                                        : "border-4 border-pink-500"
                                                }`}
                                                style={{
                                                    transform: `rotate(${angle}deg) translateX(${
                                                        isRight
                                                            ? "80px"
                                                            : "-80px"
                                                    }) rotate(-${angle}deg)`,
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: elementIndex * 0.1, // Staggering effect
                                                }}
                                            >
                                                <motion.div
                                                    animate={{ rotate: -360 }}
                                                    transition={{
                                                        duration: 30,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                >
                                                    {item}
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default About;
