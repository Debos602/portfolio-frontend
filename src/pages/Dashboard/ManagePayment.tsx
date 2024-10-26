import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import { useCreateOrderMutation } from "@/redux/feature/order/orderApi";
import { Bookings } from "@/types/global";
import { Button, Card, Table } from "antd";
import { toast } from "sonner";

const ManagePayment = () => {
    const [createOrder] = useCreateOrderMutation();
    const { data: bookings } = useGetBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const { endTime, startTime, totalCost, date, user, car, paymentStatus } =
        bookings?.data[0] || {};

    const handleCreateOrder = async () => {
        const orderData = {
            carName: car?.name, // Optional chaining in case car is undefined
            date,
            startTime,
            endTime,
            totalCost,
            name: user?.name, // Optional chaining for user details
            email: user?.email,
            phone: user?.phone,
            paymentStatus,
        };

        console.log("Order data:", orderData);

        try {
            const response = await createOrder(orderData).unwrap();
            console.log("Order created:", response);
            toast.success("Payment link created successfully");
            window.open(response?.data?.payment_url, "_self");
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const columns = [
        {
            title: "Car Name",
            key: "carName",
            render: (record: Bookings) => record.car?.name || "N/A", // Access the car name within the record
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (endTime: string | null) => (endTime ? endTime : "Ongoing"),
        },
        {
            title: "Total Cost",
            dataIndex: "totalCost",
            key: "totalCost",
            render: (totalCost: number) => `$${totalCost.toFixed(2)}`,
        },
    ];

    return (
        <div>
            <h1 className="text-center from-amber-200 to-amber-50 bg-gradient-to-b py-16 text-5xl font-normal uppercase rounded-xl">
                Manage Payment
            </h1>
            <Card className="text-center">
                <h2 className="text-xl font-semibold text-center">
                    Booking Summary
                </h2>
                <Table
                    dataSource={bookings?.data || []}
                    columns={columns}
                    rowKey={(record: Bookings) => record._id} // Use a unique key, such as _id
                    pagination={false} // Disable pagination if not needed
                />
                <p className="mt-4 text-lg font-semibold">
                    Total Cost: ${totalCost?.toFixed(2)}
                </p>

                <Button
                    className="bg-gray-700 text-white hover:bg-white border-2 border-black rounded-xl px-4 py-2 hover:text-black uppercase font-semibold duration-500 transition"
                    onClick={handleCreateOrder}
                >
                    Proceed to Payment
                </Button>
            </Card>
        </div>
    );
};

export default ManagePayment;
