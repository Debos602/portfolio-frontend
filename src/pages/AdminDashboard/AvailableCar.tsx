import { useGetAvailableCarsQuery } from "@/redux/feature/car/carManagement.api";
import { Spin, Table, Typography, Button } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const AvailableCar = () => {
    const params = { status: "available" };
    const {
        data: cars,
        isLoading,
        isError,
        refetch,
    } = useGetAvailableCarsQuery(params);
    const carsArray = Array.isArray(cars?.data) ? cars.data : [];

    if (isLoading) {
        return <Spin size="large" />;
    }
    if (isError) {
        return <p>Failed to load cars.</p>;
    }

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <img
                    src={image}
                    alt="Car"
                    className="h-32 w-52 rounded-3xl border-2 hover:scale-105 transition-transform duration-300 object-cover"
                />
            ),
        },
        {
            title: "Name",
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
            render: (text: number) => `$${text}`,
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Is Electric",
            dataIndex: "isElectric",
            key: "isElectric",
            render: (text: boolean) => (text ? "Yes" : "No"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: "available" | "unavailable") => (
                <>
                    {status === "available" ? (
                        <span style={{ color: "green" }}>Available</span>
                    ) : (
                        <span style={{ color: "red" }}>
                            <EyeInvisibleOutlined style={{ marginRight: 5 }} />
                            Unavailable
                        </span>
                    )}
                </>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Available Cars</Title>
            <Button onClick={refetch} style={{ marginBottom: 16 }}>
                Refresh Data
            </Button>
            <Table dataSource={carsArray} columns={columns} rowKey="_id" />
        </div>
    );
};

export default AvailableCar;
