import BookingSearch from "@/components/BookingSearch";
import Custombooking from "./Custombooking";

const Booking = () => {
    return (
        <div>
            {/* Pass correct props to CustomSection2 */}
            <BookingSearch />
            <Custombooking />
        </div>
    );
};

export default Booking;
