import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { StoreValue } from "rc-field-form/lib/interface";
import { useSignupMutation } from "@/redux/feature/authApi";
import { Rule } from "antd/es/form";

// Define the type for form fields
type FieldType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string; // Phone is optional
    terms: boolean;
};

const SignUp: React.FC = () => {
    const [userSignup] = useSignupMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        try {
            // Attempt to sign up the user
            await userSignup(values).unwrap(); // use unwrap to get the result directly
            message.success("Registration successful!");
            navigate("/login"); // Redirect to login page after success
        } catch (error: unknown) {
            // Handle error and show message
            if (error instanceof Error) {
                // Check if error is an instance of Error
                message.error(error.message); // Show the error message
            } else if (typeof error === "object" && error !== null) {
                // Check if error is an object and not null
                const { status, data } = error as {
                    status?: number;
                    data?: { message?: string };
                };
                if (status === 400 && data?.message) {
                    message.error(data.message); // Show the specific error message
                } else {
                    message.error("An unexpected error occurred."); // Generic error message
                }
            } else {
                message.error("An unexpected error occurred."); // Fallback for unknown error types
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
        message.error("Please correct the errors in the form.");
    };

    // Validate password length
    const validatePassword = (_: Rule, value: StoreValue) => {
        if (value && value.length < 6) {
            return Promise.reject(
                new Error("Password must be at least 6 characters long.")
            );
        }
        return Promise.resolve();
    };

    // Ensure passwords match
    const matchPasswords = ({
        getFieldValue,
    }: {
        getFieldValue: (name: string) => StoreValue;
    }) => ({
        validator(_: Rule, value: StoreValue) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match."));
        },
    });

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen bg-gray-100 mt-[133px] py-16">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-600">
                    Create Your Account
                </h2>
                <Form
                    name="signup"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email Address"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please input a valid email address!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email address" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            { validator: validatePassword },
                        ]}
                    >
                        <Input.Password placeholder="Enter a password" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            matchPasswords,
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>

                    <Form.Item<FieldType> label="Phone Number" name="phone">
                        <Input placeholder="Enter your phone number (optional)" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="terms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "You must accept the terms and conditions"
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            I agree to the{" "}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms & Conditions
                            </a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="w-full py-5 bg-black text-white font-semibold text-xl"
                            loading={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600">
                                Sign In Instead
                            </Link>
                        </p>
                    </div>
                </Form>

                <footer className="text-center mt-8">
                    <Link
                        to="/privacy-policy"
                        className="text-gray-500 hover:underline"
                    >
                        Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link to="/terms" className="text-gray-500 hover:underline">
                        Terms of Service
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default SignUp;
