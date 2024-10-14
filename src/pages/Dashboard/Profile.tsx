import { Avatar, Card, Button, Form, Input, Spin, Table } from "antd";
import { Bookings, TOrder, TUser } from "@/types/global";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/redux/feature/authApi";
import { toast } from "sonner";
import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import { Link } from "react-router-dom";
import { useCreateOrderMutation } from "@/redux/feature/order/orderApi";

// Define the type for a single booking

const Profile = () => {
    // Fetch user data using RTK Query
    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    // Mutation for updating profile
    const [updateProfile] = useUpdateUserMutation();
    const { data: bookings } = useGetBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    // console.log("Bookings:", bookings);

    const [createOrder] = useCreateOrderMutation();

    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    // Handle error state
    if (isError || !user?.data) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Error loading user data</p>
            </div>
        );
    }

    const { name, email, phone, role } = user.data as TUser;

    // Type the booking history based on the defined `Booking` interface
    const bookingHistory = bookings?.data?.map((booking: Bookings) => ({
        carName: booking?.car?.name,
        date: booking?.date,
        startTime: booking?.startTime,
        endTime: booking?.endTime,
        totalCost: booking?.totalCost,
        transactionId: booking?.transactionId,
    }));

    // Calculate total cost of all bookings
    const totalCost = bookingHistory?.reduce(
        (acc: number, booking: { totalCost: number }) =>
            acc + booking.totalCost,
        0
    );

    const handleUpdateProfile = async (values: TUser) => {
        try {
            await updateProfile(values).unwrap();
            toast.success("Profile updated successfully");
            refetch();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
    };

    const handleCreateOrder = () => {
        const bookingHistory = bookings?.data?.map((booking: Bookings) => ({
            carName: booking?.car?.name,
            date: booking?.date,
            startTime: booking?.startTime,
            endTime: booking?.endTime,
            totalCost: booking?.totalCost,
            transactionId: booking?.transactionId,
            name: booking?.user?.name, // Add user details
            email: booking?.user?.email,
            phone: booking?.user?.phone,
        }));

        Promise.all(
            bookingHistory.map(async (booking: TOrder) => {
                try {
                    const response = await createOrder(booking);
                    console.log("Order created response:", response);
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
            {/* Profile Banner */}
            <Card className="mb-8 text-center">
                <Avatar
                    size={120}
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                />
                <h1 className="text-3xl font-bold mt-4">{name}</h1>
                <p className="text-md text-gray-500">{role}</p>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Personal Information:
                    </h2>
                    <p>
                        <strong>Name:</strong> {name}
                    </p>
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {phone || "N/A"}
                    </p>
                </div>
            </Card>

            {/* Booking History */}
            <div className="grid grid-cols-1 gap-8">
                <Card className="w-2/3 mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        User Information
                    </h2>
                    <Form layout="horizontal" onFinish={handleUpdateProfile}>
                        <Form.Item label="Name" name="name" initialValue={name}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={email}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            initialValue={phone}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button
                                className="bg-gray-700 text-white w-full"
                                htmlType="submit"
                            >
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
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

                {/* Update Profile */}
            </div>
        </div>
    );
};

export default Profile;
