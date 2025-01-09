import React from "react";
import { motion } from "framer-motion";

interface WelcomeDashboardProps {
    adminName: string;
    totalBlogs?: number;
    recentActivity?: string[];
}

const WelcomeDashboard: React.FC<WelcomeDashboardProps> = ({
    adminName,
    totalBlogs = 0,
    recentActivity = [],
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-8"
        >
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold text-black">
                    Welcome, {adminName}!
                </h1>
                <p className="text-black text-lg mt-2">
                    Here’s a quick overview of your dashboard.
                </p>
            </motion.div>

            {/* Cards Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {/* Total Blogs Card */}
                <motion.div

                    className="text-black p-6 border-2 rounded-xl shadow-md inline-block"
                >
                    <h2 className="text-xl font-semibold text-center">Total</h2>
                    <p className="text-3xl font-bold text-center mt-2">
                        {totalBlogs}
                    </p>
                </motion.div>

                {/* Recent Activity Card */}
                <motion.div

                    className=" text-black border-2 p-6 rounded-xl shadow-md md:col-span-2"
                >
                    <h2 className="text-2xl font-semibold">Recent Activities</h2>
                    {recentActivity.length > 0 ? (
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delayChildren: 0.3,
                                        staggerChildren: 0.2,
                                    },
                                },
                            }}
                            className="mt-2"
                        >
                            {recentActivity.map((activity, index) => (
                                <motion.li
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    className="p-3 text-lg  text-black rounded shadow-md inline-block m-2"
                                >
                                    {activity}
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : (
                        <p className="mt-2 text-black">
                            No recent activities to display.
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default WelcomeDashboard;
