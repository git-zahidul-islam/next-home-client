import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Stat = () => {
    const axiosPublic = useAxiosPublic();
    const [numberOfUser, setNumberOfUser] = useState(0);
    const [numberOfAgent, setNumberOfAgent] = useState(0);

    const { data: allProperties = [] } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties');
            return res.data;
        }
    })

    const { data: allUsers = [] } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    console.log(allUsers)

    useEffect(() => {
        let user = 0, agent = 0;
        for (const prop of allUsers) {
            if (prop.role === 'user') {
                user++;
            } else if (prop.role === 'agent') {
                agent++;
            }
        }
        setNumberOfUser(user);
        setNumberOfAgent(agent);
    }, [allUsers])



    return (
        <div className="container mx-auto mt-10 space-y-5">
            <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-primary">Statistics</h1>
                <p>
                    Welcome to the Statistics section! Here, you can find up-to-date information on the vital statistics of our real estate platform. Whether you're an agent looking to gauge market activity, a user interested in the platform's growth, or an admin monitoring engagement, these statistics offer valuable insights. We display the total number of registered agents, active users, and available properties to provide a clear picture of our community's dynamics.
                </p>
            </div>
            <div className="stats shadow w-full">
                <div className="stat place-items-center">
                    <div className="stat-title">Number of Users</div>
                    <div className="stat-value">{numberOfUser}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Number of Agents</div>
                    <div className="stat-value text-secondary">{numberOfAgent}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Number of Properties</div>
                    <div className="stat-value">{allProperties.length}</div>
                </div>

            </div>
        </div>
    );
};

export default Stat;