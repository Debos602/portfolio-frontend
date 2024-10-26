import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "@/redux/feature/authApi";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

type FieldType = {
    email: string;
};

const ForgetPassword: React.FC = () => {
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    const onFinish = async (data: FieldType) => {
        try {
            const response = await forgetPassword({
                email: data.email,
            }).unwrap();
            if (response?.success) {
                toast.success(
                    "Password reset link has been sent to your email."
                );
            } else {
                toast.error("Failed to send password reset link.");
            }
        } catch (error) {
            toast.error("Something went wrong, please try again.");
        }
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity<FieldType>) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-black">
                    Forgot Password
                </h2>
                <p className="text-center mb-4 text-gray-600">
                    Enter your email and we will send you a password reset link.
                </p>
                <Form
                    name="forgot-password"
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
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full py-5 bg-black text-white font-semibold text-xl"
                            loading={isLoading}
                        >
                            Send Reset Link
                        </Button>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <p>
                            Remembered your password?{" "}
                            <Link to="/login" className="text-blue-600">
                                Login here
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;
