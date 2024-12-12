import { useState } from 'react';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const AdvertiseProperty = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(null);

    const { data: verifiedProperties = [], refetch } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/verifiedProperties');
            setLoading(res.data);
            return res.data;
        }
    })

    if (!loading) {
        return <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-red-500">Loading...</h1>
        </div>
    }

    const handleAdvertise = (propertyID) => {
        const  property = {
            isAdvertised : true,
        }
        axiosSecure.put(`/advertise/${propertyID}`, property)
            .then(response => {
                console.log(response);
                swal({
                    icon: "success",
                    title: "Advertise Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error advertising property:', error);
                swal({
                    icon: "success",
                    title: "Already Advertised!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            refetch();
    };

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="font-bold text-3xl text-center mb-5">Advertise Property</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Property Image</th>
                            <th className="py-3 px-6 text-left">Property Title</th>
                            <th className="py-3 px-6 text-left">Price Range</th>
                            <th className="py-3 px-6 text-left">Agent Name</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {verifiedProperties.map(property => (
                            <tr key={property._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-20 h-20 object-cover" />
                                </td>
                                <td className="py-3 px-6 text-left">{property.propertyTitle}</td>
                                <td className="py-3 px-6 text-left">${property.minPrice} - ${property.maxPrice}</td>
                                <td className="py-3 px-6 text-left">{property.agentName}</td>
                                <td className="py-3 px-6 text-center">
                                    {!property.isAdvertised ? (
                                        <button
                                            onClick={() => handleAdvertise(property._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Advertise
                                        </button>
                                    ) : (
                                        <span className="bg-green-500 text-white px-3 py-1 rounded">
                                            Advertised
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

export default AdvertiseProperty;
