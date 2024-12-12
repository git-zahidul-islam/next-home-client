import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState(user);

    useEffect(() => {
        axiosPublic.get(`/users/${user.email}`)
            .then(res => {
                console.log(res);
                setUserInfo(res.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [setUserInfo])

    console.log(userInfo)

    return (
        <div className="flex flex-col items-center gap-5 border-2 p-10 rounded-xl">
            <div >
                <img className="rounded-full h-48 w-48 md:h-96 md:w-96 border-2 border-orange-500 shadow-2xl" src={userInfo.photoUrl} alt="" />
            </div>
            <div className="divider"></div>
            <div className="font-bold text-xl md:text-4xl">
                <p>Name : {userInfo.name}</p>
                {
                    userInfo.role !== "user" && <p>Role : {userInfo.role}</p>
                }
                <p>Email : {userInfo.email}</p>
            </div>
        </div>
    );
};

export default MyProfile;