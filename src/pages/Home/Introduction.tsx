const Introduction = () => {
    return (
        <div
            style={{
                backgroundColor: "#9B7EBD",
                color: "#EEEEEE",
                padding: "2rem",
                textAlign: "start",
                fontFamily: "Arial, sans-serif",
            }}
            className="h-screen"
        >
            <h1
                style={{
                    color: "#3B1E54",
                }}
                className="text-7xl font-bold"
            >
                Hi,
            </h1>
            <h2
                style={{
                    color: "#3B1E54",
                }}
                className="text-7xl font-bold"
            >
                I'm Debos Das
            </h2>
            <p
                className="text-5xl font-extralight"
                style={{
                    color: "#3B1E54",
                }}
            >
                A Web Developer,
                <br />
                Frontend Developer / React Developer / backend developer
            </p>
            <button className="mt-5 border-2 border-[#3B1E54] uppercase rounded px-6 py-3 text-lg font-medium bg-[#3B1E54] text-[#EEEEEE] shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#D4BEE4] hover:text-[#3B1E54] focus:outline-none">
                Contact Me
            </button>
        </div>
    );
};

export default Introduction;
