import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
            <Header />
            <main className="container my-4">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;