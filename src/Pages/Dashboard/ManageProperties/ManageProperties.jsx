import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const ManageProperties = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties');
            return res.data;
        }
    })

    const handleVerify = async(propertyId) => {
        const updateProperty = {verificationStatus : 'verified'};
        const res = await axiosSecure.put(`/verifiedProperties/${propertyId}`, updateProperty);
        console.log(res);
        refetch();
    };
    

    const handleReject = async(propertyId) => {
        const updateProperty = {verificationStatus : 'rejected'};
        const res = await axiosSecure.put(`/verifiedProperties/${propertyId}`, updateProperty);
        console.log(res);
        refetch();
    };

        return (
            <div className="w-[95%] mx-auto mt-10">
                <h2 className="font-bold text-3xl text-center mb-5">Manage Properties</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Property Title</th>
                                <th className="py-3 px-6 text-left">Property Location</th>
                                <th className="py-3 px-6 text-left">Agent Name</th>
                                <th className="py-3 px-6 text-left">Agent Email</th>
                                <th className="py-3 px-6 text-left">Price Range</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {allProperties.map(property => (
                                <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{property.propertyTitle}</td>
                                    <td className="py-3 px-6 text-left">{property.propertyLocation}</td>
                                    <td className="py-3 px-6 text-left">{property.agentName}</td>
                                    <td className="py-3 px-6 text-left">{property.agentEmail}</td>
                                    <td className="py-3 px-6 text-left">${property.minPrice}-${property.maxPrice}</td>
                                    <td className="py-3 px-6 text-center">
                                        {property.verificationStatus === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleVerify(property._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    onClick={() => handleReject(property._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className={`px-3 py-1 rounded ${property.verificationStatus === 'verified' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                                {property.verificationStatus}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    export default ManageProperties;
