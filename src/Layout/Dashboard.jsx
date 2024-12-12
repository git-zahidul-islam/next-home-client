import { FaHome, FaLocationArrow } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { RiFileListFill } from "react-icons/ri";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import '../Pages/Shared/NavBar/NavBar.css'
import { useEffect, useState } from "react";
import useAxiosPublic from './../hooks/useAxiosPublic';
import useAuth from "../hooks/useAuth";
import { IoAddCircle, IoPersonCircle } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

    // TODO : get isAdmin value from database
    const [userRole, setUserRole] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        axiosPublic.get(`/users/${user.email}`)
            .then(res => {
                console.log(res);
                setUserRole(res.data.role);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [])

    if(!userRole) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }


    return (
        <div>
            <Helmet>
                <title>NextHome | Dashboard</title>
            </Helmet>
            <NavBar></NavBar>
            <div id="dashboard" className="flex gap-2 md:gap-5 flex-col md:flex-row">
                {/* Dashboard Sidebar */}
                <div className="md:w-64 md:min-h-screen w-[80%] mx-auto ">
                    <ul className="menu w-full p-2 space-y-2">
                        {
                            userRole === "user" ?
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/myProfile"
                                            className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                        >
                                            <FaHome />
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/wishList"
                                            className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full">
                                            <ImSpoonKnife />
                                            WishList
                                        </NavLink>
                                    </li>
                                    <li >
                                        <NavLink to="/dashboard/propertyBought"
                                            className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                        >
                                            <HiOutlineClipboardDocumentList />
                                            Property bought
                                        </NavLink>
                                    </li>
                                    <li >
                                        <NavLink to="/dashboard/myReviews"
                                            className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                        >
                                            <RiFileListFill />
                                            My reviews
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    {
                                        userRole === "admin" ?
                                            <>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/myProfile"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        Admin Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/manageProperties"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        Manage Properties
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/manageUsers"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        Manage Users
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/manageReviews"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        Manage Reviews
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/advertiseProperty"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        Advertise Property
                                                    </NavLink>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/myProfile"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <IoPersonCircle />
                                                        Agent Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/addProperty"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <IoAddCircle />
                                                        Add Property
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/myAddedProperties"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaHome />
                                                        My added properties
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/mySoldProperties"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <MdSell/>
                                                        My sold properties
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/dashboard/requestedProperties"
                                                        className="border-2 border-orange-500 rounded-2xl hover:bg-orange-500 hover:text-white w-full"
                                                    >
                                                        <FaLocationArrow />
                                                        Requested properties
                                                    </NavLink>
                                                </li>
                                            </>
                                    }
                                </>
                        }

                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 p-2">
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;