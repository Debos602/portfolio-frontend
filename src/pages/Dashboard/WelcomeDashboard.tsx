import React from "react";

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
        <div className="bg-[#3B1E54] text-[#EEEEEE] p-8 rounded-lg shadow-md border-2 border-[#D4BEE4]">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-[#D4BEE4]">
                    Welcome, {adminName}!
                </h1>
                <p className="text-[#9B7EBD] mt-2">
                    Here’s a quick overview of your dashboard.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Blogs Card */}
                <div className="bg-[#9B7EBD] text-[#3B1E54] p-6 rounded-lg shadow-md inline-block">
                    <h2 className="text-xl font-semibold text-center">Total</h2>
                    <p className="text-3xl font-bold text-center mt-2">
                        {totalBlogs}
                    </p>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-[#D4BEE4] text-[#3B1E54] p-6 rounded-lg shadow-md md:col-span-2">
                    <h2 className="text-xl font-semibold">Recent Activities</h2>
                    {recentActivity.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                            {recentActivity.map((activity, index) => (
                                <li
                                    key={index}
                                    className="p-3 bg-[#9B7EBD] text-[#3B1E54] rounded shadow-md inline-block m-2"
                                >
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2 text-[#3B1E54]">
                            No recent activities to display.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeDashboard;
