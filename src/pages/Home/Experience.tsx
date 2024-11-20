import { motion } from "framer-motion";

const experiences = [
    {
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        startDate: "Jan 2022",
        endDate: "Present",
        description:
            "Developed responsive web applications with React and Tailwind CSS.",
        location: "San Francisco, CA",
        role: "Developer",
        designation: "Software Engineer",
        responsibilities:
            "Collaborated with designers and backend engineers to build modern UIs.",
        technologies: "React, Tailwind CSS, TypeScript",
    },
    {
        title: "UI/UX Designer",
        company: "Creative Agency",
        startDate: "May 2019",
        endDate: "Dec 2021",
        description:
            "Designed and prototyped user-friendly interfaces for various clients.",
        location: "New York, NY",
        role: "Designer",
        designation: "Lead Designer",
        responsibilities:
            "Created wireframes and design systems for scalable applications.",
        technologies: "Figma, Adobe XD, Sketch",
    },
];

const Experience = () => {
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
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 border border-[#D4BEE4]"
                        variants={cardVariants}
                    >
                        <h3 className="text-xl font-semibold text-[#3B1E54]">
                            {exp.title}
                        </h3>
                        <p className="text-sm text-[#9B7EBD]">{exp.company}</p>
                        <p className="text-sm text-gray-600">
                            {exp.startDate} - {exp.endDate}
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
