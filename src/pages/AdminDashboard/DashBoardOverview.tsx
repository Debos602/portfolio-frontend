import { useState } from "react";
import OverviewTab from "./OverviewTab";
import TotalBookings from "./TotalBookings";
import AvailableCar from "./AvailableCar";
import TotalRevenue from "./TotalRevenue";

const DashBoardOverview = () => {
    const [activeTab, setActiveTab] = useState("bookings");

    return (
        <div className="text-center">
            <h1 className=" from-amber-200 to-amber-50 bg-gradient-to-b  py-16 text-5xl font-normal uppercase rounded-xl">
                Welecome to admin dashboard
            </h1>
            <OverviewTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="my-4">
                {activeTab === "bookings" && <TotalBookings />}
                {activeTab === "cars" && <AvailableCar />}
                {activeTab === "revenue" && <TotalRevenue />}
            </div>
        </div>
    );
};

export default DashBoardOverview;
