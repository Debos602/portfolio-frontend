import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { useLoginMutation } from "@/redux/feature/authApi";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const [form] = Form.useForm(); // Ant Design form instance
    const [userLogin, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onFinish: FormProps<FieldType>["onFinish"] = async (data) => {
        try {
            const response = await userLogin(data).unwrap();
            const { data: user, token } = response;
            console.log("access token:", token);
            if (user && token) {
                dispatch(setUser({ user, token }));
                toast.success("Login Successful");

                const redirectPath =
                    location.state?.from?.pathname ||
                    (user.role === "admin" ? "/admin-dashboard" : "*");
                navigate(redirectPath, { replace: true });
            } else {
                toast.error("Invalid response from server.");
            }
        } catch (error) {
            toast.error("Login failed, please try again.");
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    const handleCredential = () => {
        const credentials = {
            email: "Rupash602@gmail.com",
            password: "rupash45",
        };
        form.setFieldsValue(credentials); // Set form values
    };

    return (
        <motion.div
            className="container mx-auto flex justify-center items-center min-h-screen"
            style={{ backgroundColor: "#D4EBF8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="shadow-lg rounded-lg p-8 w-full max-w-md"
                style={{
                    backgroundColor: "#EEEEEE",
                    color: "#3B1E54",
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <h2 className="text-3xl font-semibold text-center mb-6">
                    Login to Your Account
                </h2>
                <Form
                    form={form} // Bind form instance
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        label={<span style={{ color: "#3B1E54" }}>Email</span>}
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
                        <Input
                            placeholder="Enter your email"
                            style={{ borderColor: "#0A3981" }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={
                            <span style={{ color: "#3B1E54" }}>Password</span>
                        }
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            style={{ borderColor: "#0A3981" }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox style={{ color: "#3B1E54" }}>
                            Remember me
                        </Checkbox>
                    </Form.Item>

                    <div className="flex justify-between text-base mb-4">
                        <Link
                            to="/forgot-password"
                            style={{ color: "#3B1E54" }}
                        >
                            Forgot Password?
                        </Link>
                        <button
                            type="button"
                            onClick={handleCredential} // Call handleCredential on click
                            style={{
                                color: "#3B1E54",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Credential
                        </button>
                    </div>

                    <Form.Item>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                htmlType="submit"
                                className="w-full py-5 font-semibold text-xl"
                                style={{
                                    backgroundColor: "#3B1E54",
                                    color: "#FFFFFF",
                                }}
                                loading={isLoading}
                            >
                                Log in
                            </Button>
                        </motion.div>
                    </Form.Item>

                    <div className="text-center mt-4">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" style={{ color: "#3B1E54" }}>
                                Register here
                            </Link>
                        </p>
                    </div>
                </Form>

                <div className="text-center mt-6" style={{ color: "#3B1E54" }}>
                    <Link to="/privacy-policy">
                        Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link to="/terms-of-service">
                        Terms of Service
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
