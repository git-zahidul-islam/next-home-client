import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const LatestReviews = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);

    const { data: latestReviews = [], refetch } = useQuery({
        queryKey: ['latestReviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            setLoading(res.data);
            return res.data;
        }
    });

    if (!loading) {
        refetch();
        return <p>Loading...</p>
    }



    return (
        <div className="container mx-auto space-y-5">
            <div className='text-center'>
                <h3 className="text-2xl md:text-4xl font-bold mb-4">Latest User Reviews</h3>
                Discover what our community has to say about their experiences with our properties in the Latest User Reviews section. Here, you will find honest feedback from recent buyers and renters, providing insights into property conditions, agent interactions, and overall satisfaction. Each review includes the reviewer's name, photo, and the property title, giving you a well-rounded view of our listings. Stay informed and make confident decisions by reading the latest experiences shared by our users
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestReviews.map(review => (
                    <div key={review.id} className="bg-white shadow-md rounded-md p-4">
                        <div className="flex items-center mb-4">
                            <img src={review?.reviewerImageUrl} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div>
                                <p className="font-bold">{review.reviewerName}</p>
                                <p className="text-gray-600">{review.propertyTitle}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{review.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestReviews;
