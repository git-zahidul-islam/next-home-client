import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png"
import useAuth from "../../../hooks/useAuth";
import swal from "sweetalert";
import './NavBar.css';

const NavBar = () => {
    const { user, logOut} = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
        .then(() => {
            swal({
                icon: "success",
                title: "Logout Successful!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        })
        .catch(error => {
            swal({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        })
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li>
            <NavLink to="/allProperties">All Properties</NavLink>
        </li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        {
            user ?
                <>
                    <li className="flex flex-col lg:flex-row lg:gap-2 justify-center lg:items-center">
                        <li>{user.displayName}</li>
                        <button onClick={handleLogOut} className="btn btn-primary w-24 bg-orange-500 text-white font-bold">Logout</button>
                    </li>

                </>
                :
                <>
                    <li><Link to="/login" className="btn btn-primary w-24 bg-orange-500 text-white font-bold">Login</Link></li>
                </>
        }
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} id="navBarActive2" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="flex items-center gao-2">
                    <img src={logo} className="h-24 w-24"></img>
                    <h1 className="text-2xl md:text-4xl font-bold text-orange-500">NEXT<span className="text-black">HOME</span></h1>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex items-center">
                <ul id='navBarActive1' className="menu menu-horizontal px-1 flex items-center">
                    {
                        navLinks
                    }
                </ul>
            </div>
        </div>
    );
};

export default NavBar;