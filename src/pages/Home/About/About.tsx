import React from "react";
import { Button } from "antd";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-[#EEEEEE] py-16 px-6">
            {/* Grid Container for Two Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto">
                {/* Me & Myself Section */}
                <section className="bg-[#3B1E54] text-white p-8 rounded-lg shadow-lg">
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
                    >
                        My Resume
                    </Button>
                </section>

                {/* Skills Rotation Section */}
                <section className=" text-white p-8 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        {/* Rotation Animation Area */}
                        <motion.div
                            className="flex justify-center items-center  h-[300px] w-[300px] rounded-full overflow-hidden"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="flex flex-col justify-center items-center text-[#3B1E54]">
                                {/* Individual Skills with Rotation Animation */}
                                {[
                                    "HTML",
                                    "CSS",
                                    "JavaScript",
                                    "React",
                                    "Redux",
                                    "Next.js",
                                    "Node.js",
                                    "Express.js",
                                    "MongoDB",
                                    "TypeScript",
                                    "Backend Database",
                                ].map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 border-[#D4BEE4] text-center mb-2"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            delay: index * 0.5, // Staggered delay for rotation
                                            ease: "linear",
                                        }}
                                    >
                                        <h3 className="text-lg font-semibold">
                                            {skill}
                                        </h3>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
