import { Spin, Table, Button, Popconfirm, message, Tooltip } from "antd";
import { useGetAllBookingsQuery } from "@/redux/feature/booking/bookingApi";
import type { ColumnsType } from "antd/es/table";
import { TBooking } from "@/types/global";
import { useState } from "react";
import { useReturnCarMutation } from "@/redux/feature/car/carManagement.api";

const ManageReturnCars = () => {
    const {
        data: bookings,
        isLoading,
        refetch,
    } = useGetAllBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    console.log(bookings);
    const [returncar] = useReturnCarMutation();
    const [loading, setLoading] = useState(false);

    // Return car handler
    const handleReturnCar = async (bookingId: string) => {
        try {
            setLoading(true);
            const endTime = new Date().toISOString(); // Current time as endTime
            const updatedData = {
                bookingId,
                endTime, // Update the endTime to current time
                status: "completed",
            };

            console.log(updatedData);

            await returncar(updatedData).unwrap();
            message.success("Car returned successfully.");
            refetch();
        } catch (error) {
            message.error("Failed to return the car.");
        } finally {
            setLoading(false);
        }
    };

    // Define table columns
    const columns: ColumnsType<TBooking> = [
        {
            title: "User Email",
            dataIndex: ["user", "email"],
            key: "userEmail",
        },
        {
            title: "Car Name",
            dataIndex: ["car", "name"],
            key: "carName",
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
            render: (time: string | null) => {
                // Check if time is valid and format it
                const date = new Date(time || 0); // Fallback to epoch if null
                return isNaN(date.getTime())
                    ? "N/A"
                    : date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                      });
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => status.toUpperCase(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: TBooking) => (
                <div>
                    <Tooltip title="Return Car">
                        <Popconfirm
                            title="Are you sure you want to return this car?"
                            onConfirm={() => handleReturnCar(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                size="small"
                                disabled={record.status === "completed"}
                                loading={loading}
                            >
                                Return Car
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
            {" "}
            <h1 className="text-center from-amber-200 to-amber-50 bg-gradient-to-b  py-16 text-5xl font-normal uppercase rounded-xl">
                Manage Returns Car
            </h1>
            {/* Table for viewing and managing booked cars */}
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
            />
        </div>
    );
};

export default ManageReturnCars;
