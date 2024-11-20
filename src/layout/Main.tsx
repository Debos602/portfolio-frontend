import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "@/pages/Home/Footer";

import Sider from "antd/es/layout/Sider";
import SideSection from "@/pages/SideSection";

const { Content } = Layout;

const Main = () => {
    const theme = localStorage.getItem("theme") || "light";
    return (
        <Layout className={theme}>
            <Layout>
                <Sider width="25%">
                    <SideSection></SideSection>
                </Sider>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default Main;
