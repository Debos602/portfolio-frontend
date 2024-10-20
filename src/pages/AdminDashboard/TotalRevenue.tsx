import { useGetAllOrdersQuery } from "@/redux/feature/order/orderApi";
import { Spin } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { TOrder } from "@/types/global";

const TotalRevenue = () => {
    const { data: orders, isLoading } = useGetAllOrdersQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    console.log();

    if (isLoading) {
        return <Spin size="large" />;
    }

    // Calculate total revenue
    const totalRevenue = orders?.data?.reduce(
        (sum: number, order: TOrder) =>
            sum + (order.paymentStatus === "paid" ? order.totalCost : 0),
        0
    );

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Total Revenue
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                    <DollarCircleOutlined className="text-green-500 text-4xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Total Revenue Generated
                </h3>
                <p className="text-5xl font-extrabold text-green-600 mb-2">
                    ${totalRevenue?.toFixed(2)}
                </p>
                <p className="text-gray-600">
                    Total from {orders?.length} orders
                </p>
            </div>
        </div>
    );
};

export default TotalRevenue;
