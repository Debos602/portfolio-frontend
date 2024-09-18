import { Layout } from "antd";

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "@/pages/Home/Footer";

const { Content } = Layout;

const Main = () => {
    return (
        <Layout>
            <Header />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
};

export default Main;
