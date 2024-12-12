import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MakeOffer = () => {
    const { id } = useParams();
    // const [property, setProperty] = useState({});
    const [offeredAmount, setOfferedAmount] = useState('');
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(null);
    const { user } = useAuth();
    const [buyingDate, setBuyingDate] = useState('');
    const axiosSecure = useAxiosSecure();


    const { data: offeredProperty = [], refetch } = useQuery({
        queryKey: ['offeredProperty'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishList/${id}`);
            setLoading(res.data);
            return res.data;
        }
    })

    if (!loading) {
        refetch();
        return <div>Loading...</div>
    }


    const handleOffer = async (e) => {
        e.preventDefault();

        const { minPrice, maxPrice } = offeredProperty;

        if (parseInt(offeredAmount) < parseInt(minPrice) || parseInt(offeredAmount) > parseInt(maxPrice)) {
            swal({
                title: 'Invalid Offer',
                text: `Offer must be between $${minPrice} and $${maxPrice}`,
                icon: 'error'
            });
            return;
        }

        const offerDetails = {
            propertyId: offeredProperty.propertyId,
            propertyTitle: offeredProperty.propertyTitle,
            propertyLocation: offeredProperty.propertyLocation,
            propertyImageUrl: offeredProperty.propertyImageUrl,
            agentName: offeredProperty.agentName,
            agentEmail: offeredProperty.agentEmail,
            buyerEmail: offeredProperty.buyerEmail,
            buyerName: offeredProperty.buyerName,
            offeredAmount,
            buyingDate,
            status: 'pending'
        };

        console.log(offerDetails);

        const res = await axiosPublic.post('/offers', offerDetails);

        console.log(res);
        if(res.data.insertedId){
            swal({
                title: 'Offer Sent',
                text: 'Your offer has been sent successfully',
                icon:'success'
            });
            setOfferedAmount('');
            setBuyingDate('');
            refetch();
        }
        else{
            swal({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error'
            });
        }
    
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
            <form onSubmit={handleOffer} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Property Title
                    </label>
                    <input
                        type="text"
                        value={offeredProperty.propertyTitle}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Property Location
                    </label>
                    <input
                        type="text"
                        value={offeredProperty.propertyLocation}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Agent Name
                    </label>
                    <input
                        type="text"
                        value={offeredProperty.agentName}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Buyer Email
                    </label>
                    <input
                        type="text"
                        value={user.email}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Buyer Name
                    </label>
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Offered Amount
                    </label>
                    <input
                        type="number"
                        value={offeredAmount}
                        onChange={(e) => setOfferedAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Buying Date
                    </label>
                    <input
                        type="date"
                        value={buyingDate}
                        onChange={(e) => setBuyingDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Offer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MakeOffer;
