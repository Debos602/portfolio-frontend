import {
    useDeleteBookingMutation,
    useGetBookingsQuery,
} from "@/redux/feature/booking/bookingApi";
import { Bookings } from "@/types/global";
import { Button, Spin, Table, Modal, message } from "antd";
import { useState } from "react";

interface ApiError {
    data?: {
        message: string;
    };
    status?: number;
}

const Custombooking = () => {
    // State to track whether to hit the booking API or not

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
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.message || "Failed to cancel the booking.";
            message.error(errorMessage);
        } finally {
            setModalVisible(false);
            setSelectedBookingId(null);
        }
    };

    if (isLoading) return <Spin size="large" />;

    // Display message when no bookings are found
    if (!isLoading && bookings?.data?.length === 0) {
        return (
            <div className="text-center">
                <p className="text-gray-600">
                    No bookings found. Please create a booking to see your list
                    here.
                </p>
            </div>
        );
    }

    const columns = [
        {
            title: "Image",
            dataIndex: ["car", "image"], // Fix here to directly access car image
            key: "image",
            render: (image: string) => (
                <img
                    src={image}
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
                    ${totalCost.toFixed(2)}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: Bookings) => (
                <Button
                    className={`border-2 text-black px-4 py-1 rounded-lg font-semibold transition-all duration-300 ${
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

    return (
        <div className=" bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500">
            <h2 className="text-center from-amber-200 to-amber-50 bg-gradient-to-b  py-16 text-5xl font-normal uppercase rounded-xl">
                Manage Your Booking
            </h2>
            {bookings?.data && bookings.data.length > 0 ? (
                <Table
                    dataSource={bookings.data}
                    columns={columns}
                    rowKey="_id"
                    className="hover:shadow-lg transition-all duration-300 bg-gray-50 rounded-lg"
                />
            ) : (
                <p className="text-center text-gray-600">
                    No bookings found. Please create a booking to see your list
                    here.
                </p>
            )}
            <Modal
                title="Cancel Booking"
                open={modalVisible}
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
