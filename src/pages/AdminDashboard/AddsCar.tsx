import {
    Button,
    Input,
    Form,
    Select,
    Checkbox,
    InputNumber,
    Upload,
} from "antd";
import { useState } from "react";
import { TCar } from "@/types/global";
import { useCreateCarMutation } from "@/redux/feature/car/carManagement.api";
import { toast } from "sonner";

const { TextArea } = Input;

const AddsCar = () => {
    const [form] = Form.useForm();
    const [isElectric, setIsElectric] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const [createCar] = useCreateCarMutation();

    const handleSubmit = async (values: TCar) => {
        const data = {
            ...values,
            isElectric,
        };

        const formData = new FormData();
        formData.append("car", JSON.stringify(data)); // Key adjusted to match backend
        if (file) {
            formData.append("image", file);
        }

        try {
            await createCar(formData).unwrap();
            toast.success("Car added successfully");
            form.resetFields();
            setFile(null); // Reset file after successful submission
        } catch (error) {
            console.error("Error adding car:", error);
            toast.error("Failed to add car: " + error || "Unknown error");
        }
    };

    const handleFileChange = (file: File) => {
        setFile(file); // Store the file object
    };

    return (
        <div className="flex items-center justify-center min-h-screen border-2 rounded-xl">
            <div className="container mx-auto  p-10 rounded-2xl shadow-7xl ">
                <h2 className="text-4xl font-extrabold text-center mb-8">
                    Add a New Cars
                </h2>
                <div className="flex justify-center">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="w-3/4 border-2 p-8 rounded-xl text-white"
                    >
                        {/* Car Name */}
                        <Form.Item
                            label="Car Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter car name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter car name"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Color */}
                        <Form.Item
                            label="Color"
                            name="color"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter car color",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter car color"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Features */}
                        <Form.Item
                            label="Features"
                            name="features"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter car features",
                                },
                            ]}
                        >
                            <Select
                                mode="tags"
                                placeholder="Enter car features (e.g., Bluetooth, GPS)"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Is Electric */}
                        <Form.Item name="isElectric" valuePropName="checked">
                            <Checkbox
                                onChange={(e) =>
                                    setIsElectric(e.target.checked)
                                }
                                className="text-gray-700 w-full"
                            >
                                Electric Car
                            </Checkbox>
                        </Form.Item>

                        {/* Price Per Hour */}
                        <Form.Item
                            label="Price Per Hour ($)"
                            name="pricePerHour"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter price per hour",
                                },
                            ]}
                        >
                            <InputNumber
                                min={1}
                                placeholder="Enter price per hour"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Location */}
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter car location",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter car location"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Image */}
                        <Form.Item
                            label="Car Image"
                            rules={[
                                {
                                    required: true,
                                    message: "Please upload a car image",
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={(file) => {
                                    handleFileChange(file);
                                    return false; // Prevent automatic upload
                                }}
                                showUploadList={false}
                            >
                                <Button className="rounded-xl bg-gray-200 hover:bg-gray-300 transition duration-200">
                                    Upload Car Image
                                </Button>
                            </Upload>
                        </Form.Item>

                        {/* Description */}
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter a description",
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Enter car description"
                                className="rounded-xl border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item className="flex justify-center mt-6">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-opacity-10 bg-gradient-to-r from-black via-amber-500 to-black rounded-xl uppercase text-center text-white font-bold px-12 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Add Car
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddsCar;
