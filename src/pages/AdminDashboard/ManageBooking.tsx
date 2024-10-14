import { Spin, Table, Button, Popconfirm, message, Tooltip } from "antd";
import {
    useGetAllBookingsQuery,
    useDeleteBookingMutation,
    useUpdateBookingMutation,
} from "@/redux/feature/booking/bookingApi";
import type { ColumnsType } from "antd/es/table";
import { TBooking } from "@/types/global";

const ManageBooking = () => {
    const {
        data: bookings,
        isLoading,
        refetch,
    } = useGetAllBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const [updateBooking] = useUpdateBookingMutation();
    const [cancelBooking] = useDeleteBookingMutation();

    // Approve booking handler
    const handleApprove = async (bookingId: string) => {
        try {
            const updatedData = {
                _id: bookingId,
                status: "approved",
            };
            await updateBooking(updatedData).unwrap();
            message.success("Booking approved successfully.");
            refetch();
        } catch (error) {
            message.error("Failed to approve booking.");
        }
    };

    // Cancel booking handler
    const handleCancel = async (bookingId: string) => {
        try {
            await cancelBooking(bookingId).unwrap();
            message.success("Booking canceled successfully.");
            refetch();
        } catch (error) {
            message.error("Failed to cancel booking.");
        }
    };

    // Define table columns
    const columns: ColumnsType<TBooking> = [
        {
            title: "User Email",
            dataIndex: ["user", "email"],
            key: "userEmail",
            responsive: ["md"], // Only show on medium screens and above
        },
        {
            title: "Phone",
            dataIndex: ["user", "phone"],
            key: "userPhone",
            responsive: ["md"],
        },
        {
            title: "Car Name",
            dataIndex: ["car", "name"],
            key: "carName",
        },
        {
            title: "Price Per Hour",
            dataIndex: ["car", "pricePerHour"],
            key: "pricePerHour",
            render: (price: number) => `$${price}`,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date: string) => new Date(date).toLocaleDateString(),
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
            render: (time: string | null) =>
                time
                    ? new Date(`1970-01-01T${time}`).toLocaleTimeString()
                    : "N/A",
        },
        {
            title: "Total Cost",
            dataIndex: "totalCost",
            key: "totalCost",
            render: (cost: number) => (cost ? `$${cost}` : "N/A"),
        },
        {
            title: "Booking Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => status.toUpperCase(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: TBooking) => (
                <div className="flex space-x-2">
                    <Tooltip title="Approve">
                        <Popconfirm
                            title="Are you sure you want to approve this booking?"
                            onConfirm={() => handleApprove(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                size="small"
                                className="mr-2"
                                disabled={record.status === "approved"}
                            >
                                Approve
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <Popconfirm
                            title="Are you sure you want to cancel this booking?"
                            onConfirm={() => handleCancel(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                danger
                                size="small"
                                disabled={record.status === "canceled"}
                            >
                                Cancel
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-center bg-gradient-to-b from-amber-200 to-amber-50 py-8 text-4xl font-bold uppercase rounded-lg mb-6">
                Manage Bookings
            </h1>

            {/* Ant Design Table with responsive styles */}
            <Table
                columns={columns}
                dataSource={
                    Array.isArray(bookings?.data)
                        ? bookings.data.map(
                              (booking: TBooking, index: number) => ({
                                  ...booking,
                                  key: index,
                              })
                          )
                        : []
                }
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: 800 }}
                className="w-full overflow-auto"
            />
        </div>
    );
};

export default ManageBooking;
