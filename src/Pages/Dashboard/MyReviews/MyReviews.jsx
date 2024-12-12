import { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';

const MyReviews = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const { user } = useAuth()

    const { data: myReviews = [], refetch } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/myReviews/${user.email}`);
            setLoading(res.data);
            return res.data;
        }
    });

    if (!loading) {
        refetch();
        return <p>Loading...</p>
    }

    const handleDelete = (reviewId) => {

        console.log(reviewId);
        axiosPublic.delete(`/deleteReviews/${reviewId}`)
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            <div className="grid grid-cols-1 gap-4">
                {myReviews.map(review => (
                    <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{review.propertyTitle}</h3>
                        <p className="text-gray-700">Agent: {review.agentName}</p>
                        <p className="text-gray-500">Review Time: {new Date(review.reviewTime).toLocaleString()}</p>
                        <p className="text-gray-800 mt-2">{review.description}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            onClick={() => handleDelete(review._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
