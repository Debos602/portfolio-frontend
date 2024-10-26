import { useState } from "react";
import UpdatesCar from "./UpdatesCar";
import AddsCar from "./AddsCar";
import ManageTabs from "./ManageTab";

const ManageCar = () => {
    const [activeTab, setActiveTab] = useState("add");
    return (
        <div>
            <h1 className="text-center from-amber-200 to-amber-50 bg-gradient-to-b  py-16 text-5xl font-normal uppercase rounded-xl">
                Manage Car
            </h1>
            <ManageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-4 container mx-auto">
                {activeTab === "add" && <AddsCar />}
                {activeTab === "update-and-delete" && <UpdatesCar />}
            </div>
        </div>
    );
};

export default ManageCar;
