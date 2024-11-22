import { useGetAllProjectsQuery } from "@/redux/feature/project/project.api";
import { TProject } from "@/types/global"; // Make sure to define TProject type based on your data
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
    const navigate = useNavigate();

    const {
        data: projects,
        isLoading,
        error,
    } = useGetAllProjectsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

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

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (error) return <div>Error fetching projects</div>;

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
                {projects?.data?.map((project: TProject, index: number) => (
                    <motion.div
                        key={index}
                        className="bg-[#D4BEE4] rounded-xl shadow-md  p-6 border border-[#D4BEE4] hover:shadow-lg transition-shadow duration-300"
                        variants={cardVariants}
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold text-[#3B1E54]">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                            {project.description}
                        </p>
                        <div className="mt-4">
                            <Link
                                to={project.githubLinkFrontend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#3B1E54] underline mr-4"
                            >
                                GitHub frontend
                            </Link>
                            <Link
                                to={project.githubLinkBackend}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#3B1E54] underline mr-4"
                            >
                                GitHub Backend
                            </Link>
                            <Link
                                to={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#3B1E54] underline"
                            >
                                Live Link
                            </Link>
                        </div>
                        <button
                            onClick={() =>
                                navigate(`/projects/${project._id}`, {
                                    state: { projectData: project },
                                })
                            }
                            className="mt-4 w-full bg-[#3B1E54] text-white py-2 px-4 rounded hover:bg-[#9B7EBD] transition-colors duration-300"
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
