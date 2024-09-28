import CustomSection from "@/components/CustomSection";
import image1 from "../../assets/about.png";
import { useGetCarByIdQuery } from "@/redux/feature/car/carManagement.api";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Rate } from "antd";

// Define the keys for extras
type ExtraOption = "insurance" | "gps" | "childSeat";

const CarDetails = () => {
    const { id } = useParams();
    const { data: car, isLoading, error } = useGetCarByIdQuery(id);

    // Define the state with exact types for extras
    const [selectedExtras, setSelectedExtras] = useState<{
        insurance: boolean;
        gps: boolean;
        childSeat: boolean;
    }>({
        insurance: false,
        gps: false,
        childSeat: false,
    });

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading car details...</div>;
    }

    if (error || !car) {
        return <div>Failed to load car details</div>;
    }

    const {
        image,
        name,
        description,
        pricePerHour,
        features = [],
        status = "Available",
        rating,
    } = car.data;

    // Use the ExtraOption type to restrict valid keys
    const handleExtraChange = (extra: ExtraOption) => {
        setSelectedExtras((prev) => ({
            ...prev,
            [extra]: !prev[extra],
        }));
    };

    return (
        <div>
            <CustomSection
                image={image1}
                title="Car Details"
                paragraph="Learn more about our company, our team, and our commitment to excellence."
            />
            <div className="container mx-auto py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Car Image */}
                    <div className="border-2 border-gray-300 p-4">
                        <Zoom>
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </Zoom>
                    </div>

                    {/* Car Details */}
                    <div className="border-2 border-gray-300 p-4">
                        <h2 className="text-2xl font-bold">{name}</h2>
                        <p className="text-lg mt-2">{description}</p>
                        <p className="mt-4">
                            <span className="font-semibold">
                                Price per Hour:
                            </span>{" "}
                            ${pricePerHour}
                        </p>
                        <p className="mt-2">
                            <span className="font-semibold">Status:</span>{" "}
                            {status}
                        </p>
                        <p>
                            Ratings:{" "}
                            <Rate
                                className="text-yellow-900"
                                defaultValue={rating}
                            />
                        </p>
                        <div className="mt-4">
                            <h3 className="font-semibold">Features:</h3>
                            <ul className="list-disc list-inside">
                                {features.length > 0 ? (
                                    features.map(
                                        (feature: string, index: number) => (
                                            <li key={index}>{feature}</li>
                                        )
                                    )
                                ) : (
                                    <p>No additional features available.</p>
                                )}
                            </ul>
                        </div>

                        {/* Extras selection */}
                        <div className="mt-6">
                            <h3 className="font-semibold">Choose Extras:</h3>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedExtras.insurance}
                                        onChange={() =>
                                            handleExtraChange("insurance")
                                        }
                                    />
                                    Insurance
                                </label>
                                <label className="ml-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedExtras.gps}
                                        onChange={() =>
                                            handleExtraChange("gps")
                                        }
                                    />
                                    GPS
                                </label>
                                <label className="ml-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedExtras.childSeat}
                                        onChange={() =>
                                            handleExtraChange("childSeat")
                                        }
                                    />
                                    Child Seat
                                </label>
                            </div>
                        </div>

                        <Link
                            to={`/bookings/${car.data._id}`} // Ensure this route leads to your booking page
                            className="mt-6 inline-block bg-black text-white px-6 py-2 hover:bg-gray-800 rounded-xl"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
