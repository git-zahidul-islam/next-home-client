import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const ManageReviews = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(null);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            setLoading(res.data);
            return res.data;
        }
    });

    if(!loading) {
        refetch();
        return <p>Loading...</p>
    }

    const handleDelete = (reviewId) => {
        console.log(reviewId);
        // Delete the review
        axiosSecure.delete(`/deleteReviews/${reviewId}`)
            .then(response => {
                console.log(response);
                swal({
                    icon: "success",
                    title: "Reviews Deleted Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            })
            .catch(error => {
                console.error('Error deleting review:', error);
            });
    };

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-xl font-bold mb-4">Manage Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <div key={review._id} className="bg-white shadow-md rounded-md p-4">
                        <div className="flex items-center mb-4">
                            <img src={review.reviewerImageUrl} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <p className="font-bold">{review.reviewerName}</p>
                                <p className="text-gray-600">{review.reviewerEmail}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.description}</p>
                        <button
                            onClick={() => handleDelete(review._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReviews;
