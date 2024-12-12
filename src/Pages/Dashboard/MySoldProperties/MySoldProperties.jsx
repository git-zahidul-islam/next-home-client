import useAxiosPublic from './../../../hooks/useAxiosPublic';
import useAuth from './../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const MySoldProperties = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [totalSoldAmount, setTotalSoldAmount] = useState(0);

    const { data: soldProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['soldProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/soldProperties/${user.email}`);
            const total = soldProperties.reduce((sum, property) => sum + parseInt(property.soldPrice), 0);
            setTotalSoldAmount(total);
            return res.data;
        }
    })

    if (isLoading) {
        refetch();
        return <h2 className="font-bold text-3xl text-center mb-5">Loading...</h2>
    }

    return (
        <div className="w-[95%] mx-auto mt-10">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold">Total Sold Amount: ${totalSoldAmount}</h3>
            </div>
            <div>
                <h2 className="font-bold text-3xl text-center mb-5">My Sold Properties</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Property Title</th>
                                <th className="py-3 px-6 text-left">Property Location</th>
                                <th className="py-3 px-6 text-left">Buyer Email</th>
                                <th className="py-3 px-6 text-left">Buyer Name</th>
                                <th className="py-3 px-6 text-left">Sold Price</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {soldProperties.map(property => (
                                <tr key={property.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{property.propertyTitle}</td>
                                    <td className="py-3 px-6 text-left">{property.propertyLocation}</td>
                                    <td className="py-3 px-6 text-left">{property.buyerEmail}</td>
                                    <td className="py-3 px-6 text-left">{property.buyerName}</td>
                                    <td className="py-3 px-6 text-left">{property.soldPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MySoldProperties;
