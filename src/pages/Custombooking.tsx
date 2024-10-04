import {
    useDeleteBookingMutation,
    useGetBookingsQuery,
} from "@/redux/feature/booking/bookingApi";
import { TBooking } from "@/types/global";
import { Button, Spin, Table, Modal, message } from "antd";
import { useState } from "react";

const Custombooking = () => {
    const {
        data: bookings,
        isLoading,
        refetch,
    } = useGetBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const [deleteBooking, { isLoading: isDeleting }] =
        useDeleteBookingMutation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
        null
    );

    const showConfirmModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setModalVisible(true);
    };

    const handleCancelBooking = async () => {
        if (!selectedBookingId) return;

        try {
            await deleteBooking(selectedBookingId).unwrap();
            message.success("Booking cancelled successfully!");
            refetch();
        } catch (error) {
            message.error("Failed to cancel the booking.");
        } finally {
            setModalVisible(false);
            setSelectedBookingId(null);
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string, record: TBooking) => (
                <img
                    src={record?.car?.image}
                    className="h-24 w-48 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    alt="Car Image"
                />
            ),
        },
        {
            title: "Car",
            dataIndex: ["car", "name"],
            key: "car",
            render: (carName: string) => (
                <span className="font-semibold text-gray-800 hover:text-blue-500 transition-all duration-300">
                    {carName}
                </span>
            ),
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (startTime: string) => (
                <span className="text-gray-600">
                    {new Date(startTime).toLocaleString()}
                </span>
            ),
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (endTime: string) => (
                <span className="text-gray-600">
                    {new Date(endTime).toLocaleString()}
                </span>
            ),
        },
        {
            title: "Total Cost",
            dataIndex: "totalCost",
            key: "totalCost",
            render: (totalCost: number) => (
                <span className="font-semibold text-green-600">
                    ${totalCost}
                </span>
            ),
        },
        // {
        //     title: "Status",
        //     dataIndex: "status",
        //     key: "status",
        //     render: (status: string) => (
        //         <span
        //             className={`px-3 py-1 rounded-lg font-semibold shadow-md transition-all duration-300 ${
        //                 status === "available"
        //                     ? "bg-green-100 text-green-700"
        //                     : status === "pending"
        //                     ? "bg-yellow-100 text-yellow-700"
        //                     : "bg-red-100 text-red-700"
        //             }`}
        //         >
        //             {status}
        //         </span>
        //     ),
        // },
        {
            title: "Actions",
            key: "actions",
            render: (text: string, record: TBooking) => (
                <Button
                    className={`border-2 text-black px-4 py-1 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                        record.status === "approved"
                            ? "bg-gray-300 cursor-not-allowed border-gray-300"
                            : "bg-white border-black hover:bg-black hover:text-white"
                    }`}
                    type="link"
                    onClick={() => showConfirmModal(record._id)}
                    disabled={record.status === "approved"}
                >
                    Cancel
                </Button>
            ),
        },
    ];

    if (isLoading) return <Spin size="large" />;

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
                Manage Your Bookings
            </h2>
            <Table
                dataSource={bookings?.data}
                columns={columns}
                rowKey="_id"
                className="hover:shadow-lg transition-all duration-300 bg-gray-50 rounded-lg"
            />
            <Modal
                title="Cancel Booking"
                visible={modalVisible}
                onOk={handleCancelBooking}
                onCancel={() => setModalVisible(false)}
                confirmLoading={isDeleting}
                centered
                className="rounded-lg"
                okButtonProps={{
                    className:
                        "bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-full px-6 py-2",
                }}
                cancelButtonProps={{
                    className:
                        "border-gray-300 hover:border-black transition-all duration-300 rounded-full px-6 py-2",
                }}
            >
                <p className="text-lg text-gray-700">
                    Are you sure you want to cancel this booking?
                </p>
            </Modal>
        </div>
    );
};

export default Custombooking;
