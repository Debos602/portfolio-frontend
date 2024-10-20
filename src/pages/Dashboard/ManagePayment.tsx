import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import { useCreateOrderMutation } from "@/redux/feature/order/orderApi";
import { Bookings, TOrder } from "@/types/global";
import { Card, Table } from "antd";
import { Link } from "react-router-dom";

const ManagePayment = () => {
    const [createOrder] = useCreateOrderMutation();
    const { data: bookings, refetch } = useGetBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const bookingHistory = bookings?.data?.map((booking: Bookings) => ({
        carName: booking?.car?.name,
        date: booking?.date,
        startTime: booking?.startTime,
        endTime: booking?.endTime,
        totalCost: booking?.totalCost,
        transactionId: booking?.transactionId,
        paymentStatus: booking?.paymentStatus,
    }));

    // Calculate total cost of all bookings
    const totalCost = bookingHistory?.reduce(
        (acc: number, booking: { totalCost: number }) =>
            acc + booking.totalCost,
        0
    );
    const handleCreateOrder = () => {
        console.log(bookings);
        const bookingHistory = bookings?.data?.map((booking: Bookings) => ({
            carName: booking?.car?.name,
            date: booking?.date,
            startTime: booking?.startTime,
            endTime: booking?.endTime,
            totalCost: booking?.totalCost.toFixed(2),
            transactionId: booking?.transactionId,
            name: booking?.user?.name, // Add user details
            email: booking?.user?.email,
            phone: booking?.user?.phone,
            paymentStatus: booking?.paymentStatus || "pending", // Ensure this is properly set
        }));

        Promise.all(
            bookingHistory.map(async (booking: TOrder) => {
                console.log("Booking:", booking);
                try {
                    const response = await createOrder(booking);
                    console.log("Order created response:", response);
                    window.location.href = response.data.data.payment_url;
                } catch (error) {
                    console.error("Error creating order:", error);
                }
            })
        ).then(() => {
            console.log("All orders processed");
            refetch(); // Refetch data after all orders are created
        });
    };

    const columns = [
        {
            title: "Car Name",
            dataIndex: "carName",
            key: "carName",
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
            <h1 className=" text-center from-amber-200 to-amber-50 bg-gradient-to-b  py-16 text-5xl font-normal uppercase rounded-xl">
                Manage Payment
            </h1>
            <Card className="text-center ">
                <h2 className="text-xl font-semibold text-center">
                    Booking Summary
                </h2>
                <Table
                    dataSource={bookingHistory}
                    columns={columns}
                    rowKey="carName" // Use a unique key, assuming carName is unique
                    pagination={false} // Disable pagination if not needed
                />
                {/* Display Total Cost */}
                <p className="mt-4 text-lg font-semibold">
                    Total Cost: ${totalCost?.toFixed(2)}
                </p>

                <Link
                    className="bg-gray-700 text-white w-full hover:bg-white border-2 border-black rounded-xl px-4 py-2 hover:text-black uppercase font-semibold duration-500 transition"
                    to=""
                    onClick={handleCreateOrder}
                >
                    {" "}
                    Proceed to Payment
                </Link>
            </Card>
        </div>
    );
};

export default ManagePayment;
