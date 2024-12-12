import swal from 'sweetalert';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../../hooks/useAxiosSecure';


const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = async(userId) => {
        const updateUser = { role: 'admin' };
        const res = await axiosSecure.put(`/userRole/${userId}`, updateUser);
        console.log(res);
        refetch();
    };

    const handleMakeAgent = async(userRole,userId) => {
        if(userRole === 'admin'){
            swal({
                title: 'Agent',
                icon: 'error',
                text: 'You can not make an admin to an agent'
            });
            return;
        }
        const updateUser = { role: 'agent' };
        const res = await axiosSecure.put(`/userRole/${userId}`, updateUser);
        console.log(res);
        refetch();
    };

    const handleMarkAsFraud = async(userId) => {
        const updateUser = { role: 'fraud' };
        const res = await axiosSecure.put(`/userRole/${userId}`, updateUser);
        console.log(res);
        refetch();

    };

    // TODO: delete user and update their properties
    const handleDeleteUser = async(userRole,userId) => {
        if(userRole === 'admin'){
            swal({
                title: 'Admin',
                icon: 'error',
                text: 'You can not delete an admin'
            });
            return;
        }
        const res = await axiosSecure.delete(`/deleteUser/${userId}`);
        // console.log(res.data);
        if(res.data.deletedCount){
            swal({
                title: 'User Deleted',
                text: 'User has been deleted successfully',
                icon:'success'
            });
            refetch();
        }
    };

    return (
        <div className="w-[95%] mx-auto mt-10">
            <h2 className="font-bold text-3xl text-center mb-5">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">User Name</th>
                            <th className="py-3 px-6 text-left">User Email</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{user.name}</td>
                                <td className="py-3 px-6 text-left">{user.email}</td>
                                <td className="py-3 px-6 text-center space-x-2">
                                    {user.role !== 'fraud' && (
                                        <>
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                            {user.role !== 'agent' && (
                                                <button
                                                    onClick={() => handleMakeAgent(user.role,user._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                >
                                                    Make Agent
                                                </button>
                                            )}
                                            {user.role === 'agent' && (
                                                <button
                                                    onClick={() => handleMarkAsFraud(user._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Mark as Fraud
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {user.role === 'fraud' && (
                                        <span className="bg-red-500 text-white px-3 py-1 rounded">
                                            Fraud
                                        </span>
                                    )}
                                    <button
                                        onClick={() => handleDeleteUser(user.role,user._id)}
                                        className="bg-gray-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete User
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
