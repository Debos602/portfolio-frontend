import { Form, Input, Checkbox, Button, Spin, message } from "antd";
import { useGetBookingsQuery } from "@/redux/feature/booking/bookingApi";
import { Bookings, TOrder } from "@/types/global";
import {
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/redux/feature/authApi";

const BookingForm = () => {
    const { data: booking, isLoading: isBookingLoading } = useGetBookingsQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const { data: user, isLoading: isUserLoading } = useGetUserQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
        }
    );

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation(); // Added loading state here

    // Ensure booking and booking.data are defined
    const bookingHistory =
        booking?.data?.map((booking: Bookings) => ({
            carName: booking?.car?.name,
            startTime: booking?.startTime,
            endTime: booking?.endTime,
            totalCost: booking?.totalCost,
            date: booking?.date,
        })) || [];

    // Extract data safely
    const { carName, startTime, endTime, totalCost, date } =
        bookingHistory[0] || {};

    const [form] = Form.useForm();

    const onFinish = async (values: TOrder) => {
        console.log(values);
        try {
            const updatedData = {
                ...values,
                // You might want to keep other fields unchanged
            };
            await updateUser(updatedData); // Use your Redux update mutation
            message.success("User data updated successfully!");
        } catch (error) {
            message.error("Failed to update booking.");
        }
    };

    // Confirm booking handler

    const { name, email, phone } = user?.data || {};

    // Loading spinner
    if (isUserLoading || isBookingLoading || isUpdating) {
        return <Spin size="large" />;
    }

    // Check if user or booking data is missing
    if (!user) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        name: name || "",
                        email: email || "",
                        phone: phone || "",
                        nid: "",
                        drivingLicense: "",
                        features: [],
                    }}
                    className="bg-white p-8 shadow-md rounded-lg col-span-2"
                >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">
                        User Information
                    </h3>

                    {/* Full Name */}
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your full name",
                            },
                        ]}
                    >
                        <Input placeholder="Full Name" />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                        ]}
                    >
                        <Input placeholder="Email" type="email" />
                    </Form.Item>

                    {/* Phone */}
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number",
                            },
                        ]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>

                    {/* NID/Passport */}
                    <Form.Item
                        label="NID/Passport Number"
                        name="nid"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your NID/Passport number",
                            },
                        ]}
                    >
                        <Input placeholder="NID/Passport Number" />
                    </Form.Item>

                    {/* Driving License */}
                    <Form.Item
                        label="Driving License"
                        name="drivingLicense"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your driving license",
                            },
                        ]}
                    >
                        <Input placeholder="Driving License" />
                    </Form.Item>

                    {/* Features */}
                    <Form.Item
                        label="Select Additional Features"
                        name="features"
                    >
                        <Checkbox.Group>
                            <Checkbox value="GPS">GPS</Checkbox>
                            <Checkbox value="Child Seat">Child Seat</Checkbox>
                            <Checkbox value="Insurance">Insurance</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            block
                            loading={isUpdating} // This is now defined
                            className="uppercase bg-black text-white hover:bg-white hover:text-black transition-all duration-700"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                {/* Confirmation Section */}
                <div className="bg-amber-100 p-8 shadow-md rounded-lg">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                        Booking Confirmed!
                    </h3>
                    <p className="text-lg text-gray-700 mb-2">
                        You have successfully booked {carName} for your trip.
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                        Pick-up Date:{" "}
                        <span className="font-normal">{startTime}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                        Pick-up Date:{" "}
                        <span className="font-normal">{date}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                        Drop-off Date:{" "}
                        <span className="font-normal">{endTime}</span>
                    </p>
                    <p className="text-lg font-semibold text-green-800">
                        Total Cost: ${" "}
                        <span className="font-normal">{totalCost}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
