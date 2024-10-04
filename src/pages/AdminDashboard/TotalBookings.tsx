import { useEffect, useState } from "react";
import { useGetAllBookingsQuery } from "@/redux/feature/booking/bookingApi";
import { Spin, Table } from "antd";

const TotalBookings = () => {
    const { data: bookingsData, isLoading } = useGetAllBookingsQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, []);

    // Log the bookings data to check its structure
    console.log("Bookings data:", bookingsData);

    // Assuming `bookingsData.data` contains the array of bookings
    const bookings = Array.isArray(bookingsData?.data) ? bookingsData.data : [];

    // Define table columns
    const columns = [
        {
            title: "Email",
            dataIndex: ["user", "email"], // Assuming user data contains 'email'
            key: "email",
        },
        {
            title: "User",
            dataIndex: ["user", "name"], // Assuming user data contains 'name'
            key: "user",
        },
        {
            title: "Car Brand",
            dataIndex: ["car", "name"], // Assuming car data contains 'name'
            key: "car",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Total Cost",
            dataIndex: "totalCost",
            key: "totalCost",
            render: (cost: number) => `$${cost.toFixed(2)}`,
        },
    ];

    if (isLoading && !showContent) {
        return <Spin size="large" />;
    }

    return (
        <div>
            {bookings.length > 0 ? (
                <Table
                    columns={columns}
                    dataSource={bookings}
                    // rowKey={(record) => record._id || record._id} // Adjust to match actual key (e.g., `id` or `_id`)
                />
            ) : (
                <p>No bookings available</p>
            )}
        </div>
    );
};

export default TotalBookings;
