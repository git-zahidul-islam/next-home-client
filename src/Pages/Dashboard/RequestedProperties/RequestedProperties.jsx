import { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const RequestedProperties = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();


    const { data: agentOfferList = [], refetch } = useQuery({
        queryKey: ['agentOfferList'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/agentOfferList/${user.email}`);
            setLoading(res.data);
            return res.data;
        }
    })

    if (!loading) {
        refetch();
        return <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">Loading...</h1>
        </div>
    }

    const handleAccept = async (id, propertyId) => {
        // Handle accept logic
        const reject = {
            status: 'rejected',
        }
        const resReject = await axiosSecure.put(`/rejectOffer/${propertyId}`, reject);
        console.log(resReject);
        const resAccept = await axiosSecure.put(`/acceptOffer/${id}`, { status: 'accepted' })
        console.log(resAccept);
        if (resAccept.data.modifiedCount) {
            swal({
                title: 'Accept',
                text: 'Offer Accepted',
                icon: 'success'
            });
            refetch();
        }
    };

    const handleReject = async (id) => {
        const resReject = await axiosSecure.put(`/rejectOneOffer/${id}`, { status: 'rejected' });
        console.log(resReject);
        if (resReject.data.modifiedCount) {
            swal({
                title: 'Reject',
                text: 'Offer Rejected',
                icon: 'success'
            });
            refetch();
        }
    };

    return (
        <div className="w-[95%] mx-auto mt-10">
            <h2 className="font-bold text-3xl text-center mb-5">Requested/Offered Properties</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Property Title</th>
                            <th className="py-3 px-6 text-left">Property Location</th>
                            <th className="py-3 px-6 text-left">Buyer Email</th>
                            <th className="py-3 px-6 text-left">Buyer Name</th>
                            <th className="py-3 px-6 text-left">Offered Price</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {agentOfferList.map(property => (
                            <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{property.propertyTitle}</td>
                                <td className="py-3 px-6 text-left">{property.propertyLocation}</td>
                                <td className="py-3 px-6 text-left">{property.buyerEmail}</td>
                                <td className="py-3 px-6 text-left">{property.buyerName}</td>
                                <td className="py-3 px-6 text-left">${property.offeredAmount}</td>
                                <td className="py-3 px-6 text-center">
                                    {property.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => handleAccept(property._id, property.propertyId)}
                                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(property._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-3 py-1 rounded ${property.status === 'accepted' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                            {property.status}
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

export default RequestedProperties;
