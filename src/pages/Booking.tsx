import CustomSection from "@/components/CustomSection";
import image from "../assets/about.png";
import Custombooking from "./Custombooking";

const Booking = () => {
    return (
        <div>
            <CustomSection
                image={image}
                title="Home/Bookings"
                paragraph="Learn more about our company, our team, and our commitment to excellence."
            />
            <Custombooking />
        </div>
    );
};

export default Booking;
