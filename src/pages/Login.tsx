import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { useLoginMutation } from "@/redux/feature/authApi";
import { useAppDispatch } from "@/redux/hook"; // Import the dispatch hook
import { setUser } from "@/redux/feature/authSlice"; // Import setUser action
import { toast } from "sonner";

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const [userLogin, { isLoading }] = useLoginMutation(); // Handle loading state
    const dispatch = useAppDispatch(); // Initialize dispatch
    const navigate = useNavigate();
    const { state } = useLocation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (data) => {
        console.log("Form Data:", data); // Debugging form data

        try {
            // Unwrapping the API response to handle success/failure
            const response = await userLogin(data).unwrap();

            console.log("API Response:", response); // Log the entire response for debugging

            // Extract user and token from the response
            const { data: user, token } = response;

            // Check if user and token exist in the response
            if (user && token) {
                // Dispatch to update the Redux state
                dispatch(setUser({ user, token }));

                // Display a success message
                toast.success("Login Successful");

                // Redirect to the desired page
                navigate(state?.pathname || "/dashboard");
            } else {
                // If the structure is unexpected, log the response and show an error
                console.error("Unexpected response structure:", response);
                toast.error("Invalid response from server.");
            }
        } catch (error) {
            // Handle login failure and show error message
            console.error("Login error:", error);
            toast.error("Login failed, please try again.");
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100 mt-[133px]">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-black">
                    Login to Your Account
                </h2>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full py-5 bg-black text-white font-semibold text-xl"
                            loading={isLoading} // Disable button when loading
                        >
                            Log in
                        </Button>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600">
                                Register here
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
