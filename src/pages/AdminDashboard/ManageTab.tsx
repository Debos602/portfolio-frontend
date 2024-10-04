import { Button } from "antd";

const Managetabs = [
    {
        name: "Add Car",
        value: "add",
    },
    {
        name: "Update Car",
        value: "update",
    },
    {
        name: "Delete Car",
        value: "delete",
    },
];

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
export default function ManageTabs({
    activeTab,
    setActiveTab,
}: ProfileTabsProps) {
    return (
        <div className="rounded-lg p-2 w-full flex xs:gap-2 sm:gap-4 overflow-x-auto border">
            {Managetabs.map((tab) => (
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
