import { Button } from "antd";

const tabs = [
    {
        name: "Total Bookings",
        value: "bookings",
    },
    {
        name: "Available Cars",
        value: "cars",
    },
    {
        name: "Total Revenue",
        value: "revenue",
    },
];

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function OverviewTab({
    activeTab,
    setActiveTab,
}: ProfileTabsProps) {
    return (
        <div className="rounded-lg p-2 w-full flex xs:gap-2 sm:gap-4 overflow-x-auto border">
            {tabs.map((tab) => (
                <Button
                    key={tab.value}
                    type="default" // Use a valid type like 'default'
                    className={`text-md ${
                        activeTab === tab.value ? "bg-black text-white" : ""
                    }`} // Add custom classes
                    onClick={() => setActiveTab(tab.value)}
                >
                    {tab.name}
                </Button>
            ))}
        </div>
    );
}
