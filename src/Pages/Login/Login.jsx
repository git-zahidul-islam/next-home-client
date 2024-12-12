import { Link, useLocation, useNavigate } from "react-router-dom";
import bgimage from "../../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn, setLoading, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then((result) => {
                console.log(result);
                swal({
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
            })
            .catch((error) => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
            })
    }

    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                updateUserProfile(result.user.displayName, result.user.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: result.user.displayName,
                            email: result.user.email,
                            photoUrl: result.user.photoURL,
                            role : "user",
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                swal({
                                    icon: "success",
                                    title: "Login Successful!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            })
                        navigate(location?.state ? location?.state : "/");
                    }).catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch(error => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
                console.log(error.message);
            })
    }


    return (
        <div className="min-h-screen justify-center py-12 sm:px-6 lg:px-8">
            <Helmet>
                <title>NextHome | Login</title>
            </Helmet>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">Login</h2>
            </div>
            <div className="flex flex-col-reverse md:flex-row mt-5 gap-5">
                <div className="flex-1 flex justify-center items-center bg-white">
                    <img className="w-full" src={bgimage} alt="" />
                </div>
                <div className="flex-1">
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input

                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                        <span className="absolute bottom-4 right-3 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ?
                                                    <FaEye></FaEye>
                                                    : <FaEyeSlash></FaEyeSlash>
                                            }
                                        </span>
                                    </label>
                                    <div className="mt-1">
                                        <input

                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Your Password"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-3">
                                    <button
                                        onClick={handleGoogle}
                                        type="button"
                                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Login With Google
                                    </button>
                                </div>
                                <div className="text-center p-5">
                                    Do not have an account? <span><Link to="/signUp">Sign Up here</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;