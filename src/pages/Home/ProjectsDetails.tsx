import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetails = () => {
    const location = useLocation();
    const project = location.state?.projectData; // Access the passed project data

    return (
        <div className="min-h-screen bg-[#EEEEEE] p-6 flex justify-center items-center">
            {/* Animate the container with fade-in effect */}
            <motion.div
                className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.h1
                    className="text-3xl font-bold text-[#3B1E54] mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Project Details
                </motion.h1>
                {project ? (
                    <>
                        <motion.h2
                            className="text-2xl text-[#9B7EBD] font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {project.title}
                        </motion.h2>

                        {/* Animate the image */}
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto rounded-lg mt-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />

                        <motion.p
                            className="mt-4 text-[#3B1E54]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {project.description}
                        </motion.p>

                        <div className="mt-6 flex justify-between items-center">
                            <motion.a
                                href={project.githubLinkFrontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3B1E54] hover:text-[#9B7EBD] transition duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                GitHub frontend
                            </motion.a>
                            <motion.a
                                href={project.githubLinkBackend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3B1E54] hover:text-[#9B7EBD] transition duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                GitHub backend
                            </motion.a>
                            <motion.a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3B1E54] hover:text-[#9B7EBD] transition duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Live Project
                            </motion.a>
                        </div>
                    </>
                ) : (
                    <p className="text-[#3B1E54]">No project data available.</p>
                )}
            </motion.div>
        </div>
    );
};

export default ProjectDetails;
