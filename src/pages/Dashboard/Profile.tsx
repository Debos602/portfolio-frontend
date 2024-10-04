import { Avatar, Card, List, Button, Form, Input, Spin } from "antd";
import { Bookings, TUser } from "@/types/global";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/redux/feature/authApi";
import { toast } from "sonner";
import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";

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
    }));

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

    return (
        <div>
            {/* Profile Banner */}
            <Card className="mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="mb-8">
                    <h2 className="text-xl font-semibold">Booking History</h2>
                    <List
                        dataSource={bookingHistory}
                        renderItem={(item: {
                            carName: string;
                            date: string;
                            startTime: string;
                            endTime: string | null;
                            totalCost: number;
                        }) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item?.carName}
                                    description={`Date: ${
                                        item?.date
                                    }, Start Time: ${
                                        item?.startTime
                                    }, End Time: ${
                                        item?.endTime || "Ongoing"
                                    }, Total Cost: $${item.totalCost}`}
                                />
                            </List.Item>
                        )}
                    />
                </Card>

                {/* Update Profile */}
                <Card>
                    <h2 className="text-xl font-semibold mb-4">
                        Update Profile
                    </h2>
                    <Form layout="vertical" onFinish={handleUpdateProfile}>
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
