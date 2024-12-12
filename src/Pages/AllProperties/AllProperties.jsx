
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const AllProperties = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [properties, setProperties] = useState([]);

    const { data: verifiedProperties = [], refetch } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/verifiedProperties');
            setLoading(res.data);
            setProperties(res.data);
            return res.data;
        }
    })

    if (!loading) {
        refetch();
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setProperties(filteredProperties);
    };

    const handleSort = (event) => {
        setSortOrder(event.target.value);
        setProperties(sortedProperties);
    };

    const filteredProperties = verifiedProperties.filter(property =>
        property.propertyLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProperties = filteredProperties.sort((a, b) => {
        const priceA = parseInt(a.minPrice, 10);
        const priceB = parseInt(b.minPrice, 10);
        return sortOrder === 'asc' ?  priceB - priceA : priceA - priceB;
    });


    return (
        <div className="container mx-auto py-10">
            <Helmet>
                <title>NextHome | All Properties</title>
            </Helmet>
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search by location"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border p-2 rounded w-full flex-1"
                />
                <select
                    value={sortOrder}
                    onChange={handleSort}
                    className="border p-2 rounded flex-1"
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
            </div>
            <div className='text-center space-y-5 mb-5'>
                <h1 className="text-2xl md:text-4xl font-bold text-center">All Properties</h1>
                <p>Welcome to the All Properties page! Here, you'll find a complete listing of all the properties that have been verified by our dedicated team. Whether you're looking for a new home, an investment opportunity, or simply browsing, this page provides all the information you need to explore the diverse range of properties available on our platform.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.map(property => (
                    <div key={property._id} className="bg-white shadow-md rounded-md overflow-hidden">
                        <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{property.propertyTitle}</h2>
                            <p className="text-gray-700">{property.propertyLocation}</p>
                            <div className="flex items-center mt-2">
                                <img src={property.agentImageUrl} alt={property.agentName} className="w-10 h-10 rounded-full mr-2" />
                                <div>
                                    <p className="text-gray-800 font-semibold">{property.agentName}</p>
                                    <p className="text-gray-600">{property.agentEmail}</p>
                                </div>
                            </div>
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

export default AllProperties;
