import { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const PropertyBought = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const { user } = useAuth();


    const { data: offerList = [], refetch } = useQuery({
        queryKey: ['offerLis'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/offerList/${user.email}`);
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



    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Properties Bought</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerList.map((property) => (
                    <div key={property._id} className="bg-white shadow-md rounded p-4">
                        <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-full h-48 object-cover rounded mb-4" />
                        <h3 className="text-lg font-semibold">{property.propertyTitle}</h3>
                        <p className="text-gray-600">{property.propertyLocation}</p>
                        <p className="text-gray-600 mt-2">Agent: {property.agentName}</p>
                        <p className="text-gray-600 mt-2">Offered Amount: ${property.offeredAmount}</p>
                        <p className="text-gray-600 mt-2">Status: {property.status}</p>
                        {property.status === 'accepted' && (
                            <Link to={`/dashboard/payment/${property._id}`}>
                                <button
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Pay
                                </button>
                            </Link>
                        )}
                        {property.status === 'bought' && (
                            <p className="mt-4 text-green-600">Transaction ID: {property.transactionId}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyBought;
