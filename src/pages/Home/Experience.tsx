import { useGetAllExperiencesQuery } from "@/redux/feature/experience/experience.api";
import { TExperience } from "@/types/global";
import { motion } from "framer-motion";
import { format } from "date-fns";

const Experience = () => {
    // Destructure the query result properly
    const {
        data: experiences,
        isLoading,
        error,
    } = useGetAllExperiencesQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
                duration: 0.6,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    // Check if the data is loading or there's an error
    if (isLoading)
        return <div className="text-center text-[#9B7EBD]">Loading...</div>;
    if (error)
        return (
            <div className="text-center text-[#D4BEE4]">
                Error fetching experiences
            </div>
        );

    // Check if there are no experiences available
    if (!experiences?.data?.length) {
        return (
            <div className="text-center py-10 bg-gradient-to-r from-[#3B1E54] to-[#9B7EBD] text-white rounded-lg">
                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    No Professional Experience Available
                </motion.h2>
                <p className="text-lg text-[#EEEEEE]">
                    It looks like there are no experiences to display at the
                    moment. Please check back later or contact us for more
                    information.
                </p>
            </div>
        );
    }

    return (
        <section className="bg-[#EEEEEE] py-10 px-5">
            <motion.h2
                className="text-4xl font-bold text-center text-[#3B1E54] mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Professional Experience
            </motion.h2>
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Ensure experiences is an array before mapping */}
                {experiences?.data?.map((exp: TExperience, index: number) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 border border-[#D4BEE4] hover:shadow-xl transition-all"
                        variants={cardVariants}
                    >
                        <h3 className="text-xl font-semibold text-[#3B1E54] hover:text-[#9B7EBD] transition-colors">
                            {exp.title}
                        </h3>
                        <p className="text-sm text-[#9B7EBD]">{exp.company}</p>
                        <p className="text-sm text-gray-600">
                            {format(new Date(exp.startDate), "MMMM yyyy")} -{" "}
                            {format(new Date(exp.endDate), "MMMM yyyy")}
                        </p>
                        <p className="text-gray-800 mt-3">{exp.description}</p>
                        <ul className="list-disc list-inside mt-3 text-gray-700">
                            <li>
                                <strong>Role:</strong> {exp.role}
                            </li>
                            <li>
                                <strong>Location:</strong> {exp.location}
                            </li>
                            <li>
                                <strong>Technologies:</strong>{" "}
                                {exp.technologies}
                            </li>
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Experience;
