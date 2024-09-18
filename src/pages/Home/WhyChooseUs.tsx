import {
    CarFilled,
    CustomerServiceOutlined,
    WeiboCircleFilled,
} from "@ant-design/icons";

const WhyChooseUs = () => {
    return (
        <section className="container mx-auto bg-gray-900 py-12  text-center">
            <h2 className="text-2xl font-medium text-amber-600 mb-8">
                Why Choose Us?
            </h2>
            <p className="text-4xl font-semibold text-white mb-8">
                Time Quick and Easy to Transportation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
                <div className="p-6 shadow-lg rounded-lg text-white hover:text-black hover:bg-orange-500 border transition-colors duration-300 ">
                    <CarFilled className="text-5xl text-white-600 mx-auto mb-4 hover:text-gray-900" />
                    <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                    <p>
                        We offer unbeatable prices on all our cars, ensuring you
                        get the best value for your money.
                    </p>
                </div>
                <div className="p-6 shadow-lg rounded-lg text-white hover:text-black hover:bg-orange-500 border transition-colors duration-300 ">
                    <WeiboCircleFilled className="text-5xl text-white-600 mx-auto mb-4 hover:text-gray-900" />
                    <h3 className="text-xl font-semibold mb-2">
                        Wide Selection
                    </h3>
                    <p>
                        Choose from a diverse range of cars that suit every
                        occasion and budget.
                    </p>
                </div>
                <div className="p-6 shadow-lg rounded-lg text-white hover:text-black hover:bg-orange-500 border transition-colors duration-300 ">
                    <CustomerServiceOutlined className="text-5xl text-white-600 mx-auto mb-4 hover:text-gray-900" />
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p>
                        Our customer service team is available round the clock
                        to assist you whenever you need help.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
