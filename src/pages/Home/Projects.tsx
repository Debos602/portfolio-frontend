import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Adjust based on your routing library

const projects = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio to showcase skills and projects.",
        githubLink: "https://github.com/user/portfolio",
        liveLink: "https://portfolio.example.com",
    },
    {
        title: "E-commerce Platform",
        description:
            "An online store with user authentication and cart functionality.",
        githubLink: "https://github.com/user/ecommerce",
        liveLink: "https://ecommerce.example.com",
    },
    {
        title: "Task Manager",
        description: "A task management app with real-time updates.",
        githubLink: "https://github.com/user/task-manager",
        liveLink: "https://task-manager.example.com",
    },
];

const Projects = () => {
    const navigate = useNavigate();

    const handleProjectDetails = (projectTitle: string) => {
        navigate(
            `/projects/${projectTitle.toLowerCase().replace(/\s+/g, "-")}`
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
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
                Projects
            </motion.h2>
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 border border-[#D4BEE4] hover:shadow-lg transition-shadow duration-300"
                        variants={cardVariants}
                    >
                        <h3 className="text-xl font-semibold text-[#3B1E54]">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            {project.description}
                        </p>
                        <div className="mt-4">
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#9B7EBD] underline mr-4"
                            >
                                GitHub
                            </a>
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#9B7EBD] underline"
                            >
                                Live Demo
                            </a>
                        </div>
                        <button
                            onClick={() => handleProjectDetails(project.title)}
                            className="mt-4 bg-[#3B1E54] text-white py-2 px-4 rounded hover:bg-[#9B7EBD] transition-colors duration-300"
                        >
                            Project Details
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;
