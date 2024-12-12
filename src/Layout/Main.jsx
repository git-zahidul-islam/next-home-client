import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import useAuth from "../hooks/useAuth";

const Main = () => {
    const { loading } = useAuth();
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;