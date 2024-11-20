import Contact from "../Contact";
import About from "./About/About";
import Blog from "./Blog";
import Experience from "./Experience";
import Introduction from "./Introduction";
import Projects from "./Projects";
import Skills from "./Skills";

const Home = () => {
    return (
        <>
            <Introduction />
            <Skills />
            <Projects />
            <About />
            <Experience />
            <Blog />
            <Contact />
        </>
    );
};

export default Home;
