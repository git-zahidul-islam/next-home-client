import axios from "axios";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://next-home-server.vercel.app',
})

const useAxiosSecure = () => {
    // const navigate = useNavigate();
    // const { logOut } = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-token");
        console.log("interceptors", token);
        config.headers.authorization = token
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            // await logOut();
            // navigate("/login");
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
