import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const AdvertisementSection = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(null);

    const { data: advertisedProperties = [], refetch } = useQuery({
        queryKey: ['advertisedProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/advertisedProperties');
            setLoading(res.data);
            return res.data;
        }
    })

    if (!loading) {
        refetch();
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div className="container mx-auto py-10 space-y-5">
            <div className='space-y-3'>
                <h1 className="text-2xl md:text-5xl font-bold text-center">Advertisement Section</h1>
                <p className='text-center'>The Advertisement Section showcases top real estate listings, highlighting the best properties for potential buyers. Featuring stunning visuals and key details, this section is designed to attract attention and provide quick access to essential information. Explore a curated selection of homes, commercial spaces, and luxury apartments, all verified by our team to ensure quality and reliability. Click on the details to learn more and take the next step towards finding your perfect investment.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {advertisedProperties.slice(0, 4).map(property => (
                    <div key={property._id} className="bg-white shadow-md rounded-md overflow-hidden">
                        <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{property.propertyTitle}</h2>
                            <p className="text-gray-700">{property.propertyLocation}</p>
                            <p className={`mt-2 ${property.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
                                {property.verificationStatus}
                            </p>
                            <p className="mt-2">Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                            <Link to={`/propertyDetails/${property._id}`} className="block mt-4 text-center bg-orange-500 text-white py-2 rounded-md hover:bg-blue-600">
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementSection;
