import { Collapse, Progress } from "antd";
import { motion } from "framer-motion";

const { Panel } = Collapse;

const Skills = () => {
    const skills = [
        { title: "HTML", description: "Structure for web content." },
        { title: "CSS", description: "Styling for web design." },
        {
            title: "JavaScript",
            description: "Interactive behavior for web apps.",
        },
        { title: "React", description: "Building user interfaces." },
        { title: "Redux", description: "State management for complex apps." },
        {
            title: "Next.js",
            description: "Server-side rendering and static site generation.",
        },
        {
            title: "Node.js",
            description: "JavaScript runtime for server-side development.",
        },
        {
            title: "Express.js",
            description: "Framework for building web servers.",
        },
        {
            title: "MongoDB",
            description: "NoSQL database for scalable storage.",
        },
        { title: "TypeScript", description: "Strongly typed JavaScript." },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="bg-[#EEEEEE] py-10 px-5">
            <motion.h2
                className="text-4xl font-bold text-center text-[#3B1E54] mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Skills
            </motion.h2>
            <motion.div
                className="max-w-7xl mx-auto space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Collapse
                    accordion
                    defaultActiveKey={["0"]} // Optionally set the default opened panel
                    expandIconPosition="right"
                    className="w-full"
                >
                    {skills.map((skill, index) => (
                        <motion.div key={index} variants={skillVariants}>
                            <Panel
                                header={
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-[#3B1E54]">
                                            {skill.title}
                                        </h3>
                                        <Progress
                                            percent={Math.floor(
                                                Math.random() * 100
                                            )}
                                            size="small"
                                            className="mt-2"
                                            strokeColor="#9B7EBD"
                                        />
                                    </div>
                                }
                                key={index}
                                className="bg-white rounded-lg border border-[#D4BEE4] mb-4"
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #D4BEE4",
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <p className="text-sm text-gray-700 mt-2">
                                    {skill.description}
                                </p>
                            </Panel>
                        </motion.div>
                    ))}
                </Collapse>
            </motion.div>
        </section>
    );
};

export default Skills;
