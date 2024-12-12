import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const WishList = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const axiosSecure = useAxiosSecure();



    const { data: userWishList = [], refetch } = useQuery({
        queryKey: ['userWishList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userWishList/${user.email}`);
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

    const handleRemove = (propertyId) => {
        axiosSecure.delete(`/wishList/${propertyId}`)
            .then(response => {
                swal({
                    icon: "success",
                    title: "Property removed from WishList Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            <div className="grid grid-cols-1 gap-4">
                {userWishList.map(property => (
                    <div key={property._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-xl font-semibold mt-2">{property.propertyTitle}</h3>
                        <p className="text-gray-700">Location: {property.propertyLocation}</p>
                        <p className="text-gray-700">Agent: {property.agentName}</p>
                        <img src={property.agentImageUrl} alt={property.agentName} className="w-10 h-10 rounded-full mt-2" />
                        <p className="text-gray-500">Verification Status: {property.verificationStatus}</p>
                        <p className="text-gray-800 mt-2">Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                        <div className="mt-4">
                            <Link to={`/dashboard/makeOffer/${property._id}`}>
                                <button
                                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Make an Offer
                                </button>
                            </Link>

                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                                onClick={() => handleRemove(property._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default WishList;
