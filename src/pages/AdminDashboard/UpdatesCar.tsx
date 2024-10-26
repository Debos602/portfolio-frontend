import {
    useGetAllCarsQuery,
    useDeleteCarMutation,
    useUpdateCarMutation, // Assuming you have this mutation
} from "@/redux/feature/car/carManagement.api";
import { Button, Spin, Table, Modal, Form, Input, Upload } from "antd";
import { TCar } from "@/types/global";
import { useState } from "react";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";

const UpdatesCar = () => {
    const { data: cars, isLoading, refetch } = useGetAllCarsQuery(undefined);
    const [deleteCar] = useDeleteCarMutation();
    const [updateCar] = useUpdateCarMutation(); // Assuming you have this mutation
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [currentCar, setCurrentCar] = useState<TCar | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); // To store the image file

    const openUpdateModal = (car: TCar) => {
        setCurrentCar(car);
        form.setFieldsValue({ ...car }); // Set form fields with car details
        setIsModalOpen(true);
    };

    const handleDelete = async (carId: string) => {
        try {
            await deleteCar(carId).unwrap();
            toast.success("Car deleted successfully!");
            refetch();
        } catch (error) {
            toast.error("Failed to delete car: " + error);
        }
    };

    const handleImageChange = (file: File) => {
        setImageFile(file); // Set the selected image file
    };

    const handleUpdate = async (values: TCar) => {
        if (!currentCar) {
            toast.error("No car selected for update.");
            return;
        }

        const formData = new FormData();

        // Append the car data as a stringified object
        formData.append("car", JSON.stringify({ ...currentCar, ...values }));

        // If there's a new image file, append it to the form data
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            // Use the API call to send the formData
            await updateCar(formData).unwrap();
            toast.success("Car updated successfully!");
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            toast.error("Failed to update car: " + error);
        }
    };

    const columns = [
        {
            title: "Car Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Price Per Hour",
            dataIndex: "pricePerHour",
            key: "pricePerHour",
        },
        {
            title: "status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Electric",
            dataIndex: "isElectric",
            key: "isElectric",
            render: (text: boolean) => (text ? "Yes" : "No"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (car: TCar) => (
                <>
                    <Button
                        onClick={() => openUpdateModal(car)}
                        className="mr-2 bg-black text-white hover:bg-white hover:text-black transition-all duration-700"
                    >
                        Update
                    </Button>
                    <Button danger onClick={() => handleDelete(car._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    if (isLoading) {
        return <Spin size="large">Loading cars...</Spin>;
    }

    const carList = Array.isArray(cars?.data) ? cars?.data : [];

    return (
        <div className="flex items-center justify-center min-h-screen border-2 rounded-xl">
            <div className="container mx-auto p-10 rounded-2xl shadow-7xl">
                <h2 className="text-4xl font-extrabold text-center mb-8 uppercase">
                    Update and Delete Cars
                </h2>

                <Table
                    dataSource={carList}
                    columns={columns}
                    rowKey="_id"
                    className="mb-8"
                />

                <Modal
                    title="Update Car"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
                            <Input placeholder="Enter car name" />
                        </Form.Item>

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
                            <Input placeholder="Enter car color" />
                        </Form.Item>
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
                            <Input placeholder="Enter car location" />
                        </Form.Item>

                        <Form.Item label="Image" name="image">
                            <Upload
                                beforeUpload={(file) => {
                                    handleImageChange(file);
                                    return false; // Prevent automatic upload
                                }}
                                maxCount={1}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Car Image
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Price Per Hour"
                            name="pricePerHour"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter price per hour",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                placeholder="Enter price per hour"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            Update
                        </Button>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default UpdatesCar;
