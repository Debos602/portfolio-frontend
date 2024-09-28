import { useState, useEffect } from "react";
import { useGetAllCarsQuery } from "@/redux/feature/car/carManagement.api";
import { TCar } from "@/types/global";
import { Table, TableColumnsType, Select, Button, Form, Input } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

// Define the type for the form values
interface IFilterValues {
    carName?: string;
    color?: string;
    pricePerHour?: [number, number]; // Array to hold the price range
    location?: string;
    pickUpDate?: Dayjs;
    returnDate?: Dayjs;
}

const CarList = () => {
    const { data: cars, isFetching } = useGetAllCarsQuery(undefined);
    const [filteredCars, setFilteredCars] = useState<TCar[] | undefined>(
        cars?.data
    );
    const [form] = Form.useForm();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (cars?.data) {
            const location = searchParams.get("location");
            const pickUpDate = searchParams.get("pickUpDate");
            const returnDate = searchParams.get("returnDate");

            // Apply location and date filters from query parameters
            const filteredData = cars.data.filter((car: TCar) => {
                const carLocation = car.location ?? ""; // Handle undefined location

                const matchesLocation = location
                    ? carLocation.toLowerCase().includes(location.toLowerCase())
                    : true;
                const matchesPickUpDate = pickUpDate
                    ? dayjs(car.availableFrom).isBefore(dayjs(pickUpDate))
                    : true;
                const matchesReturnDate = returnDate
                    ? dayjs(car.availableUntil).isAfter(dayjs(returnDate))
                    : true;

                return (
                    matchesLocation && matchesPickUpDate && matchesReturnDate
                );
            });

            setFilteredCars(filteredData);
        }
    }, [cars, searchParams]);

    // Handle filtering logic
    const handleFilter = (values: IFilterValues) => {
        const {
            carName,
            color,
            pricePerHour,
            location,
            pickUpDate,
            returnDate,
        } = values;

        const filteredData = cars?.data.filter((car: TCar) => {
            const matchesName = carName
                ? car.name.toLowerCase().includes(carName.toLowerCase())
                : true;
            const matchesColor = color ? car?.color === color : true;
            const matchesPrice = pricePerHour
                ? car.pricePerHour >= pricePerHour[0] &&
                  car.pricePerHour <= pricePerHour[1]
                : true;
            const matchesLocation = location
                ? car.location?.toLowerCase().includes(location.toLowerCase())
                : true;
            const matchesPickUpDate = pickUpDate
                ? dayjs(car.availableFrom).isBefore(pickUpDate)
                : true;
            const matchesReturnDate = returnDate
                ? dayjs(car.availableUntil).isAfter(returnDate)
                : true;

            return (
                matchesName &&
                matchesColor &&
                matchesPrice &&
                matchesLocation &&
                matchesPickUpDate &&
                matchesReturnDate
            );
        });

        setFilteredCars(filteredData);
    };

    // Reset filters and show all cars
    const handleClearFilters = () => {
        form.resetFields(); // Reset the form fields
        setFilteredCars(cars?.data); // Reset the filtered data to show all cars
    };

    const tableData = filteredCars?.map(
        ({ _id, name, image, pricePerHour, description }) => ({
            key: _id,
            name: name,
            image: image,
            pricePerHour: pricePerHour,
            description: description,
        })
    );

    const columns: TableColumnsType<{
        key: string;
        name: string;
        image: string;
        pricePerHour: number;
        description: string;
    }> = [
        {
            title: "Image",
            key: "image",
            dataIndex: "image",
            render: (image) => (
                <img
                    src={image}
                    alt={image}
                    className="h-32 w-52 rounded-3xl border-2 hover:scale-105 transition-transform duration-300 object-cover"
                />
            ),
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            render: (name) => <p className="font-semibold">{name}</p>,
        },
        {
            title: "Price Per Hour",
            key: "pricePerHour",
            dataIndex: "pricePerHour",
            render: (pricePerHour) => (
                <p className="font-semibold">${pricePerHour}</p>
            ),
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
            render: (description: string) => (
                <p>
                    {description.slice(0, 40)}
                    {description.length > 50 ? "..." : ""}
                </p>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (
                text,
                record // Use record to access car properties
            ) => (
                <Link
                    to={`/car-details/${record.key}`} // Change 'key' to '_id' if needed
                    className="bg-black px-2 py-2 rounded-xl text-white border-2 border-black hover:bg-white hover:text-black"
                >
                    View Details
                </Link>
            ),
        },
    ];

    return (
        <div className="bg-gray-200">
            <div className="container mx-auto py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <Form
                        form={form}
                        onFinish={handleFilter}
                        layout="vertical"
                        className="mb-5"
                    >
                        {/* Search Bar Inputs */}
                        <Form.Item name="location" label="Location">
                            <Input placeholder="Enter location" />
                        </Form.Item>

                        {/* Other Filters */}
                        <Form.Item name="carName" label="Car Name">
                            <Select placeholder="Select car name" allowClear>
                                {cars?.data.map((car: TCar) => (
                                    <Select.Option
                                        key={car._id}
                                        value={car.name}
                                    >
                                        {car.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="color" label="Color">
                            <Select placeholder="Select color" allowClear>
                                {Array.from(
                                    new Set(
                                        cars?.data.map((car: TCar) => car.color)
                                    )
                                ).map((color) => (
                                    <Select.Option
                                        key={String(color)}
                                        value={color}
                                    >
                                        {String(color)}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Price Range */}
                        <Form.Item name="pricePerHour" label="Price Range">
                            <Input.Group compact>
                                <Form.Item name={["pricePerHour", 0]} noStyle>
                                    <Input
                                        placeholder="Min"
                                        min={0}
                                        className="mr-2"
                                    />
                                </Form.Item>
                                <Form.Item name={["pricePerHour", 1]} noStyle>
                                    <Input placeholder="Max" min={0} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <div className="md:flex  items-center">
                            <Button
                                htmlType="submit"
                                className="bg-black text-white border-2 border-black hover:bg-white hover:text-black mr-2"
                            >
                                Apply Filters
                            </Button>
                            <Button
                                onClick={handleClearFilters}
                                className="bg-black text-white border-2 border-black hover:bg-white hover:text-black"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </Form>
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        loading={isFetching}
                        className="col-span-4 "
                    />
                </div>
            </div>
        </div>
    );
};

export default CarList;
