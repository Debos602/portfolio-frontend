import CustomSection from "@/components/CustomSection";
import image1 from "../../assets/about.png";
import { useGetCarByIdQuery } from "@/redux/feature/car/carManagement.api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Rate } from "antd";
import { useCreateBookingMutation } from "@/redux/feature/booking/bookingApi";
import { TCar } from "@/types/global";
import { toast } from "sonner";

// Define the keys for extras
type ExtraOption = "insurance" | "gps" | "childSeat";

const CarDetails = () => {
    const { id } = useParams();
    const { data: car, isLoading, error } = useGetCarByIdQuery(id);
    const [createBooking] = useCreateBookingMutation();
    const navigate = useNavigate();

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

    const handleBookNow = async (car: TCar) => {
        const startTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        console.log(startTime);
        const bookingData = {
            carId: car._id, // Use car ID
            date: new Date().toISOString(),
            startTime: startTime,
        };
        console.log(bookingData);
        try {
            await createBooking(bookingData).unwrap(); // Call the booking API
            toast.success("Booking created successfully"); // Redirect to the booking page
            navigate("/bookings", { replace: true });
        } catch (error) {
            console.error("Failed to create booking:", error);
        }
    };

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
                    <div className="border-2 border-gray-300 p-4 h-full  flex items-center justify-center rounded-xl">
                        <Zoom>
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </Zoom>
                    </div>

                    {/* Car Details */}
                    <div className="border-2 border-gray-300 p-4 from-amber-200 to-amber-50 bg-gradient-to-b rounded-xl">
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
                        <div>
                            <span className="font-semibold">Ratings: </span>
                            <Rate
                                className="text-yellow-900"
                                defaultValue={rating}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold">Features:</h3>
                            <ul className="list-disc list-inside">
                                {features.length > 0 ? (
                                    features.map(
                                        (feature: string, index: number) => (
                                            <li key={index}>{feature}</li>
                                        )
                                    )
                                ) : (
                                    <li>No additional features available.</li>
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

                        {/* Book Now Link */}
                        <div className="flex justify-between items-center">
                            <Link
                                onClick={(e) => {
                                    if (status === "unavailable") {
                                        e.preventDefault(); // Prevent the link from navigating if the car is unavailable
                                    } else {
                                        handleBookNow(car.data); // Prsoceed with booking if available
                                    }
                                }}
                                to={status === "available" ? `/bookings` : "#"} // Prevent link navigation when unavailable
                                className={`mt-6 inline-block text-white hover:bg-white border-2 border-black hover:text-black uppercase px-6 py-2 rounded-xl ${
                                    status === "unavailable"
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-black hover:bg-gray-800"
                                }`}
                            >
                                {status === "unavailable"
                                    ? "Unavailable"
                                    : "Book Now"}
                            </Link>
                            <Link
                                to="/bookings"
                                className="mt-6 rounded-xl bg-white hover:bg-black uppercase px-3 py-2 text-black hover:text-white border-2 border-black"
                            >
                                Cancel Booking
                            </Link>
                        </div>
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
