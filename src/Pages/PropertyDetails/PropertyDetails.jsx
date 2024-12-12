import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import Modal from './Modal';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); 
    const [showModal, setShowModal] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: property = [], refetch } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getProperties/${id}`);
            return res.data;
        }
    })

    const { data: thisPropertyReview = [], refetch:reviewRefetch } = useQuery({
        queryKey: ['thisPropertyReview'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews/${id}`);
            return res.data;
        }
    })


    const handleAddToWishlist = () => {
        const propertyInfo = {
            propertyId: property._id,
            propertyTitle: property.propertyTitle,
            propertyLocation: property.propertyLocation,
            propertyImageUrl: property.propertyImageUrl,
            agentName: property.agentName,
            agentEmail: property.agentEmail,
            minPrice: property.minPrice,
            maxPrice: property.maxPrice,
            agentImageUrl: property.agentImageUrl,
            verificationStatus: property.verificationStatus,
            buyerEmail: user.email,
            buyerName: user.displayName,
            buyerImageUrl: user.photoURL,
        };

        axiosSecure.post('/wishlist', propertyInfo)
            .then(response => {
                swal({
                    icon: "success",
                    title: "Property Added in WishList Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error adding to wishlist:', error);
            });
        refetch();
    };

    const handleAddReview = (review) => {
        const reviewInfo = {
            description: review.review,
            propertyId: property._id,
            propertyTitle: property.propertyTitle,
            propertyLocation: property.propertyLocation,
            propertyImageUrl: property.propertyImageUrl,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            minPrice: property.minPrice,
            maxPrice: property.maxPrice,
            reviewerImageUrl: user.photoURL,
            verificationStatus: property.verificationStatus,
            agentEmail: property.agentEmail,
            agentName: property.agentName,
            agentImageUrl: property.agentImageUrl,
            reviewTime: new Date().toISOString() 
        }
        axiosSecure.post(`/reviews`, reviewInfo)
            .then(response => {
                swal({
                    icon: "success",
                    title: "Review Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModal(false);
                reviewRefetch();
            })
            .catch(error => {
                console.error('Error adding review:', error);
            });
        
    };


    return (
        <div className="container mx-auto p-6">
            <Helmet>
                <title>NextHome | Property Details</title>
            </Helmet>
            <div className="bg-white shadow-md rounded-md overflow-hidden">
                <img src={property.propertyImageUrl} alt={property.propertyTitle} className="w-full h-64 object-cover" />
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{property.propertyTitle}</h2>
                    <p className="text-gray-700 mt-2">{property.description}</p>
                    <p className="text-gray-700 mt-2">Location: {property.propertyLocation}</p>
                    <p className="text-gray-700 mt-2">Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                    <p className="text-gray-700 mt-2">Agent: {property.agentName}</p>
                    <button onClick={handleAddToWishlist} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center">
                        <AiOutlineHeart className="mr-2" /> Add to Wishlist
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Reviews</h3>
                {thisPropertyReview.length > 0 ? (
                    thisPropertyReview.map(review => (
                        <div key={review.id} className="bg-gray-100 p-4 rounded-md mb-4">
                            <p className="text-gray-800"><strong>{review.reviewerName}</strong></p>
                            <p className="text-gray-700">{review.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
                <button onClick={() => setShowModal(true)} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                    Add a Review
                </button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} onSubmit={handleAddReview} />}
        </div>
    );
};

export default PropertyDetails;
